import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonCardContent,
  IonList,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
} from '@ionic/angular/standalone';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonList,
    IonCardContent,
    IonLabel,
    IonItem,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonButton,
  ],
})
export class PaymentsPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService);
  id: any;
  document: any;
  route = inject(ActivatedRoute);
  apiUrl = environment.apiUrl;
  constructor() {
    addIcons({ chevronBackOutline });
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((result) => {
      this.id = result.get('id');
    });

    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getPayments(token).subscribe((res) => {
        res.forEach((element: any) => {
          if (element.id == this.id) {
            this.document = element;
          }
        });
      });
  }
  back() {
    this.navCtrl.back();
  }
}
