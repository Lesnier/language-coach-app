import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
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
  IonLabel,
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
    FormsModule,
    DatePipe,
    CommonModule,
    FormsModule,
    IonLabel,
    ReactiveFormsModule,
  ],
})
export class SettingPage implements OnInit {
  api = inject(ApiService);

  user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  date: any;
  utils = inject(UtilsService);
  changePasswordForm: FormGroup;

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
    if (this.changePasswordForm.valid) {
      const token = localStorage.getItem('access_token');
      if (token)
        this.api
          .changePassword(this.changePasswordForm.value, token)
          .subscribe((res) => {
            this.utils.showToast('Password Changed', 'success');
          });
    } else {
      console.log('Formulario inválido');
    }
  }
  ngOnInit(): void {}
}
