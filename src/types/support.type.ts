export interface ISupportUser {
  _id?: string;
  fullName?: string;
  email?: string;
  profileImg?: string;
}

export interface ISupport {
  _id?: string;
  id?: string;
  ticket?: string;
  user?: ISupportUser;
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  replyMessage?: string;
  replyAt?: string | null;
  status?: "pending" | "resolved" | "in-progress" | "open" | string;
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
