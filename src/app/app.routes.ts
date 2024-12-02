import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
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
    path: "setting",
    loadComponent: () => import("./pages/setting/setting/setting.page").then((m) => m.SettingPage),
  },
  {
    path: "modules",
    loadComponent: () => import("./pages/home/course/modules/modules.page").then((m) => m.ModulesPage),
  },
  {
    path: "content",
    loadComponent: () => import("./pages/home/course/content/content.page").then((m) => m.ContentPage),
  },
];
