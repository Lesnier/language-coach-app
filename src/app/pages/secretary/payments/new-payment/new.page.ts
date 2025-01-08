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
  IonSelect
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
  data: any;
  user_id: number = 0;
  transaction_code: string = '';
  selectedDocument: string | null = null;
  students: any[] = [];
  constructor() {
    addIcons({ chevronBackOutline });
  }

  submit(): void {
    const payload = {
      user_id: this.data.user_id,
      transaction_code: this.data.transaction_code,
      image: this.data.image,
    };

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadPayment(token, payload).subscribe((res) => {
        console.log(res);
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.data = {
        user_id: this.user_id,
        transaction_code: this.transaction_code,
        image: JSON.stringify([
          {
            download_link: `files/${new Date().toLocaleString('en-US', {
              month: 'long',
            })}${new Date().getFullYear()}/${file.name.replace(/ /g, '_')}`,
            original_name: file.name,
          },
        ]),
      };
    }
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
