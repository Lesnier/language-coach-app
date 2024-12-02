import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { readerSharp, cashSharp } from "ionicons/icons";

@Component({
  selector: "app-secretary",
  templateUrl: "./secretary.page.html",
  styleUrls: ["./secretary.page.scss"],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonHeader, IonTitle, IonGrid, IonRow, IonCol, IonContent, IonCard, IonIcon, IonToolbar, IonButtons, IonMenuButton],
})
export class SecretaryPage implements OnInit {
  constructor() {
    addIcons({ readerSharp, cashSharp });
  }

  ngOnInit() {}
}
