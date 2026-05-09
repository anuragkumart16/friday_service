# API Documentation

## Base URL

`http://localhost:<PORT>` (Default: 5001)

## Endpoints

### Health Check

**GET** `/healthcheck`

Checks the status of the service.

**Response:**

```json
{
  "success": true,
  "message": "server is up and running!",
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

---

_More endpoints can be added here as the application grows._
