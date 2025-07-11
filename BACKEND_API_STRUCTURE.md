# Backend API Structure for Fest Management System

## Base URL
```
http://localhost:8000
```

## Authentication Endpoints

### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST /api/auth/logout
Logout user (requires token)

### GET /api/auth/profile
Get user profile (requires token)

## Fest Endpoints

### GET /api/fests
Get all fests with optional filters
```
Query Parameters:
- type: string (cultural, technical, entrepreneur)
- location: string
- date: string (YYYY-MM-DD)
- price_min: number
- price_max: number
- status: string (upcoming, ongoing, completed, cancelled)
```

### GET /api/fests/:festId
Get specific fest details

### POST /api/fests
Create new fest (requires authentication)
```json
{
  "name": "Music Festival 2025",
  "description": "A week-long celebration of music and culture",
  "organizer": "IIT Roorkee",
  "location": "IIT Roorkee Campus",
  "startDate": "2025-09-14T00:00:00Z",
  "endDate": "2025-09-20T23:59:59Z",
  "individualPrice": 200,
  "teamPrice": 500,
  "theme": "Retro Vibes",
  "eligibility": "Open to all college students",
  "specialAttractions": "Celebrity performances, food stalls, art installations",
  "perks": "Free goodies, certificates, networking opportunities",
  "categories": ["Dance", "Singing", "Fine arts", "Others"],
  "maxParticipants": 1000,
  "isRegistrationOpen": true,
  "isTeamRegistration": true,
  "teamSize": 4,
  "rules": "Standard competition rules apply",
  "prizes": "Cash prizes worth ₹50,000",
  "logo": "https://example.com/logo.png",
  "organizerLogo": "https://example.com/org-logo.png",
  "heroImage": "https://example.com/hero.jpg",
  "bannerImage": "https://example.com/banner.jpg",
  "galleryImages": [
    "https://example.com/gallery1.jpg",
    "https://example.com/gallery2.jpg"
  ]
}
```

### PUT /api/fests/:festId
Update fest (requires authentication)

### DELETE /api/fests/:festId
Delete fest (requires authentication)

## Event Endpoints

### GET /api/fests/:festId/events
Get all events for a specific fest

### GET /api/fests/:festId/events/:eventId
Get specific event details

### POST /api/fests/:festId/events
Create new event (requires authentication)
```json
{
  "name": "Dance Competition",
  "description": "Show your dance moves and win prizes",
  "price": 2000,
  "startDate": "2025-09-15T10:00:00Z",
  "endDate": "2025-09-15T18:00:00Z",
  "location": "Main Auditorium",
  "category": "Dance",
  "maxParticipants": 100,
  "isTeamEvent": true,
  "teamSize": 4,
  "rules": "Any dance form allowed, 5-10 minutes performance",
  "prizes": "1st: ₹10,000, 2nd: ₹5,000, 3rd: ₹2,500",
  "image": "https://example.com/event-image.jpg",
  "bannerImage": "https://example.com/event-banner.jpg"
}
```

### PUT /api/fests/:festId/events/:eventId
Update event (requires authentication)

### DELETE /api/fests/:festId/events/:eventId
Delete event (requires authentication)

## Registration Endpoints

### POST /api/fests/:festId/register
Register for fest (individual)
```json
{
  "registrationType": "individual",
  "participantId": "user_id_here"
}
```

### POST /api/fests/:festId/register/team
Register for fest (team)
```json
{
  "registrationType": "team",
  "teamName": "Dancing Stars",
  "teamLeaderId": "user_id_here",
  "teamMembers": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567891"
    }
  ]
}
```

### POST /api/fests/:festId/events/:eventId/register
Register for event (individual)
```json
{
  "registrationType": "individual",
  "participantId": "user_id_here"
}
```

### POST /api/fests/:festId/events/:eventId/register/team
Register for event (team)
```json
{
  "registrationType": "team",
  "teamName": "Event Team",
  "teamLeaderId": "user_id_here",
  "teamMembers": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ]
}
```

## Sponsor Endpoints

### GET /api/fests/:festId/sponsors
Get sponsors for a fest

### POST /api/fests/:festId/sponsors
Add sponsor to fest (requires authentication)
```json
{
  "name": "Tech Corp",
  "logo": "https://example.com/sponsor-logo.png",
  "image": "https://example.com/sponsor-image.jpg",
  "website": "https://techcorp.com"
}
```

## Data Models

### User Model
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string (hashed)",
  "role": "user | admin | organizer",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Fest Model
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "organizer": "string",
  "location": "string",
  "startDate": "timestamp",
  "endDate": "timestamp",
  "individualPrice": "number",
  "teamPrice": "number",
  "logo": "string (URL)",
  "organizerLogo": "string (URL)",
  "heroImage": "string (URL)",
  "bannerImage": "string (URL)",
  "theme": "string",
  "eligibility": "string",
  "specialAttractions": "string",
  "perks": "string",
  "categories": ["string"],
  "galleryImages": ["string (URL)"],
  "sponsors": ["Sponsor"],
  "maxParticipants": "number",
  "currentParticipants": "number",
  "isRegistrationOpen": "boolean",
  "isTeamRegistration": "boolean",
  "teamSize": "number",
  "rules": "string",
  "prizes": "string",
  "status": "upcoming | ongoing | completed | cancelled",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Event Model
```json
{
  "id": "string",
  "festId": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "startDate": "timestamp",
  "endDate": "timestamp",
  "location": "string",
  "image": "string (URL)",
  "bannerImage": "string (URL)",
  "category": "string",
  "maxParticipants": "number",
  "currentParticipants": "number",
  "isTeamEvent": "boolean",
  "teamSize": "number",
  "rules": "string",
  "prizes": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Sponsor Model
```json
{
  "id": "string",
  "name": "string",
  "logo": "string (URL)",
  "image": "string (URL)",
  "website": "string (URL)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Registration Model
```json
{
  "id": "string",
  "festId": "string",
  "eventId": "string (optional)",
  "userId": "string",
  "registrationType": "individual | team",
  "teamName": "string (for team registration)",
  "teamLeaderId": "string (for team registration)",
  "teamMembers": ["TeamMember"],
  "paymentStatus": "pending | completed | failed",
  "amount": "number",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### TeamMember Model
```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## File Upload

For image uploads, use multipart/form-data:
- Logo images: max 2MB, formats: PNG, JPG, JPEG
- Banner images: max 5MB, formats: PNG, JPG, JPEG
- Gallery images: max 3MB each, formats: PNG, JPG, JPEG

## Error Codes

- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid email/password
- `USER_NOT_FOUND`: User not found
- `FEST_NOT_FOUND`: Fest not found
- `EVENT_NOT_FOUND`: Event not found
- `REGISTRATION_CLOSED`: Registration is closed
- `MAX_PARTICIPANTS_REACHED`: Maximum participants reached
- `ALREADY_REGISTERED`: User already registered
- `INVALID_TEAM_SIZE`: Invalid team size
- `PAYMENT_FAILED`: Payment processing failed
- `VALIDATION_ERROR`: Input validation failed
- `SERVER_ERROR`: Internal server error 