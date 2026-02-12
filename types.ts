
export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
  category: 'Service' | 'Pack' | 'Abonnement' | 'Creation';
  likes: number;
  badges?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export type Page = 'shop' | 'creations' | 'profile' | 'admin';
