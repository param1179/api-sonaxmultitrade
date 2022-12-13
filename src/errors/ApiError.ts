import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from '../consts';

export class ApiError extends Error {
  status;
  error;
  constructor(status: number, message: string, error: any) {
    super(message);
    this.status = status;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(
    message = 'Unauthorized Error',
    error = 'Unauthorized',
  ) {
    return new ApiError(UNAUTHORIZED, message, error);
  }

  static ForbiddenError(message = 'Forbidden Error', error = 'Forbidden') {
    return new ApiError(FORBIDDEN, message, error);
  }

  static BadRequest(message: string, error: any = 'Bad Request') {
    return new ApiError(BAD_REQUEST, message, error);
  }
}