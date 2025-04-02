import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
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
  IonNote,
  IonProgressBar,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  attachOutline,
  chevronBackOutline,
  cloudUploadOutline,
  documentOutline,
  imageOutline,
  trashOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
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
    IonSelectOption,
    IonSelect,
    IonTextarea,
    IonSpinner,
    IonLabel,
    IonNote,
    IonProgressBar,
  ],
})
export class NewPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  course_id: string = '';
  professor_id: string = '';
  courses: any[] = [];
  professors: any[] = [];
  teacherNote: string = 'sin evaluar';
  imageFile!: File;
  router = inject(Router);
  selectedImage: string | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;
  fileType: string = '';
  Math = Math; // Add this line to expose Math to the template

  ngOnInit(): void {
    this.getCourses();
    this.getProfessors();
  }

  constructor() {
    addIcons({
      chevronBackOutline,
      documentOutline,
      imageOutline,
      attachOutline,
      cloudUploadOutline,
      trashOutline,
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      this.fileType = this.imageFile.type.split('/')[0];

      // Create a preview URL for images
      if (this.fileType === 'image') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(this.imageFile);
      } else {
        // For non-image files, set selectedImage to null
        // but we'll still show an icon in the UI
        this.selectedImage = null;
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.course_id || !this.professor_id || !this.imageFile) {
      this.showToast('Por favor complete todos los campos requeridos');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate progress for demo purposes
    const progressInterval = setInterval(() => {
      this.uploadProgress += 0.1;
      if (this.uploadProgress >= 0.9) {
        clearInterval(progressInterval);
      }
    }, 200);

    const formData = new FormData();
    formData.append('teacher_note', this.teacherNote);
    formData.append('course_id', this.course_id);
    formData.append('professor_id', this.professor_id);
    formData.append('image', this.imageFile);

    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await this.api.uploadTask(token, formData).toPromise();
        clearInterval(progressInterval);
        this.uploadProgress = 1;
        setTimeout(() => {
          this.isUploading = false;
          this.router.navigate(['/homeworks-list']);
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        this.isUploading = false;
        this.showToast('Error al subir la tarea. Intente nuevamente.');
        console.error(error);
      }
    }
  }

  removeFile() {
    this.selectedImage = null;
    this.imageFile = null as unknown as File;
    this.fileType = '';
  }

  back() {
    this.navCtrl.back();
  }

  getCourses() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getCourses(token).subscribe((res) => {
        this.courses = res;
      });
    }
  }

  getProfessors() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getProfessors(token).subscribe((res) => {
        // Extract the Professors array from the response
        this.professors = res.Professors || [];
      });
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
    });
    toast.present();
  }
}
