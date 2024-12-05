import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    redirectTo: "start",
    pathMatch: "full",
  },
  {
    path: "start",
    loadComponent: () => import("./pages/home/start/start.page").then((m) => m.StartPage),
  },
  {
    path: "schedule",
    loadComponent: () => import("./pages/home/schedule/schedule.page").then((m) => m.SchedulePage),
  },
  {
    path: "courses",
    loadComponent: () => import("./pages/home/course/course.page").then((m) => m.CoursePage),
  },
  {
    path: "foro",
    loadComponent: () => import("./pages/home/foro/foro.page").then((m) => m.ForoPage),
  },
  {
    path: 'thread/:id',
    loadComponent: () => import('./pages/home/foro/thread/thread.page').then(m => m.ThreadPage)
  },
  {
    path: "homework",
    loadComponent: () => import("./pages/home/homework/homework.page").then((m) => m.HomeworkPage),
  },
  {
    path: "secretary",
    loadComponent: () => import("./pages/secretary/secretary/secretary.page").then((m) => m.SecretaryPage),
  },
  {
    path: "payments",
    loadComponent: () => import("./pages/secretary/payments/payments.page").then((m) => m.PaymentsPage),
  },
  {
    path: "documents",
    loadComponent: () => import("./pages/secretary/documents/documents.page").then((m) => m.DocumentsPage),
  },
  {
    path: "new_document",
    loadComponent: () => import("./pages/secretary/documents/new-document/new.page").then((m) => m.NewPage),
  },
  {
    path: "setting",
    loadComponent: () => import("./pages/setting/setting/setting.page").then((m) => m.SettingPage),
  },
  {
    path: "modules",
    loadComponent: () => import("./pages/home/course/modules/modules.page").then((m) => m.ModulesPage),
  },
  {
    path: "homeworks-list",
    loadComponent: () => import("./pages/home/homework/homeworks-list/homeworks.page").then((m) => m.HomeworksPage),
  },
  {
    path: "payments-list",
    loadComponent: () => import("./pages/secretary/payments/payments-list/payments-list.page").then((m) => m.PaymentsListPage),
  },
  {
    path: "new_homework",
    loadComponent: () => import("./pages/home/homework/new-homework/new.page").then((m) => m.NewPage),
  },
  {
    path: "new_payment",
    loadComponent: () => import("./pages/secretary/payments/new-payment/new.page").then((m) => m.NewPage),
  },
  {
    path: "content",
    loadComponent: () => import("./pages/home/course/content/content.page").then((m) => m.ContentPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },

];
