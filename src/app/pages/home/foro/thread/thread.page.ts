import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  IonTextarea,
  IonText,
  IonCardContent,
  IonList,
  IonFooter,
  
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { chevronBackOutline, send } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.page.html',
  styleUrls: ['./thread.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonList,
    IonLabel,
    IonItem,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonIcon,
    IonButton,
    IonTextarea,
    IonInput
  ],
})
export class ThreadPage implements OnInit {
  id: string | null = null;
  name: string = '';
  title: string = '';
  api = inject(ApiService);
  navCtrl = inject(NavController);
  route = inject(ActivatedRoute);
  utils = inject(UtilsService);
  threads: any[] = [];
  threadreplys: any[] = [];
  comments: any[] = [];
  messages: any[] = [
    {
      sender: 'Jorge',
      message: 'Tengo un error en la instalación',
      isAdmin: false,
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      sender: 'Admin',
      message: 'Prueba otra vez',
      isAdmin: true,
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      sender: 'Jorge',
      message: '¿Puedes ser más específico? No estoy seguro de qué hacer.',
      isAdmin: false,
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      sender: 'Admin',
      message: 'Claro, intenta desinstalar completamente la aplicación y luego vuelve a instalarla. Asegúrate de tener una conexión a internet estable durante el proceso.',
      isAdmin: true,
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    }
  ];
  newComment: any = {
    id: 0,
    username: '',
    content: '',
  };

  constructor() {
    addIcons({ send, chevronBackOutline });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token)
      console.log(
        this.api.getThreads(token).subscribe((res) => {
          console.log(res);
        })
      );
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', this.id);
  }

  addComment() {}
  back() {
    this.navCtrl.back();
  }

}
