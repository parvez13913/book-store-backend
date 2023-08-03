import mongoose from 'mongoose';
import { IGenericErrorRespons } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorRespons => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
