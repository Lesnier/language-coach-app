import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons,
  IonCard,
  IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonMenuButton, IonRow,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,IonIcon, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonButtons, IonMenuButton, RouterLink]
})
export class DocumentsPage implements OnInit {
navCtrl = inject(NavController);
  constructor() { 
    addIcons({chevronBackOutline})
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }
}
