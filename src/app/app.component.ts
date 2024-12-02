import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonButtons } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { homeOutline, homeSharp, fileTrayStackedOutline, fileTrayStackedSharp, flowerOutline, flowerSharp, bookmarkOutline, bookmarkSharp } from "ionicons/icons";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonButtons, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: "Inicio", url: "/start", icon: "home" },
    { title: "Secretaría", url: "/secretary", icon: "file-tray-stacked" },
    { title: "Configuraciones", url: "/setting", icon: "flower" },
  ];
  public labels = [
    { title: "Blog", url: "/folder/inbox", icon: "home" },
    { title: "Nuestra Historia", url: "/folder/outbox", icon: "file-tray-stacked" },
  ];
  constructor() {
    addIcons({ homeOutline, homeSharp, fileTrayStackedOutline, fileTrayStackedSharp, flowerOutline, flowerSharp, bookmarkOutline, bookmarkSharp });
  }
}
