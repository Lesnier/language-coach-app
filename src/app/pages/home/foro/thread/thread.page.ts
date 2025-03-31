import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, send } from 'ionicons/icons';
import { User } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.page.html',
  styleUrls: ['./thread.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
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
  messages: any[] = [];
  newComment = {
    text: '',
    name: this.user.name,
  };

  @ViewChild('chatcontent') chatContent!: IonContent;

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
        .postThreadReply(token, this.id, JSON.stringify(this.newComment))
        .subscribe((res) => {
          this.newComment.text = '';
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
            this.title = element.comment; // Set the title from thread comment
            this.comments = element.threadreplys;

            for (let i = 0; i < this.comments.length; i++) {
              try {
                // Try to parse the response as JSON
                this.comments[i].response = JSON.parse(
                  this.comments[i].response
                );
              } catch (e) {
                // If parsing fails, create a compatible object with the text
                this.comments[i].response = {
                  name: this.getUserNameById(this.comments[i].user_id),
                  text: this.comments[i].response,
                };
              }
            }
            console.log(this.comments);

            setTimeout(() => {
              this.chatContent.scrollToBottom(200);
            }, 200);
          }
        });
      });
  }

  // Helper method to get user name by ID
  getUserNameById(userId: number): string {
    // If users are available, find the user
    const user = this.users.find((u) => u.id === userId);
    if (user) return user.name;

    // Fallback to current user if ID matches
    if (this.user.id === userId) return this.user.name;

    // Default fallback
    return 'Usuario';
  }
}
