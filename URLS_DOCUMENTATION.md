# FestBuzz Application - Available URLs Documentation

This document provides a comprehensive list of all available URLs in the FestBuzz frontend application.

## Table of Contents
- [Public Pages](#public-pages)
- [Authentication Pages](#authentication-pages)
- [Fest Management](#fest-management)
- [Event Management](#event-management)
- [User Profile](#user-profile)
- [Admin Dashboard](#admin-dashboard)
- [Static Pages](#static-pages)

---

## Public Pages

### Homepage
- **URL**: `/`
- **Description**: Main landing page with hero section and feature cards
- **File**: `src/app/page.tsx`

### About Page
- **URL**: `/about`
- **Description**: About page for the application
- **File**: `src/app/about/page.tsx`

### Fests Listing
- **URL**: `/fests`
- **Description**: Browse and discover all available fests
- **File**: `src/app/fests/page.tsx`

### Individual Fest Details
- **URL**: `/fests/[festId]`
- **Description**: View detailed information about a specific fest
- **File**: `src/app/fests/[festId]/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Fest Registration
- **URL**: `/fests/[festId]/register`
- **Description**: Register for a specific fest
- **File**: `src/app/fests/[festId]/register/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Add New Fest
- **URL**: `/fests/add`
- **Description**: Create a new fest with multi-step form
- **File**: `src/app/fests/add/page.tsx`

---

## Authentication Pages

### Login
- **URL**: `/login`
- **Description**: User login page with Google OAuth integration
- **File**: `src/app/login/page.tsx`

### Signup
- **URL**: `/signup`
- **Description**: User registration page
- **File**: `src/app/signup/page.tsx`

---

## Fest Management

### Fest Dashboard
- **URL**: `/fests/[festId]/dashboard`
- **Description**: Main dashboard for fest organizers
- **File**: `src/app/fests/[festId]/dashboard/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Fest Attendees
- **URL**: `/fests/[festId]/dashboard/attendees`
- **Description**: View and manage fest attendees
- **File**: `src/app/fests/[festId]/dashboard/attendees/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Fest Events
- **URL**: `/fests/[festId]/dashboard/events`
- **Description**: Manage events within a fest
- **File**: `src/app/fests/[festId]/dashboard/events/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Edit Fest - Basic Details
- **URL**: `/fests/[festId]/dashboard/edit/basic`
- **Description**: Edit basic fest information
- **File**: `src/app/fests/[festId]/dashboard/edit/basic/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Edit Fest - About
- **URL**: `/fests/[festId]/dashboard/edit/about`
- **Description**: Edit fest description and details
- **File**: `src/app/fests/[festId]/dashboard/edit/about/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Edit Fest - Tickets
- **URL**: `/fests/[festId]/dashboard/edit/tickets`
- **Description**: Manage fest ticket types and pricing
- **File**: `src/app/fests/[festId]/dashboard/edit/tickets/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

### Edit Fest - Add-ons
- **URL**: `/fests/[festId]/dashboard/edit/addons`
- **Description**: Manage fest add-ons and extras
- **File**: `src/app/fests/[festId]/dashboard/edit/addons/page.tsx`
- **Parameters**: `festId` - Unique identifier for the fest

---

## Event Management

### Event Details
- **URL**: `/fests/[festId]/events/[eventId]`
- **Description**: View detailed information about a specific event
- **File**: `src/app/fests/[festId]/events/[eventId]/page.tsx`
- **Parameters**: 
  - `festId` - Unique identifier for the fest
  - `eventId` - Unique identifier for the event

### Individual Event Registration
- **URL**: `/fests/[festId]/events/[eventId]/register/individual`
- **Description**: Register for an event as an individual
- **File**: `src/app/fests/[festId]/events/[eventId]/register/individual/page.tsx`
- **Parameters**: 
  - `festId` - Unique identifier for the fest
  - `eventId` - Unique identifier for the event

### Team Event Registration
- **URL**: `/fests/[festId]/events/[eventId]/register/team`
- **Description**: Register for an event as a team
- **File**: `src/app/fests/[festId]/events/[eventId]/register/team/page.tsx`
- **Parameters**: 
  - `festId` - Unique identifier for the fest
  - `eventId` - Unique identifier for the event

---

## User Profile

### Profile Dashboard
- **URL**: `/profile`
- **Description**: User profile main page
- **File**: `src/app/profile/page.tsx`

### Profile Notifications
- **URL**: `/profile/notification`
- **Description**: View and manage user notifications
- **File**: `src/app/profile/notification/page.tsx`

### Profile Team Management
- **URL**: `/profile/team`
- **Description**: Manage user's team memberships
- **File**: `src/app/profile/team/page.tsx`

### Profile Support
- **URL**: `/profile/support`
- **Description**: Access support and help resources
- **File**: `src/app/profile/support/page.tsx`

### My Fests
- **URL**: `/myfest`
- **Description**: View user's created and registered fests
- **File**: `src/app/myfest/page.tsx`

### Dashboard
- **URL**: `/dashboard`
- **Description**: User's main dashboard
- **File**: `src/app/dashboard/page.tsx`

---

## Admin Dashboard

### Admin Main Dashboard
- **URL**: `/admin`
- **Description**: Admin overview and analytics
- **File**: `src/app/admin/page.tsx`

### Admin Fests Management
- **URL**: `/admin/fests`
- **Description**: Manage all fests in the system
- **File**: `src/app/admin/fests/page.tsx`

### Admin Events Management
- **URL**: `/admin/events`
- **Description**: Manage all events in the system
- **File**: `src/app/admin/events/page.tsx`

### Admin Participants
- **URL**: `/admin/participants`
- **Description**: View all participants across fests
- **File**: `src/app/admin/participants/page.tsx`

### Admin Registrations
- **URL**: `/admin/registrations`
- **Description**: Manage all registrations
- **File**: `src/app/admin/registrations/page.tsx`

### Admin Analytics
- **URL**: `/admin/analytics`
- **Description**: Detailed analytics and insights
- **File**: `src/app/admin/analytics/page.tsx`

### Admin Reports
- **URL**: `/admin/reports`
- **Description**: Generate and view reports
- **File**: `src/app/admin/reports/page.tsx`

### Admin Settings
- **URL**: `/admin/settings`
- **Description**: System settings and configuration
- **File**: `src/app/admin/settings/page.tsx`

---

## Event Management (Standalone)

### Event Add-ons
- **URL**: `/event/addones`
- **Description**: Manage event add-ons
- **File**: `src/app/event/addones/page.tsx`

### Event Pricing
- **URL**: `/event/pricing`
- **Description**: Manage event pricing
- **File**: `src/app/event/pricing/page.tsx`

### Event Details
- **URL**: `/event`
- **Description**: Standalone event page
- **File**: `src/app/event/page.tsx`

---

## Static Pages

### 404 Not Found
- **URL**: `*` (any non-existent route)
- **Description**: Custom 404 error page
- **File**: `src/app/not-found.tsx`

---

## URL Patterns Summary

### Dynamic Routes
- `[festId]` - Fest identifier
- `[eventId]` - Event identifier

### Route Categories
1. **Public Routes**: Homepage, about, fest browsing
2. **Authentication Routes**: Login, signup
3. **Fest Management Routes**: Dashboard, editing, attendee management
4. **Event Management Routes**: Event details, registration
5. **User Profile Routes**: Profile, notifications, team management
6. **Admin Routes**: System administration and management
7. **Error Routes**: 404 and error handling

### Authentication Requirements
- **Public Routes**: No authentication required
- **Protected Routes**: Require user authentication
- **Admin Routes**: Require admin privileges
- **Fest Management Routes**: Require fest organizer permissions

---

## Notes

- All routes use Next.js 13+ App Router
- Dynamic routes are indicated by square brackets `[paramName]`
- Layout files provide shared UI components for route groups
- Authentication and authorization are handled at the route level
- The application supports both individual and team event registrations
- Admin routes are protected and require appropriate permissions
- Profile routes are user-specific and require authentication 