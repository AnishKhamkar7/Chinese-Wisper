import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

export default class ForbiddenError extends AppError {
  constructor(message: string) {
    super(StatusCodes.FORBIDDEN, message);
  }
}
