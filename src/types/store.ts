export interface Store {
  id: number;
  name: string;
  type: 'grocery' | 'books' | 'electronics' | 'clothing' | 'general';
  address: string;
  lat: number;
  lon: number;
  rating: number;
  reviews: number;
  description: string;
  hours: string;
  distance?: string; // Optional, can be calculated on the client side
}
