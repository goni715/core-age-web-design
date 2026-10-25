export interface IUser {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImg?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IUser;
}

export interface IUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: IUser[];
}
