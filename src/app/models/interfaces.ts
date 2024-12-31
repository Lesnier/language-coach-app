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
