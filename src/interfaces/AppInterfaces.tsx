export interface LoginPayload {
  correo: string;
  password: string
}

export interface RegisterPayload {
  correo: string;
  password: string;
  nombre: string
}

export interface LoginResponse {
  usuario: User;
  token: string;
}

export interface User {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  img?: string;
}

export interface Category {
  _id: string;
  nombre: string;
  usuario?: User
}

export interface CategoriesResponse {
  total: number;
  categorias: Category[];
}