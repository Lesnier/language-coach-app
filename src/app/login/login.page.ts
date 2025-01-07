import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/interfaces';
import { UtilsService } from '../services/utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;
  utils = inject(UtilsService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.api.login(email, password).subscribe(
      (response) => {
        this.utils.showToast('Login successful', 'success');
        this;
        localStorage.setItem('access_token', response.access_token);
        this.fetchUserDetails().subscribe(
          () => {
            const user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
            if (user.role_id === 4) {
              this.router.navigate(['/secretary']);
            } else {
              this.router.navigate(['/start']);
            }
          },
          (error) => {
            this.utils.showToast('Login failed', 'danger');
          }
        );
      },
      (error) => {
        this.utils.showToast('Login failed', 'danger');
      }
    );
  }
  fetchUserDetails(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (token) {
      return this.api.getUserDetails(token).pipe(
        tap((userDetails) => {
          localStorage.setItem('user', JSON.stringify(userDetails));
        })
      );
    } else {
      return throwError('No access token found');
    }
  }
}
