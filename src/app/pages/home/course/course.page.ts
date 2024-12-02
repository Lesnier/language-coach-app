import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonRouterLink, IonCardHeader, IonCol, IonCard, IonIcon, IonRow, IonCardTitle, IonGrid, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonCardSubtitle } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { caretForwardSharp, golfSharp, logInSharp } from "ionicons/icons";

@Component({
  selector: "app-course",
  templateUrl: "./course.page.html",
  styleUrls: ["./course.page.scss"],
  standalone: true,
  imports: [IonCardSubtitle, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonCardTitle, IonRow, IonIcon, IonCard, IonCol, IonCardHeader, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonRouterLink, IonRouterLink, RouterLink, RouterLinkActive, IonGrid],
})
export class CoursePage implements OnInit {
  constructor() {
    addIcons({ caretForwardSharp, golfSharp, logInSharp });
  }

  ngOnInit() {}
}
