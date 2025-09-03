# Team Management System

This document describes the comprehensive team management system implemented for festival management, allowing festival organizers to assign, manage, and control team member roles and permissions.

## Features

### Core Functionality
- **Assign Team Members**: Add users to festival teams with specific roles
- **Update Team Members**: Modify roles, expiration dates, and notes
- **Remove Team Members**: Remove users from festival teams
- **Search & Filter**: Find team members by name, email, or role
- **User Search**: Search for users to add to the team
- **Permission Management**: Granular permission control for different roles
- **Expiration Dates**: Time-limited role assignments

### Roles Available
- **Festival Head**: Full festival management permissions
- **Event Manager**: Event creation and management
- **Event Coordinator**: Event coordination and participant management
- **Event Volunteer**: Basic participant viewing permissions

## API Endpoints

### Team Management
- `POST /api/festival-team/:festId/assign` - Assign a user to a festival
- `DELETE /api/festival-team/:festId/remove/:userId` - Remove a user from a festival
- `PUT /api/festival-team/:festId/update/:userId` - Update a team member's role
- `GET /api/festival-team/:festId` - Get all team members for a festival
- `GET /api/festival-team/user/:userId` - Get all festivals a user has roles in
- `GET /api/festival-team/my-festivals` - Get current user's festival roles

### User Search
- `GET /api/users/search?q=searchTerm` - Search for users by name or email

## Implementation Details

### Hooks Created

#### Team Management Hooks
- `useFestivalTeam(festId, params)` - Fetch team members for a festival
- `useAssignTeamMember(festId)` - Assign a new team member
- `useRemoveTeamMember(festId)` - Remove a team member
- `useUpdateTeamMember(festId)` - Update a team member's details
- `useUserFestivals(userId, page, limit)` - Get user's festival roles
- `useMyFestivalRoles(page, limit)` - Get current user's festival roles

#### User Search Hook
- `useSearchUsers(searchTerm)` - Search for users by name or email

### Types Defined

```typescript
interface TeamMember {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    college?: string;
  };
  festId: string;
  role: string;
  assignedBy: {
    _id: string;
    name: string;
    email: string;
  };
  isActive: boolean;
  assignedAt: string;
  expiresAt?: string;
  permissions: {
    canManageFest: boolean;
    canCreateEvents: boolean;
    canModifyEvents: boolean;
    canManageEvents: boolean;
    canAssignEventRoles: boolean;
    canSendCertificates: boolean;
    canPublishResults: boolean;
    canViewEventDetails: boolean;
    canViewParticipants: boolean;
    canManageTeam: boolean;
  };
  notes?: string;
}
```

### Components Created

#### Main Team Management Page
- **Location**: `src/app/fests/[festId]/dashboard/settings/page.tsx`
- **Features**:
  - Display all team members in a responsive grid
  - Search and filter functionality
  - Add new team members with role assignment
  - Edit existing team member details
  - Remove team members with confirmation
  - Loading and error states
  - Empty state handling

#### User Search Modal
- **Location**: `src/app/fests/[festId]/dashboard/settings/UserSearchModal.tsx`
- **Features**:
  - Real-time user search
  - User selection with display of name, email, and college
  - Minimum 2 character search requirement
  - Loading and error states

#### Add Member Modal
- **Features**:
  - Email input with search functionality
  - Role selection dropdown
  - Optional notes field
  - Form validation
  - Loading states

#### Edit Member Modal
- **Features**:
  - Pre-populated form with current data
  - Role update functionality
  - Notes editing
  - Loading states

## Usage Examples

### Basic Team Management
```typescript
import { useFestivalTeam, useAssignTeamMember } from '@/hooks/team';

// Fetch team members
const { data: teamData, isLoading } = useFestivalTeam(festId, {
  search: 'john',
  role: 'event_manager'
});

// Assign a new team member
const assignMember = useAssignTeamMember(festId);
assignMember.mutate({
  email: 'user@example.com',
  role: 'event_manager',
  notes: 'Assigned for event coordination'
});
```

### User Search
```typescript
import { useSearchUsers } from '@/hooks/user';

const { data: searchResults } = useSearchUsers('john doe');
```

## Permission System

The system implements a granular permission system where each role has specific permissions:

- **Festival Head**: Can manage the entire festival, assign roles, and has all permissions
- **Event Manager**: Can create, modify, and manage events, assign event roles
- **Event Coordinator**: Can view event details and participants
- **Event Volunteer**: Can view participants only

## Security Features

- **Token-based Authentication**: All API calls require valid authentication tokens
- **Permission Validation**: Backend validates user permissions before allowing operations
- **Role-based Access Control**: Users can only perform actions allowed by their role
- **Festival-specific Permissions**: Permissions are scoped to specific festivals

## Error Handling

The system includes comprehensive error handling:
- API error responses are properly caught and displayed
- Loading states prevent multiple submissions
- User-friendly error messages
- Confirmation dialogs for destructive actions

## Styling

The UI follows the existing design system:
- Dark theme with `#1E1E1E` and `#191919` backgrounds
- Urbanist font family
- Consistent spacing and rounded corners
- Responsive design for mobile and desktop
- Hover effects and transitions

## Future Enhancements

Potential improvements for the team management system:
- Bulk operations (add/remove multiple members)
- Role templates for common team structures
- Advanced filtering and sorting options
- Team member activity tracking
- Notification system for role changes
- Audit logs for team management actions
