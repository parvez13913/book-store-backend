import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespons } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handelZodError = (error: ZodError): IGenericErrorRespons => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handelZodError;
