export interface ISupportUser {
  _id?: string;
  fullName?: string;
  email?: string;
  profileImg?: string;
}

export interface ISupport {
  _id?: string;
  id?: string;
  user?: ISupportUser;
  subject?: string;
  message?: string;
  status?: "pending" | "resolved" | "in-progress" | string;
  priority?: "low" | "medium" | "high" | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISupportResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: ISupport[];
}

export interface ISubmitSupportPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ISubmitSupportResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
