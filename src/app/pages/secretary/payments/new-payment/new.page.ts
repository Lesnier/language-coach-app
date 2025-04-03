import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewPage {
  api = inject(ApiService);
  navCtrl = inject(NavController);
  router = inject(Router);
  transaction_code: string = '';
  image!: File;
  selectedDocument: string | null = null;
  constructor() {
    addIcons({ chevronBackOutline });
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  submit(): void {
    const formData = new FormData();
    formData.append('transaction_code', this.transaction_code);
    formData.append('image', this.image);

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.uploadPayment(token, formData).subscribe(
        (res) => {
          console.log(res);
          // Navigate to /payments-list and trigger refetch
          this.router.navigate(['/payments-list'], {
            queryParams: { refetch: true },
          });
        },
        (error) => {
          console.error('Error uploading payment:', error);
        }
      );
  }

  back() {
    this.navCtrl.back();
  }
}
