# FestBuz Frontend Documentation & Backend Requirements

## 1. Project Overview

FestBuz is a modern fest management platform built with Next.js and Tailwind CSS. It allows users to browse fests, view details, register for fests and events (individually or as a team), and manage authentication. The platform is designed to be scalable, responsive, and user-friendly.

---

## 2. Frontend Structure & User Flows

### 2.1. Pages & Routes

| Route                                             | Purpose/Content                                                                                  |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `/`                                               | Home page: Hero, offers, call-to-action, footer, navigation                                     |
| `/fests`                                          | List of all fests: Trending and Upcoming, each as clickable cards                               |
| `/fests/[festId]`                                 | Single fest details: Hero, details, gallery, events grid, sponsors, call-to-action              |
| `/fests/[festId]/register`                        | Fest registration form                                                                          |
| `/fests/[festId]/events/[eventId]`                | Single event details: Hero, details, rules, sponsors, judges, registration logic                |
| `/fests/[festId]/events/[eventId]/register`       | Event registration: Modal to choose team/individual, then redirects accordingly                 |
| `/fests/[festId]/events/[eventId]/register/individual` | Individual event registration form                                                        |
| `/fests/[festId]/events/[eventId]/register/team`  | Team event registration form (leader/member toggle)                                             |
| `/login`                                          | Login page: Email/password, Google login, password show/hide, link to signup                    |
| `/signup`                                         | Signup page: Email/password, Google signup, password show/hide, link to login                   |

### 2.2. Components

- **Navigation Bar**: Logo, menu, search, login/signup
- **Footer**: Consistent across all pages
- **Call-to-Action**: Reusable, used on home and fest pages
- **Cards**: For fests, events, offers
- **Modals**: For event registration type selection

### 2.3. User Flows

#### a. Browsing
- User lands on home page, can navigate to fests listing.
- User clicks a fest card to view fest details and events.
- User clicks an event card to view event details.

#### b. Registration
- **Fest Registration**: User clicks “Register” on a fest, fills out a form.
- **Event Registration**: User clicks “Register” on an event, chooses individual/team, fills out the appropriate form.
  - **Team Registration**: User can toggle between “I am the leader” and “I am not the leader” (different forms).

#### c. Authentication
- User can sign up or log in via email/password or Google.
- Auth state is used to protect registration flows.

---

## 3. Backend Requirements

### 3.1. Data Models

#### a. User
- id
- name
- email
- password (hashed)
- role (user/admin)
- profile info (optional)
- Google OAuth fields (if using social login)

#### b. Fest
- id
- name
- description
- start_date, end_date
- location
- cover_image
- gallery_images
- sponsors (array)
- events (array of event IDs)
- trending (boolean)
- upcoming (boolean)

#### c. Event
- id
- fest_id (reference)
- name
- description
- rules
- start_time, end_time
- location
- cover_image
- sponsors (array)
- judges (array)
- registration_type (individual/team/both)
- max_team_size, min_team_size

#### d. Registration
- id
- user_id (reference)
- fest_id (reference, nullable)
- event_id (reference, nullable)
- type (fest/event)
- registration_mode (individual/team)
- team_id (nullable)
- team_leader_id (nullable)
- team_members (array of user IDs)
- status (pending/confirmed/cancelled)
- timestamp

#### e. Team (if needed)
- id
- event_id
- leader_id
- members (array of user IDs)
- team_name

---

### 3.2. API Endpoints

#### a. Authentication
- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login user
- `POST /api/auth/google` – Google OAuth login/signup
- `GET /api/auth/me` – Get current user info
- `POST /api/auth/logout` – Logout

#### b. Fests
- `GET /api/fests` – List all fests (with filters: trending, upcoming)
- `GET /api/fests/:festId` – Get single fest details
- `POST /api/fests/:festId/register` – Register for a fest

#### c. Events
- `GET /api/fests/:festId/events` – List all events for a fest
- `GET /api/fests/:festId/events/:eventId` – Get single event details
- `POST /api/fests/:festId/events/:eventId/register` – Register for an event (individual/team)
- `POST /api/fests/:festId/events/:eventId/register/team` – Register a team for an event
- `POST /api/fests/:festId/events/:eventId/register/individual` – Register individually for an event

#### d. Teams (if separate)
- `POST /api/teams` – Create a team
- `GET /api/teams/:teamId` – Get team details
- `POST /api/teams/:teamId/add-member` – Add member to team

#### e. Miscellaneous
- `GET /api/sponsors` – List sponsors (if global)
- `GET /api/judges` – List judges (if global)
- `GET /api/users/:userId` – Get user profile

---

### 3.3. API Response Examples

#### Fest List (`GET /api/fests`)
```json
[
  {
    "id": "fest123",
    "name": "Tech Fest 2024",
    "description": "Annual technology festival...",
    "cover_image": "/images/techfest.jpg",
    "start_date": "2024-08-01",
    "end_date": "2024-08-03",
    "location": "IIT Campus",
    "trending": true,
    "upcoming": false
  }
]
```

#### Event Details (`GET /api/fests/:festId/events/:eventId`)
```json
{
  "id": "event456",
  "fest_id": "fest123",
  "name": "Hackathon",
  "description": "24-hour coding challenge...",
  "rules": ["Rule 1", "Rule 2"],
  "start_time": "2024-08-01T10:00:00Z",
  "end_time": "2024-08-02T10:00:00Z",
  "location": "Main Hall",
  "cover_image": "/images/hackathon.jpg",
  "sponsors": ["Sponsor A", "Sponsor B"],
  "judges": ["Judge X", "Judge Y"],
  "registration_type": "team",
  "max_team_size": 5,
  "min_team_size": 2
}
```

#### Registration (`POST /api/fests/:festId/events/:eventId/register`)
- Request:
```json
{
  "user_id": "user789",
  "registration_mode": "team",
  "team_id": "team001"
}
```
- Response:
```json
{
  "success": true,
  "registration_id": "reg123"
}
```

---

## 4. Backend Logic & Considerations

- **Authentication**: JWT or session-based, with support for Google OAuth.
- **Authorization**: Protect registration endpoints; only logged-in users can register.
- **Validation**: Enforce team size, event registration limits, and duplicate registration prevention.
- **Data Relationships**: Fests have many events; events can have many registrations; teams can have many members.
- **Extensibility**: Allow for additional fields (e.g., event results, certificates) in the future.

---

## 5. Summary of Expectations

- Provide RESTful APIs as described above.
- Ensure all data models support the fields and relationships outlined.
- Support both individual and team event registration flows.
- Implement authentication and authorization for protected actions.
- Return clear, consistent API responses for frontend consumption.

---

**If you need further clarifications or sample payloads for any endpoint, let me know!**
You can share this document directly with your backend team to guide their implementation. 