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
import { User } from 'src/app/models/interfaces';

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
    IonInput,
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
  user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  users: User[] = [];
  comments: any[] = [];
  newComment: string = '';

  constructor() {
    addIcons({ send, chevronBackOutline });
  }
  ngOnInit(): void {
    this.getThreads();

    this.id = this.route.snapshot.paramMap.get('id');
  }

  addComment() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api
        .postThreadReply(token, this.id, this.newComment)
        .subscribe((res) => {
          this.getThreads();
        });
  }
  back() {
    this.navCtrl.back();
  }

  getThreads() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.getThreads(token).subscribe((res) => {
        res.forEach((element: any) => {
          if (this.id == element.id) {
            this.comments = element.threadreplys;
          }
        });
      });
  }
}
