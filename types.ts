export interface User {
  name: string;
  tableNumber: string;
  token: string;
  checkInTime: Date;
}

export enum Category {
  HOT_COFFEE = 'Cafés Quentes',
  ICED_COFFEE = 'Cafés Gelados',
  FOOD = 'Salgados',
  SWEETS = 'Doces',
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  calories?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'pending' | 'sent';
}