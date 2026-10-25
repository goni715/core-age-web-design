export interface IContent {
  _id?: string;
  type: string;
  content: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateOrUpdateContentPayload {
  type: string;
  content: string;
  title?: string;
}

export interface IContentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IContent;
}
