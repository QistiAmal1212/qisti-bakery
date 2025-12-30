export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface GeneratedCakeResponse {
  description: string;
  estimatedPrice: string;
  flavorProfile: string;
  visualDetails: string;
}

export interface CakeDesignResult {
  imageUrl: string | null;
  details: GeneratedCakeResponse | null;
}

import { CartItem } from './contexts/CartContext';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerDetails;
  timestamp: string;
}