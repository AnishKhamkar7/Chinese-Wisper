import BadRequestError from './BadRequestError';
import ConflictError from './ConflictError';
import InternalServerError from './InternalServerError';
import NotFoundError from './NotFoundError';
import ForbiddenError from './ForbiddenError';
import UnauthorizedError from './UnauthorizedError';
import TooManyRequest from './ToManyRequests';

export default class ErrorFactory {
  static badRequestError(message: string) {
    return new BadRequestError(message);
  }

  static conflictError(message: string) {
    return new ConflictError(message);
  }

  static internalServerError(message: string) {
    return new InternalServerError(message);
  }

  static notFoundError(message: string) {
    return new NotFoundError(message);
  }

  static forbiddenError(message: string) {
    return new ForbiddenError(message);
  }

  static unauthorizedError(message: string) {
    return new UnauthorizedError(message);
  }

  static tooManyRequest(message: string) {
    return new TooManyRequest(message);
  }
}
