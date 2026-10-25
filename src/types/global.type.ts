import React from "react";

export type TChildren = {
  children: React.ReactNode;
};

export interface IParam {
  name: string;
  value: string;
}

export interface IGenericResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}
