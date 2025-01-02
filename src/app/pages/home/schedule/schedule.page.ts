import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonDatetime,
  IonRow,
  IonCard,
  IonIcon,
  IonCol,
  IonItem,
  IonGrid,
  IonButton,
  IonLabel,
  IonList,
  IonNote,
} from '@ionic/angular/standalone';

import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { calendarOutline, chevronBackOutline } from 'ionicons/icons';
import { agenda, agendas } from 'src/app/models/interfaces';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonList,
    IonLabel,
    IonButton,
    IonGrid,
    IonCol,
    IonIcon,
    IonCard,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonDatetime,
    IonMenuButton,
    IonItem,
  ],
})
export class SchedulePage implements OnInit {

  api = inject(ApiService);
  http = inject(HttpClient);
  navCtrl = inject(NavController);

  invalidDate: boolean = false;

  fechaModel: string = '';
  fechaActual: Date;

  agendas: agendas[] = [];

  constructor() {
    this.fechaActual = new Date();

    addIcons({ calendarOutline,chevronBackOutline });
  }

  ngOnInit() {
    this.getAgendas();
  }

  agendar() {
    const fechaCompleta = new Date(this.fechaModel);

    const token = localStorage.getItem('access_token');

    const agendarData: agenda = {
      date: fechaCompleta.toISOString().split('T')[0],
      time: fechaCompleta.toTimeString().slice(0, 5),
    };

    if (fechaCompleta > this.fechaActual) {
      const diaSemana = fechaCompleta.getDay();
      if (token && diaSemana !==0 && diaSemana !== 6) {
        this.api.postAgenda(agendarData, token).subscribe((res) => {
        this.invalidDate = false;
        });
      } else {
        this.invalidDate = true;
      }
    }
    this.getAgendas();
  }

  getAgendas() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getAgendas(token).subscribe((res) => {
        this.agendas = res.agendas;
      });
    }
  }

  back(){
    this.navCtrl.back();
  }
}
