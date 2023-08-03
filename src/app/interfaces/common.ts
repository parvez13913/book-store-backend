import { IGenericErrorMessage } from './error';

export type IGenericErrorRespons = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
