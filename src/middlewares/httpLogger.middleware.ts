import morgan from 'morgan';
import { logger } from "./../logger/logger"


/**
 * HTTP Request Logger Middleware.
 * Configures 'morgan' to log HTTP requests.
 * Features:
 * - Format: ':method :url :status :res[content-length] - :response-time ms'
 * - Stream: Redirects logs to the application's Winston logger instead of standard output.
 */
export const httpLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message: string) => logger.info(message.trim())
    }
})