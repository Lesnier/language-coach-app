import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChangePasswordPage {
  changePasswordForm = this.fb.group({
    current_password: ['', [Validators.required]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.utils.showToast(
        'No se encontró el token de autenticación',
        'danger'
      );
      return;
    }

    this.api.updatePassword(this.changePasswordForm.value, token).subscribe(
      () => {
        this.utils.showToast('Contraseña actualizada correctamente', 'success');
        this.changePasswordForm.reset();
      },
      (error) => {
        console.error('Error al actualizar la contraseña:', error);
        this.utils.showToast('Error al actualizar la contraseña', 'danger');
      }
    );
  }

  back() {
    this.navCtrl.back();
  }
}
