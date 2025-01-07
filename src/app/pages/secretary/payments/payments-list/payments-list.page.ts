import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonRouterLink,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.page.html',
  styleUrls: ['./payments-list.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class PaymentsListPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  router = inject(Router);
  constructor() {
    addIcons({ chevronBackOutline });
  }

  payments: any[] = [];
  ngOnInit() {
    this.getPayments();
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

  goPayment(id:number) {
    this.router.navigate(['/payments'],{queryParams:{id:id}});
  }
}
