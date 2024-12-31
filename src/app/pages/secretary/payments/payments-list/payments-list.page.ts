import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel, IonRouterLink,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonButton
} from "@ionic/angular/standalone";

@Component({
  selector: "app-payments-list",
  templateUrl: "./payments-list.page.html",
  styleUrls: ["./payments-list.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid,
    IonRouterLink, IonRouterLink, RouterLink, RouterLinkActive, IonIcon, IonRow, IonButton],
})
export class PaymentsListPage implements OnInit {
  navCtrl = inject(NavController);
  constructor() {
    addIcons({chevronBackOutline})
  }

  ngOnInit() {}

  back(){
    this.navCtrl.back();
  }
}
