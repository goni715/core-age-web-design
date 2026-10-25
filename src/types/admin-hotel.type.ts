export interface IAdminHotelStat {
  title: string;
  value: string;
  description: string;
}

export interface IAdminHotel {
  id: string;
  name: string;
  type: string; // e.g. Luxury, Premium, Mid Range
  city: string;
  country: string;
  nearbyHospital: string;
  distance: string;
  price: string;
  rating: string;
  amenities: string[];
  status: string;
}
