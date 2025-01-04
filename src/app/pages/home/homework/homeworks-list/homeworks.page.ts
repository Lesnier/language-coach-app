import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavController } from '@ionic/angular';
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
import { addIcons } from "ionicons";
import { chevronBackOutline } from "ionicons/icons";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-homeworks-list",
  templateUrl: "./homeworks.page.html",
  styleUrls: ["./homeworks.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid,
    IonRouterLink, IonRouterLink, RouterLink, RouterLinkActive, IonIcon, IonRow, IonButton],
})
export class HomeworksPage implements OnInit {
  navCtrl = inject(NavController);
  api = inject(ApiService)
  tasks:any[] = [];
  constructor() {
    addIcons({chevronBackOutline})
  }

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if(token)
    this.api.getTask(token).subscribe(res=>{
  console.log(res);
  })
  }

  back(){
    this.navCtrl.back();
  }
}
