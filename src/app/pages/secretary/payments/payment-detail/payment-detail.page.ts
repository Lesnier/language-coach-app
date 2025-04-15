import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  cloudUploadOutline,
  createOutline,
} from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonRow,
    IonLoading,
    IonInput,
  ],
})
export class PaymentDetailPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  loadingCtrl = inject(LoadingController);
  alertCtrl = inject(AlertController);
  toastCtrl = inject(ToastController);

  paymentId: number | undefined;
  payment: any;
  isLoading: boolean = false;
  baseUrl: string = environment.apiUrl;

  constructor() {
    addIcons({ chevronBackOutline, cloudUploadOutline, createOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.paymentId = params['id'];
        this.loadPaymentDetails();
      }
    });
  }

  back() {
    this.navCtrl.back();
  }

  async loadPaymentDetails() {
    this.isLoading = true;
    const token = localStorage.getItem('access_token');

    if (token && this.paymentId) {
      try {
        this.payment = await this.api
          .getPaymentDetails(token, this.paymentId)
          .toPromise();
        console.log('Payment details:', this.payment);
      } catch (error) {
        console.error('Error loading payment details:', error);
        this.showToast('Error loading payment details', 'danger');
      } finally {
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
      this.showToast('Authentication error or missing payment ID', 'danger');
    }
  }

  getImageUrl(): string {
    if (this.payment && this.payment.image) {
      // If the image already has a full URL, return it
      if (this.payment.image.startsWith('http')) {
        return this.payment.image;
      }

      // Otherwise, construct the full URL using the baseUrl
      // Remove any leading slashes from the image path
      const imagePath = this.payment.image.startsWith('/')
        ? this.payment.image.substring(1)
        : this.payment.image;

      // Construct the storage URL for the image
      return `${this.baseUrl}/storage/${imagePath}`;
    }
    return '';
  }

  async uploadReceiptImage() {
    // Create a file input element and trigger it
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
          if (e.target?.result) {
            // Get base64 string without the prefix (data:image/jpeg;base64,)
            const base64String = e.target.result.toString().split(',')[1];
            await this.uploadImage(base64String);
          }
        };

        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  }

  async uploadImage(base64Image: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading invoice confirmation...',
    });
    await loading.present();

    const token = localStorage.getItem('access_token');

    try {
      if (token) {
        if (this.paymentId !== undefined) {
          const response = await this.api
            .uploadPaymentReceipt(token, this.paymentId, base64Image)
            .toPromise();

          // Update the payment object with the new image information
          if (response && response.image) {
            this.payment.image = response.image;
          }

          this.showToast(
            'Invoice confirmation uploaded successfully',
            'success'
          );
        } else {
          this.showToast('Payment ID is missing', 'danger');
        }
      } else {
        this.showToast('Authentication error', 'danger');
      }
    } catch (error) {
      console.error('Error uploading invoice confirmation:', error);
      this.showToast('Error uploading invoice confirmation', 'danger');
    } finally {
      loading.dismiss();
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
