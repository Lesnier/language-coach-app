import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton, IonRouterLink } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { calendarOutline, calendarSharp, layersSharp, layersOutline, chatbubbleSharp, checkboxSharp } from "ionicons/icons";

@Component({
  selector: "app-start",
  templateUrl: "./start.page.html",
  styleUrls: ["./start.page.scss"],
  standalone: true,
  imports: [IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonRouterLink, RouterLink, RouterLinkActive],
})
export class StartPage implements OnInit {
  constructor() {
    addIcons({ calendarOutline, calendarSharp, layersSharp, layersOutline, chatbubbleSharp, checkboxSharp });
  }

  ngOnInit() {}
}
