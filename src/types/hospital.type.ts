/* eslint-disable @typescript-eslint/no-explicit-any */
export type THospitalStatus = 'draft' | 'published' | 'archive';

export interface ICreateHospitalPayload {
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website?: string;
  status: THospitalStatus;
  image?: File | null | string;
}

export interface IHospital {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  image?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  specialities?: string[];
  languages?: string[];
  status?: THospitalStatus | string;
  ratings?: number;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;

  // Optional legacy compatibility fields
  location?: string;
  country?: string;
  city?: string;
  specialties?: string[];
  moreSpecialties?: string;
  rating?: number;
  price?: string;
  bengali?: boolean;
}

export interface IHospitalPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetHospitalsResponse {
  success: boolean;
  message: string;
  meta?: IHospitalPaginationMeta;
  data: IHospital[];
}

export interface IHospitalCountryStat {
  country: string;
  code: string;
  totalHospitals: number;
  count: number;
}

export interface IHospitalCountryStatsResponse {
  success: boolean;
  message: string;
  data: IHospitalCountryStat[];
}

export interface IHospitalQueryParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}
