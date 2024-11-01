import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

export default class ConflictError extends AppError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message);
  }
}
