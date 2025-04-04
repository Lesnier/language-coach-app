import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookmarkOutline,
  bookmarkSharp,
  calendarOutline,
  calendarSharp,
  cashSharp,
  chatbubbleSharp,
  checkboxSharp,
  fileTrayStackedOutline,
  fileTrayStackedSharp,
  flowerOutline,
  flowerSharp,
  homeOutline,
  homeSharp,
  layersOutline,
  layersSharp,
  logInOutline,
  readerSharp,
} from 'ionicons/icons';
import { User } from './models/interfaces';
import { ApiService } from './services/api.service';
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
  router = inject(Router);

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

  constructor() {
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
      calendarOutline,
      calendarSharp,
      layersSharp,
      layersOutline,
      chatbubbleSharp,
      checkboxSharp,
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
    let user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (user) {
      this.loggedUser = user;
    }
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
