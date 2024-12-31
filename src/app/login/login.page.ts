import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  ApiService } from '../services/api.service';
import { Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;

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
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.access_token); 
        this.fetchUserDetails().subscribe(
          () => {
            this.router.navigate(['/start']);
           
          },
          (error) => {
            console.error('Failed to fetch user details:', error);
          }
        );
      },
      (error) => {
        console.error('Login failed:', error);
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
