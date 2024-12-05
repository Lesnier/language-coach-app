import { Component, OnInit } from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
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
  IonMenuButton,
  IonInput, IonItem, IonButton, IonDatetime, IonText, IonLabel, IonPopover
} from "@ionic/angular/standalone";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton, IonInput, IonItem, IonButton, IonDatetime, IonText, IonLabel, IonPopover, FormsModule, DatePipe],
})
export class SettingPage implements OnInit {
  date: any;
  constructor() {}

  ngOnInit() {}
}
