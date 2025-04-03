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
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
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
  ],
})
export class NewPage implements OnInit {
  api = inject(ApiService);
  navCtrl = inject(NavController);
  constructor() {
    addIcons({ chevronBackOutline });
  }

  selectedDocument: string | null = null;

  name: string = '';
  type: string = '';
  file!: File;

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
    this.type = event.target.files[0].type;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('type', this.type);
    formData.append('file', this.file);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadFile(token, formData).subscribe((response) => {
        console.log('File uploaded successfully:', response);
      });
  }

  removeFile() {
    this.selectedDocument = null;
    this.name = '';
    this.type = '';
    this.file = null!;
  }

  back() {
    this.navCtrl.back();
  }

  ngOnInit() {
    console.log('NewPage component initialized');
  }
}
