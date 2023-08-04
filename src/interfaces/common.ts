import { IGenericErrorMessage } from './error';

export type IGenericErrorRespons = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };

  data: T;
};
