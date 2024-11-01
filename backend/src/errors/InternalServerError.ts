import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

export default class InternalServerError extends AppError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}
