import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: "app-modules",
  templateUrl: "./modules.page.html",
  styleUrls: ["./modules.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton],
})
export class ModulesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
