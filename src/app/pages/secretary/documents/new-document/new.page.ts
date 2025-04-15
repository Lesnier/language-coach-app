import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  cloudUploadOutline,
  documentOutline,
  trashOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
  ],
})
export class NewPage implements OnInit {
  api = inject(ApiService);
  navCtrl = inject(NavController);
  constructor() {
    addIcons({
      chevronBackOutline,
      cloudUploadOutline,
      documentOutline,
      trashOutline,
    });
  }

  selectedDocument: string | null = null;

  name: string = '';
  type: string = '';
  file!: File;
  originalFileName: string = '';

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.originalFileName = this.file.name;

      // Set suggested name from file name but allow user to change it
      this.name = this.originalFileName;

      this.type = this.file.type;

      // Create a preview for the selected file
      if (this.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedDocument = e.target.result;
        };
        reader.readAsDataURL(this.file);
      } else {
        // For non-image files, just set selectedDocument to a non-null value
        this.selectedDocument = 'document';
      }
    }
  }

  onSubmit() {
    if (!this.file || !this.name) {
      console.error('File and name are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('type', this.type || 'option1'); // Default type if not specified
    formData.append('file', this.file);

    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.uploadFile(token, formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);

          // Navigate to documents route instead of using navCtrl.back()
          // This ensures the route change is properly detected
          this.navCtrl.navigateRoot('/documents', {
            animationDirection: 'back',
          });
        },
        (error) => {
          console.error('Error uploading file:', error);

          // Handle specific error cases
          if (error.error && error.error.errors && error.error.errors.name) {
            alert('Error: ' + error.error.errors.name[0]);
          } else {
            alert(
              'Error al subir el documento. Por favor, inténtalo de nuevo.'
            );
          }
        }
      );
    }
  }

  removeFile() {
    this.selectedDocument = null;
    this.name = '';
    this.type = '';
    this.file = null!;
    this.originalFileName = '';
  }

  back() {
    this.navCtrl.back();
  }

  ngOnInit() {
    console.log('NewPage component initialized');
  }
}
