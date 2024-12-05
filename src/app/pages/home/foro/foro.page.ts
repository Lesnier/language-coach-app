import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
  selector: "app-foro-list",
  templateUrl: "./foro.page.html",
  styleUrls: ["./foro.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid,
    IonRouterLink, IonRouterLink, RouterLink, RouterLinkActive, IonIcon, IonRow, IonButton],
})

export class ForoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
