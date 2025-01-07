import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonCardHeader, IonCardTitle, IonRouterLink, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { readerSharp, cashSharp } from "ionicons/icons";

@Component({
  selector: "app-secretary",
  templateUrl: "./secretary.page.html",
  styleUrls: ["./secretary.page.scss"],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonHeader, IonTitle, IonGrid, IonRow, IonCol,
    IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton, IonRouterLink, RouterLink, RouterLinkActive],
})
export class SecretaryPage implements OnInit {
  constructor() {
    addIcons({ readerSharp, cashSharp });
  }

  ngOnInit() {}
}
