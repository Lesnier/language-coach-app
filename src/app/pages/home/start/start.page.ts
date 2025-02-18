import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
    IonCardHeader,
    IonCardTitle,
    IonHeader,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonCard,
    IonIcon,
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonRouterLink,
    IonItemDivider, IonItemGroup, IonLabel
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { calendarOutline, calendarSharp, layersSharp, layersOutline, chatbubbleSharp, checkboxSharp, chevronBackOutline } from "ionicons/icons";


@Component({
  selector: "app-start",
  templateUrl: "./start.page.html",
  styleUrls: ["./start.page.scss"],
  standalone: true,
    imports: [IonIcon, IonCardHeader, IonCardTitle, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonButton, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonRouterLink, RouterLink, RouterLinkActive, IonItemDivider, IonItemGroup, IonLabel],
})
export class StartPage implements OnInit {

  constructor() {
    addIcons({ calendarOutline, calendarSharp, layersSharp, layersOutline, chatbubbleSharp, checkboxSharp });
  }

  ngOnInit() {}




}
