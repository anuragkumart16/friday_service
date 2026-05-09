import winston from 'winston';

/**
 * Winston Logger Configuration.
 * 
 * Configures the application-wide logger.
 * 
 * Features:
 * - Log Level: Defaults to 'info', or 'LOG_LEVEL' env var.
 * - Format: JSON format with timestamp and error stack traces.
 * - Transports: Console transport.
 */
export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()]
})

