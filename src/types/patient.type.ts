/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPatientStatus = 'pending' | 'active' | 'blocked';

export interface IPatient {
  _id?: string;
  id?: string;
  fullName?: string;
  email: string;
  phone?: string;
  profileImg?: string;
  status: TPatientStatus | string;
  blockedAt?: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;

  // Legacy compatibility fields
  name?: string;
  country?: string;
  medicalInfo?: string;
  lastActivity?: string;
  avatar?: string;
}

export interface IPatientPaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IGetPatientsResponse {
  success: boolean;
  message: string;
  meta?: IPatientPaginationMeta;
  data: IPatient[];
}

export interface IPatientQueryParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}
