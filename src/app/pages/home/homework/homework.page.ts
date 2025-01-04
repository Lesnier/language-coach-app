import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeworkPage implements OnInit {

  api = inject(ApiService)
  constructor() { }

  ngOnInit() {
    let token = localStorage.getItem('access_token');
    if(token)
    this.api.getTask(token).subscribe(res=>{
  console.log(res);
  })
  }

}
