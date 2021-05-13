export interface ProductsResponse {
  total: number;
  productos: Product[];
}

export interface Product {
  price: number;
  _id: string;
  nombre: string;
  categoria: Category;
  user: Category;
  img?: string;
}

export interface Category {
  _id: string;
  name: string;
}