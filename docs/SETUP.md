# Setup and Configuration

## Prerequisites

- Node.js (v18+)
- npm

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|Scan |---|---|
| `PORT` | Server listening port | `5001` |
| `NODE_ENV` | Environment (dev, production) | `dev` |
| `MICROSERVICE_NAME` | Name of the service | `server` |
| `LOG_LEVEL` | Logging level (info, error, debug) | `info` |
| `DATABASE_URL` | MongoDB Connection URL | - |

## Running the Application

**Development Mode:**

```bash
npm run dev
```

**Run Tests:**

```bash
npm run test
```
