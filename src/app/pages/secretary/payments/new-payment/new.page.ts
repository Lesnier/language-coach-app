import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
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
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewPage implements OnInit {
  api = inject(ApiService);
  navCtrl = inject(NavController);
  user_id: string = '';
  transaction_code: string = '';
  image!: File;
  selectedDocument: string | null = null;
  students: any[] = [];
  constructor() {
    addIcons({ chevronBackOutline });
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  submit(): void {
    const formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('transaction_code', this.transaction_code);
    formData.append('image', this.image);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadPayment(token, formData).subscribe((res) => {
        console.log(res);
      });
  }

  back() {
    this.navCtrl.back();
  }

  getStudent() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getStudents(token).subscribe((res) => {
        this.students = res.Students;
      });
  }
  ngOnInit() {
    this.getStudent();
  }
}
