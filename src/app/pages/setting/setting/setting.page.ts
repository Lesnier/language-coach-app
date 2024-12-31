import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  IonIcon
} from '@ionic/angular/standalone';
import { data, User } from 'src/app/models/interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { ApiService } from 'src/app/services/api.service';


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
    IonIcon
  ],
})
export class SettingPage {
  utils = inject(UtilsService);
  api = inject(ApiService);

  user: User = this.utils.loadUser();
  date: any;
  data: data = {
    current_password: '123456789',
    new_password: '12345678',
    confirm_password: '12345678',
  };
  changePasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]],
    });


  }

  onSubmit(): void {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.changePassword(this.data, token).subscribe((res) => {
        console.log(res);
      });
  }
}
