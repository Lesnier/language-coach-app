import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingPage {
  api = inject(ApiService);

  user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  date: any;
  utils = inject(UtilsService);
  changePasswordForm: FormGroup;

  selectedImage: string | null = null;
  imageFile!: File;
  isUploading: boolean = false;
  uploadProgress: number = 0;
  Math = Math; // Add Math as a property to expose it in the template

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group(
      {
        current_password: ['', [Validators.required]],
        new_password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('new_password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
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

    if (this.changePasswordForm.valid) {
      formData.append(
        'current_password',
        this.changePasswordForm.get('current_password')?.value
      );
      formData.append(
        'new_password',
        this.changePasswordForm.get('new_password')?.value
      );
      formData.append(
        'confirm_password',
        this.changePasswordForm.get('confirm_password')?.value
      );
    }

    this.api.updateUserProfile(formData, token).subscribe(
      (res) => {
        this.utils.showToast('Perfil actualizado correctamente', 'success');
        // Update the local user object with the new data
        this.user.profile_picture = res.profile_picture;
        this.user.name = res.name;
        this.date = res.birth_date;
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

  async uploadProfilePicture() {
    if (!this.imageFile) {
      this.utils.showToast('Por favor seleccione una imagen', 'warning');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    const formData = new FormData();
    formData.append('profile_picture', this.imageFile);

    console.log('Uploading file:', this.imageFile); // Debugging log
    console.log('FormData content:', formData.get('profile_picture')); // Debugging log

    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await this.api.uploadProfilePicture(formData, token).toPromise();
        this.utils.showToast('Foto de perfil actualizada', 'success');
        this.isUploading = false;

        // Update the user's profile picture in the UI
        this.user.profile_picture = this.selectedImage ?? undefined;
      } catch (error) {
        this.utils.showToast('Error al subir la foto de perfil', 'danger');
        console.error('Upload error:', error); // Debugging log
        this.isUploading = false;
      }
    }
  }
}
