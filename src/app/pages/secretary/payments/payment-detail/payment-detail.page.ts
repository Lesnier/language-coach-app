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
  IonToolbar, IonList, IonGrid, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  cloudUploadOutline,
  createOutline,
} from 'ionicons/icons';
import { Bill } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonList, 
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
  
  billId: number | undefined;
  bill: Bill | undefined;
  isLoading: boolean = false;
  baseUrl: string = environment.apiUrl;

  constructor() {
    addIcons({ chevronBackOutline, cloudUploadOutline, createOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.billId = params['id'];
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

    if (token && this.billId) {
      try {
        this.bill = await this.api
          .getBillDetails(token, this.billId)
          .toPromise();
        this.getImageUrl();
        console.log('Payment details:', this.bill);
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
    if (this.bill && this.bill?.payment?.image) {
      // Replace backslashes with forward slashes in the image path
      const normalizedPath = this.bill.payment.image.replace(/\\/g, '/');

      // Construct the full URL using the storageUrl environment variable
      return `${environment.storageUrl}/${normalizedPath}`;
    }
    return '';
  }

  

  async uploadReceiptImage() {
    if(this.bill?.payment){
      // Check if the payment already has an image
      if (this.bill.payment.image) {
        const alert = await this.alertCtrl.create({
          header: 'Confirmation',
          message: 'Do you want to replace the existing image?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Replace',
              handler: () => {
                this.selectImage();
              },
            },
          ],
        });
        await alert.present();
      } else {
        this.selectImage();
      }
    }else{
      this.selectImage();
    }
   
  }

  async selectImage(){
    // Create a file input element and trigger it
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
      const file = target.files[0];

      // Check file size (2 MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        this.showToast('La imagen no debe exeder los 2 MB', 'danger');
        return;
      }

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
        if (this.billId !== undefined) {          
          if(this.bill?.payment){
            const response = await this.api
            .uploadPaymentReceipt(token, this.bill.payment.id, base64Image)
            .toPromise();

          // Update the payment object with the new image information      
          if (response.payment !== undefined) {
            if (this.bill?.payment) {             
               this.bill.payment = response.payment;                   
              }      
          }
          this.showToast(
            'Invoice confirmation uploaded successfully',
            'success'
          );
          }else{            
            if (this.bill?.user) {
              const response = await this.api
            .createPaymentReceipt(token, this.bill.id, base64Image)
            .toPromise();

          // Update the payment object with the new image information
          if (response.payment !== undefined) {
            if (!this.bill?.payment) {             
              this.bill.payment = response.payment;     
              }      
          }
          this.showToast(
            'Invoice confirmation uploaded successfully',
            'success'
          );
            }
            
          }
         
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
