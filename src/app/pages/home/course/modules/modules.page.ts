import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { Course, Lesson } from 'src/app/models/interfaces';
@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonButton,
    IonIcon
  ],
})
export class ModulesPage implements OnInit {
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  navCtrl = inject(NavController);
  id: any;
  modules: any[] = [];
  clases: any[] = [];
  constructor() {
    addIcons({chevronBackOutline})
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((result) => {
      this.id = result.get('id');
    });

    let token = localStorage.getItem('access_token');

    if (token)
      this.api.getCourse(token, this.id).subscribe((res) => {
        this.modules = res.modules;
        console.log(this.modules)
      });
  }
  back(){
    this.navCtrl.back();
  }
}
