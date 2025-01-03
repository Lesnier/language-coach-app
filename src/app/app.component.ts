import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  homeSharp,
  fileTrayStackedOutline,
  fileTrayStackedSharp,
  flowerOutline,
  flowerSharp,
  bookmarkOutline,
  bookmarkSharp,
  logOut,
  logInOutline,
  readerSharp,
  cashSharp,
  checkboxSharp,
  chatbubbleSharp,
  layersOutline,
  layersSharp,
  calendarSharp,
  calendarOutline,
} from 'ionicons/icons';
import { ApiService } from './services/api.service';

import { User } from './models/interfaces';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit, DoCheck {
  api = inject(ApiService);
  auth = inject(AuthService);

  loggedUser: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  

  public appPages = [
    { title: 'Inicio', url: '/start', icon: 'home' },
    { title: 'Secretaría', url: '/secretary', icon: 'file-tray-stacked' },
    { title: 'Agendar', url: '/schedule', icon: 'calendar' },
    { title: 'Cursos', url: '/courses', icon: 'layers' },
    { title: 'Foro', url: '/foro', icon: 'chatbubble' },
    { title: 'Tareas', url: '/homeworks-list', icon: 'checkbox' },
    { title: 'Documentos', url: '/documents', icon: 'reader' },
    { title: 'Pagos', url: '/payments-list', icon: 'cash' },
    { title: 'Configuraciones', url: '/setting', icon: 'flower' },
    { title: 'Logout', url: '/login', icon: 'log-in-outline' },
  ];
  public labels = [
    { title: 'Blog', url: '/folder/inbox', icon: 'home' },
    {
      title: 'Nuestra Historia',
      url: '/folder/outbox',
      icon: 'file-tray-stacked',
    },
  ];

  showLayout = true;
  currentUrl: string = '';

  constructor(private router: Router) {
    addIcons({
      homeOutline,
      homeSharp,
      fileTrayStackedOutline,
      fileTrayStackedSharp,
      flowerOutline,
      flowerSharp,
      bookmarkOutline,
      bookmarkSharp,
      logInOutline,
      readerSharp,
      cashSharp,
      calendarOutline, calendarSharp, layersSharp, layersOutline, chatbubbleSharp, checkboxSharp
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showLayout = !event.url.startsWith('/login');
      }
    });
  }

  ngDoCheck(): void {
    this.loggedUser = this.loggedUser;
  }

  onLogout() {
    const token = localStorage.getItem('access_token');
    if (token)
      this.api.logout(token).subscribe((res) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        this.router.navigate(['/login']);
      });
  }
}
