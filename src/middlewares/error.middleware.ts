import { Request, Response, NextFunction } from 'express';
import { logger } from "./../logger/logger";
import ApiResponse from '../utils/response.util';

/**
 * Global Error Handling Middleware.
 * 
 * This middleware function:
 * 1. Logs the unhandled error details (message and stack trace) using the logger.
 * 2. Sends a structured 500 Internal Server Error response to the client.
 * 
 * @param err - The Error object caught by Express.
 * @param _req - Express Request object (unused).
 * @param res - Express Response object.
 * @param _next - Express NextFunction (unused).
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // write logs
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack
  });

  // send error response
  ApiResponse(res, 500, 'Something broke down, we are fixing it, come back again after some time!', {
    error: err.message
  })

};
