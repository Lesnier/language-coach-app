import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
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
  IonNote, IonBadge, IonItemGroup, IonItemDivider, IonSelect, IonSelectOption,
} from '@ionic/angular/standalone';

import {ApiService} from 'src/app/services/api.service';
import {HttpClient} from '@angular/common/http';
import {addIcons} from 'ionicons';
import {calendarOutline, chevronBackOutline} from 'ionicons/icons';
import {agenda, agendas, Availability} from 'src/app/models/interfaces';
import {NavController} from '@ionic/angular';
import {UtilsService} from 'src/app/services/utils.service';
import {Observable} from "rxjs";

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
    IonBadge,
    IonItemGroup,
    IonItemDivider,
    IonSelect,
    IonSelectOption,
  ],
})
export class SchedulePage implements OnInit {
  api = inject(ApiService);
  http = inject(HttpClient);
  navCtrl = inject(NavController);
  utils = inject(UtilsService);
  @ViewChild(IonDatetime, {static: false}) datePicker!: IonDatetime;
  availabilities: Availability[] = [];

  invalidDate: boolean = false;
  createdDate: boolean = false;

  fechaModel: string = '';
  fechaActual: Date;

  agendas: agendas[] = [];


  constructor() {
    this.fechaActual = new Date();
    addIcons({calendarOutline, chevronBackOutline});
  }

  ngOnInit() {
    this.fechaModel = new Date().toISOString();
    this.getAgendas();
    this.getAvailabilities();
  }

  agendar() {
    const fechaCompleta = new Date(this.fechaModel);

    fechaCompleta.setDate(fechaCompleta.getDate());

    const token = localStorage.getItem('access_token');

    const agendarData: agenda = {
      date: fechaCompleta.toISOString().split('T')[0],
      time: fechaCompleta.toTimeString().slice(0, 5),
    };

    if (fechaCompleta > this.fechaActual) {
      const diaSemana = fechaCompleta.getDay();
      if (token && diaSemana !== 0 && diaSemana !== 6) {
        this.api.postAgenda(agendarData, token).subscribe((res) => {
          this.createdDate = true;
          this.invalidDate = false;
        });
      } else {
        this.createdDate = false;
        this.invalidDate = true;
      }
    } else {
      this.createdDate = false;
      this.invalidDate = true;
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

  getAvailabilities() {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.api.getAvailabilities(token);
      this.api.daysAvailable$.subscribe((availabilities: Availability[]) => {
        console.log('disponibilidades', availabilities)
        if (availabilities) {
          this.availabilities = availabilities;
          if (this.datePicker) {
            this.datePicker.isDateEnabled = (dateString: string) => this.isDateEnabled(dateString);
          }
        }
      })
    }
  }

  back() {
    this.navCtrl.back();
  }

  allowedRanges = [
    {start: new Date(2025, 1, 18), end: new Date(2025, 1, 20)},
    {start: new Date(2025, 2, 19), end: new Date(2025, 2, 20)}
  ];

  availableDays = [
    {date: new Date(2025, 1, 18)},
    {date: new Date(2025, 1, 19)}
  ];

  isDateEnabled = (dateString: string): boolean => {
    const date = new Date(dateString);
    return this.availabilities.some(item => {
      date.setHours(0, 0, 0, 0);
      let availableDay = new Date(item.day_of_week);
      availableDay.setHours(0, 0, 0, 0);
      return date.getTime() == availableDay.getTime();
    })
  };


}
