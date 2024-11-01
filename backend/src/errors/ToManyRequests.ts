import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

export default class TooManyRequest extends AppError {
  constructor(message: string) {
    super(StatusCodes.TOO_MANY_REQUESTS, message);
  }
}
