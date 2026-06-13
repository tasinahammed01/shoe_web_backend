import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle unmatched routes (404 Not Found)
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: `Route Not Found - ${req.method} ${req.originalUrl}`,
  });
};
