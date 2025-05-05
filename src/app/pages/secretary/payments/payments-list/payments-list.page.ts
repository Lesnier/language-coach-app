import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonRouterLink,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar, IonLabel, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.page.html',
  styleUrls: ['./payments-list.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonLabel, 
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRouterLink,
    IonRouterLink,
    RouterLink,
    IonIcon,
    IonRow,
    IonButton,
    IonThumbnail,
    IonCardSubtitle,
  ],
})
export class PaymentsListPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {
    addIcons({ chevronBackOutline });
  }

  payments: any[] = [];
  bills: any[] = [];
  ngOnInit() {
    this.getBills();
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      if (params['refetch']) {
        this.fetchPayments();
      }
    });
  }

  back() {
    this.navCtrl.back();
  }

  getPayments() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getPayments(token).subscribe((res) => {
        console.log(res);
        this.payments = res;
      });
  }

  getBills() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getBills(token).subscribe((res) => {
        console.log(res);
        this.bills = res.bills;
      });
  }

  fetchPayments() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getPayments(token).subscribe(
        (payments) => {
          console.log('Payments fetched:', payments);
          this.payments = payments;
        },
        (error) => {
          console.error('Error fetching payments:', error);
        }
      );
    }
  }

  goPayment(id: number) {
    console.log('Navigating to payment with ID:', id);
    this.router.navigate(['/bills/bill-detail'], {
      queryParams: { id: id },
    });
  }
}
