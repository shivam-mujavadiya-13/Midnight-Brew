export interface MenuItem {
  id: string;
  name: string;
  price: number;
  inrPrice: number;
  description: string;
  category: 'coffee-hot' | 'coffee-cold' | 'other-beverages' | 'pastries' | 'cakes-desserts';
  image: string;
  tags?: string[];
  calories: number;
  ingredients: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  isVerified: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  status: 'confirmed' | 'pending';
  specialRequests?: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CustomDrink {
  base: string; // "espresso" | "coldbrew" | "matcha" | "chocolate"
  milk: string; // "whole" | "oat" | "almond" | "coconut" | "none"
  sweetness: string; // "none" | "low" | "medium" | "extra"
  temperature: 'hot' | 'iced';
  toppings: string[]; // ["caramel", "cinnamon", "whipped-cream", "chocolate-drizzle"]
}
