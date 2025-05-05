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
  profile_picture?: string;
  birth_date?: string;
  is_outstanding?: boolean; 
}

export interface agenda {
  date: string;
  time: string;
  professor_id: number;
}

export interface agendas {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  professor_id: number;
  professor: User;
  student: User;
  state: string;
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
  course_id: number;
  created_at: string;
  id: number;
  lessons: Lesson[];
  name: string;
  updated_at: string;
}

export interface Availability {
  id?: number;
  professor_id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface Bill {
  id: number;
  description: string;
  emitter: string;
  user_id: number;
  payment_id: number | null;
  subscription_id: number;
  notified: number;
  emission_date: string;
  paid_date: string | null;
  status: string;
  subtotal: number;
  tax: number;
  amount_tax: number;
  total: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    role_id: number;
    name: string;
    birth_date: string;
    is_outstanding: boolean;
    email: string;
    email_verified_at: string | null;
    profile_picture: string;
    settings: {
      locale: string;
    };
    created_at: string;
    updated_at: string;
  };
  subscription: {
    id: number;
    user_id: number;
    status: string;
    period_start: string;
    period_end: string;
    created_at: string;
    updated_at: string;
    suscription_code: string;
    products:Product[];
  };
  payment: Payment | null;
  products: any[];
}

export interface Payment {
  id: number;
  user_id: number;
  image: string;
  transaction_code: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  total: number;
  created_at: string;
  updated_at: string;
}


