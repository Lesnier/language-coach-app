import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons,
  IonCard,
  IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonMenuButton, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonButtons, IonMenuButton, RouterLink]
})
export class DocumentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
