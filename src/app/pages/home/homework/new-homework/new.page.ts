import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonAvatar,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonInput,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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
  ],
})
export class NewPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  course_id: string = '';
  courses: any[] = [];
  teacherNote: string = 'sin evaluar';
  imageFile!: File;
  router = inject(Router);

  ngOnInit(): void {
    this.getCourses();
  }

  constructor() {
    addIcons({ chevronBackOutline });
  }

  selectedImage: boolean = false;

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('teacher_note', this.teacherNote);
    formData.append('course_id', this.course_id);
    formData.append('image', this.imageFile);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadTask(token, formData).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/homeworks-list']);
      });
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
}
