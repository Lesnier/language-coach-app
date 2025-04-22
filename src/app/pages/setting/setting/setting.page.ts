import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPopover,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { User } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
import {
  closeOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonInput,
    IonItem,
    IonButton,
    IonDatetime,
    IonText,
    IonPopover,
    IonProgressBar,
    FormsModule,
    DatePipe,
    CommonModule,
    FormsModule,
    IonLabel,
    ReactiveFormsModule,
    IonIcon,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingPage implements OnInit {
  api = inject(ApiService);
  router = inject(Router);

  user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  date: any;
  utils = inject(UtilsService);

  selectedImage: string | null = null;
  imageFile!: File;
  isUploading: boolean = false;
  uploadProgress: number = 0;


  constructor() {
    addIcons({
      closeOutline
    });
  }


  ngOnInit() {
    this.date = this.user.birth_date;
    if (this.user.profile_picture) {
      this.selectedImage = environment.storageUrl + '/' + this.user.profile_picture;
    } else {
      this.selectedImage = null;  
    }
  }

  updateProfile() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.utils.showToast(
        'No se encontró el token de autenticación',
        'danger'
      );
      return;
    }

    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('birth_date', this.date);
    if (this.imageFile) {
      formData.append('profile_picture', this.imageFile);
    }

    this.api.updateUserProfile(formData, token).subscribe(
      (res) => {
        this.utils.showToast('Perfil actualizado correctamente', 'success');
        this.user.profile_picture = res.user.profile_picture;
        this.user.name = res.user.name;
        this.date = res.user.birth_date;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.selectedImage = environment.storageUrl + '/' +  res.user.profile_picture;
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.utils.showToast('Error al actualizar el perfil', 'danger');
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  removeFile() {
    this.selectedImage = null;
    this.imageFile = null as unknown as File;
  }
}
