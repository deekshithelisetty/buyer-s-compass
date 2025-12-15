export interface ProductColor {
  name: string;
  hex: string;
  image?: string; // Optional image for this color variant
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Multiple product images for gallery
  category: string;
  rating: number;
  reviews: number;
  description?: string;
  features?: string[];
  inStock: boolean;
  sizes?: string[]; // Available sizes for this product
  colors?: ProductColor[]; // Available colors with optional variant images
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}
