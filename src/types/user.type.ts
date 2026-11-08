export interface IUser {
  _id?: string;
  id?: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  agencyName?: string;
  approvalStatus?: string;
  profileImg?: string;
  role?: string;
  status?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfileResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: IUser;
}

export interface IAgentProfileData {
  _id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  agencyName?: string;
  approvalStatus?: "pending" | "approved" | "rejected" | string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  profileImg?: string;
}

export interface IAgentProfileResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: IAgentProfileData;
}

export interface ISubAgentProfileData {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  agencyName?: string;
  agentUserId?: string;
  agentName?: string;
  agentEmail?: string;
  agentPhone?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  profileImg?: string;
}

export interface ISubAgentProfileResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: ISubAgentProfileData;
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
