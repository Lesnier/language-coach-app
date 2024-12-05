import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
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
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonInput,
  IonTextarea, IonText
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-thread",
  templateUrl: "./thread.page.html",
  styleUrls: ["./thread.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonInput, IonAvatar, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonButton, IonTextarea, IonText],
})
export class ThreadPage implements OnInit {
  id: string | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', this.id);
  }
}
