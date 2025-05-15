# API Documentation

This document outlines the API endpoints available in the CarrilloApps project.

## Base URL

All API endpoints are prefixed with:

```
https://carrillo.app/api
```

## Authentication

Some API endpoints may require authentication. Authentication is handled via JWT tokens that should be included in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK`: The request was successful
- `400 Bad Request`: The request was invalid
- `401 Unauthorized`: Authentication is required or failed
- `403 Forbidden`: The authenticated user does not have access
- `404 Not Found`: The requested resource does not exist
- `500 Server Error`: An internal server error occurred

Error responses include a JSON body with error details:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Available Endpoints

### GitHub Repositories

#### GET /api/github-repositories

Fetches repositories from GitHub for the CarrilloApps account.

**Parameters:**
- `limit` (optional): Number of repositories to return (default: 10)
- `sort` (optional): Sort field (default: "updated")
- `direction` (optional): Sort direction, "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "repositories": [
    {
      "id": "12345678",
      "name": "repository-name",
      "description": "Repository description",
      "url": "https://github.com/carrilloapps/repository-name",
      "language": "TypeScript",
      "stars": 123,
      "forks": 45,
      "updatedAt": "2025-01-15T12:30:45Z"
    }
  ],
  "total": 1
}
```

### GitLab Repositories

#### GET /api/gitlab-repositories

Fetches repositories from GitLab for the CarrilloApps account.

**Parameters:**
- `limit` (optional): Number of repositories to return (default: 10)
- `sort` (optional): Sort field (default: "updated")
- `direction` (optional): Sort direction, "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "repositories": [
    {
      "id": "12345678",
      "name": "repository-name",
      "description": "Repository description",
      "url": "https://gitlab.com/carrilloapps/repository-name",
      "language": "TypeScript",
      "stars": 123,
      "forks": 45,
      "updatedAt": "2025-01-15T12:30:45Z"
    }
  ],
  "total": 1
}
```

### Contact Form

#### POST /api/contact

Submits a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a potential project with you."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### Newsletter Subscription

#### POST /api/newsletter

Subscribes an email to the newsletter.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "You have been subscribed to the newsletter."
}
```

### Appointment Scheduling

#### GET /api/appointments/available

Fetches available appointment slots.

**Parameters:**
- `startDate`: Start date for available slots (ISO format)
- `endDate`: End date for available slots (ISO format)

**Response:**
```json
{
  "availableSlots": [
    {
      "date": "2025-05-20",
      "slots": [
        {
          "id": "slot-123",
          "startTime": "10:00",
          "endTime": "11:00",
          "available": true
        },
        {
          "id": "slot-124",
          "startTime": "14:00",
          "endTime": "15:00",
          "available": true
        }
      ]
    }
  ]
}
```

#### POST /api/appointments/book

Books an appointment slot.

**Request Body:**
```json
{
  "slotId": "slot-123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "subject": "Project Discussion",
  "message": "I'd like to discuss my project requirements."
}
```

**Response:**
```json
{
  "success": true,
  "appointment": {
    "id": "appt-456",
    "date": "2025-05-20",
    "startTime": "10:00",
    "endTime": "11:00",
    "confirmationCode": "CONF123456"
  },
  "message": "Your appointment has been scheduled successfully."
}
```

## Rate Limiting

API endpoints are subject to rate limiting to prevent abuse. The current limits are:

- Public endpoints: 60 requests per minute
- Authenticated endpoints: 100 requests per minute

When a rate limit is exceeded, the API will return a `429 Too Many Requests` status code with a `Retry-After` header indicating how many seconds to wait before retrying.
