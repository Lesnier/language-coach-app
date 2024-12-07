import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginPage {
  loginForm: FormGroup;
  showLayout: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    /*if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login con:', email, password);
    }*/
    this.router.navigate(['/start']);
  }
}
