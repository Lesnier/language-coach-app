import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/home/start/start.page').then((m) => m.StartPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./pages/home/schedule/schedule.page').then((m) => m.SchedulePage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/home/course/course.page').then((m) => m.CoursePage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'foro',
    loadComponent: () =>
      import('./pages/home/foro/foro.page').then((m) => m.ForoPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'thread/:id',
    loadComponent: () =>
      import('./pages/home/foro/thread/thread.page').then((m) => m.ThreadPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'homework',
    loadComponent: () =>
      import('./pages/home/homework/homework.page').then((m) => m.HomeworkPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'secretary',
    loadComponent: () =>
      import('./pages/secretary/secretary/secretary.page').then(
        (m) => m.SecretaryPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'documents',
    loadComponent: () =>
      import('./pages/secretary/documents/documents.page').then(
        (m) => m.DocumentsPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'new_document',
    loadComponent: () =>
      import('./pages/secretary/documents/new-document/new.page').then(
        (m) => m.NewPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./pages/setting/setting/setting.page').then((m) => m.SettingPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/setting/change-password/change-password.page').then(
        (m) => m.ChangePasswordPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'modules',
    loadComponent: () =>
      import('./pages/home/course/modules/modules.page').then(
        (m) => m.ModulesPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'homeworks-list',
    loadComponent: () =>
      import('./pages/home/homework/homeworks-list/homeworks.page').then(
        (m) => m.HomeworksPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'bills-list',
    loadComponent: () =>
      import(
        './pages/secretary/payments/payments-list/payments-list.page'
      ).then((m) => m.PaymentsListPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'new_homework',
    loadComponent: () =>
      import('./pages/home/homework/new-homework/new.page').then(
        (m) => m.NewPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'new_payment',
    loadComponent: () =>
      import('./pages/secretary/payments/new-payment/new.page').then(
        (m) => m.NewPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'content',
    loadComponent: () =>
      import('./pages/home/course/content/content.page').then(
        (m) => m.ContentPage
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'bills/bill-detail',
    loadComponent: () =>
      import(
        './pages/secretary/payments/payment-detail/payment-detail.page'
      ).then((m) => m.PaymentDetailPage),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
];
