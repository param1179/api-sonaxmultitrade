import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || error,
    error: error.error || 'Internal Server Error',
  });
};