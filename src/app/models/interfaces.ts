export interface User {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  role_id: number;
  settings: {
    locale: string;
  };
  locale: string;
  updated_at: string;
}

export interface agenda {
  date: string;
  time: string;
}

export interface agendas {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
}

export interface data {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface cursos {
  id: number; 
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number; 
  name: string; 
  class_content: string;
  module_id: number;
  file_id: number | null;
  created_at: string; 
  updated_at: string;
}


export interface Course {
  course_id: number;
  id: number; 
  created_at: string;
  updated_at: string;
  lessons: Lesson[];
}

export interface models {
  course_id: number;            // Identificador único del curso
  created_at: string;           // Fecha y hora de creación en formato ISO 8601
  id: number;                   // Identificador único del modelo del curso
  lessons: Lesson[];            // Array de lecciones asociadas al curso
  name: string;                 // Nombre del curso
  updated_at: string;           // Fecha y hora de la última actualización en formato ISO 8601
}