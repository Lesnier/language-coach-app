import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton],
})
export class SettingPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
