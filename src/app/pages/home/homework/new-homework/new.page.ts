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
  IonLabel, IonAvatar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonButton, IonInput
} from "@ionic/angular/standalone";

@Component({
  selector: "app-new",
  templateUrl: "./new.page.html",
  styleUrls: ["./new.page.scss"],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonInput, IonAvatar, IonAccordion, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonButton],
})
export class NewPage implements OnInit {
  constructor() {}

  selectedImage: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      // Leer la imagen como Data URL para la vista previa
      reader.onload = () => {
        this.selectedImage = reader.result as string; // Almacena la imagen en base64
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {}
}
