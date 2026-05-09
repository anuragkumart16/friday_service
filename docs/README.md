# Project Overview

This is a TypeScript-based Microservice Template using Express.js. It provides a solid foundation for building scalable backend services with built-in best practices.

## Key Features

- **TypeScript**: Fully typed codebase for better developer experience and reduced bugs.
- **Express.js**: Fast, unopinionated, minimalist web framework.
- **Winston Logger**: Structured logging with JSON support.
- **Morgan**: HTTP request logging.
- **Centralized Config**: Type-safe environment variable management.
- **Global Error Handling**: Centralized middleware for handling exceptions.
- **Health Check**: Ready-to-use health check endpoint.
- **Prisma**: Type-safe database client (configured).

## Directory Structure

```
src/
├── config/         # Environment configuration
├── controllers/    # Request handlers
├── logger/         # Logging configuration
├── middlewares/    # Express middlewares (error handling, logging)
├── routes/         # Route definitions
├── utils/          # Utility functions (response formatting)
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```
