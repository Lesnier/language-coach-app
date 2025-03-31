import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  IonInput,
  IonItem,
  IonMenuButton,
  IonRow,
  IonSelect,
  IonSelectOption,
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
  professor_id: string = '';
  courses: any[] = [];
  professors: any[] = [];
  teacherNote: string = 'sin evaluar';
  imageFile!: File;
  router = inject(Router);

  ngOnInit(): void {
    this.getCourses();
    this.getProfessors();
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
    formData.append('professor_id', this.professor_id);
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

  getProfessors() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getProfessors(token).subscribe((res) => {
        // Extract the Professors array from the response
        this.professors = res.Professors || [];
      });
    }
  }
}
