import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonDatetime, IonRow, IonCardHeader, IonCard, IonIcon, IonCardTitle, IonCol, IonGrid, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.page.html",
  styleUrls: ["./schedule.page.scss"],
  standalone: true,
  imports: [IonButton, IonGrid, IonCol, IonCardTitle, IonIcon, IonCard, IonCardHeader, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonDatetime, IonMenuButton, RouterLink, RouterLinkActive],
})
export class SchedulePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
