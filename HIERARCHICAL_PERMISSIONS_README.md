# Hierarchical Permission System

This document describes the updated permission system that implements a hierarchical model combining user-level roles with fest-specific roles.

## Architecture Overview

### 1. User-Level Roles (System-Wide)
Users have one of four system-wide roles:
- **superadmin**: Full system access
- **admin**: Administrative access
- **organizer**: Can create and manage festivals
- **participant**: Basic user access

### 2. Fest-Specific Roles (Within Festivals)
Organizers can be assigned detailed roles within specific festivals:
- **festival head**: Full festival management
- **event manager**: Event creation and management
- **event coordinator**: Event coordination
- **event volunteer**: Basic participant viewing

### 3. Permission Flow
```
User Request → Check Global Role → Check Fest-Specific Role → Grant/Deny Access
```

## Implementation Details

### Updated Types

#### User Roles
```typescript
// User-level roles (system-wide)
export type UserRole = 
  | 'superadmin'
  | 'admin'
  | 'organizer'
  | 'participant';

// Fest-specific roles (within a festival)
export type FestRole = 
  | 'festival head'
  | 'event manager'
  | 'event coordinator'
  | 'event volunteer';
```

#### Permission Matrix
```typescript
// User-level permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  superadmin: [/* all permissions */],
  admin: [/* all permissions */],
  organizer: [/* festival management permissions */],
  participant: []
};

// Fest-specific permissions
const festRolePermissions: Record<string, Permission[]> = {
  'festival head': [/* full festival permissions */],
  'event manager': [/* event management permissions */],
  'event coordinator': [/* coordination permissions */],
  'event volunteer': [/* basic viewing permissions */]
};
```

### New Hooks

#### useFestPermissions
The main hook that combines user-level and fest-specific permissions:

```typescript
export function useFestPermissions(festId?: string) {
  // Returns hierarchical permission checks
  return {
    user,
    festRole,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    canCreateFests,
    canManageFests,
    canCreateEvents,
    canModifyEvents,
    canManageEvents,
    canAssignEventRoles,
    canSendCertificates,
    canPublishResults,
    canViewEventDetails,
    canViewParticipants,
    canManageUsers,
    canManageTeam,
    canAccessDashboard,
  };
}
```

### Permission Logic

#### 1. User-Level Check
First, check if the user has the permission at the system level:
```typescript
const userLevelPermission = hasPermission(user.role, permission);
if (userLevelPermission) return true;
```

#### 2. Fest-Specific Check
If user is an organizer, check fest-specific permissions:
```typescript
if (user.role === 'organizer' && festId) {
  const festRole = getFestRole();
  return festRolePermissions[festRole]?.includes(permission) || false;
}
```

## Usage Examples

### Navbar Dashboard Access
```typescript
const { canAccessDashboard } = useFestPermissions();

// Show dashboard if user has any management permissions
{(canManageUsers || canAccessDashboard) && (
  <Link href="/dashboard">Dashboard</Link>
)}
```

### Team Management Permissions
```typescript
const { canAssignEventRoles } = useFestPermissions(festId);

// Only show team management features to authorized users
{canAssignEventRoles && (
  <button onClick={addMember}>Add New Member</button>
)}
```

### Fest-Specific Role Display
```typescript
const { festRole } = useFestPermissions(festId);

// Display user's role in this specific festival
<div>Your role: {festRole || 'No role assigned'}</div>
```

## Key Benefits

### 1. Flexible Role Assignment
- Organizers can have different roles in different festivals
- Example: User A can be "festival head" for Tech Fest but "event manager" for Cultural Fest

### 2. Granular Permissions
- Fine-grained control over what each role can do
- Permissions are scoped to specific festivals

### 3. Hierarchical Security
- System-level roles provide broad access
- Fest-specific roles provide detailed control
- Clear permission escalation path

### 4. Scalable Architecture
- Easy to add new roles and permissions
- Supports complex organizational structures
- Maintains security boundaries

## Migration Notes

### From Old System
- **User roles**: `festival_head`, `event_manager`, etc. → `organizer` (user-level)
- **Fest roles**: Now handled by `FestivalUserRole` model
- **Permissions**: Combined user-level + fest-specific checks

### Updated Components
- **Navbar**: Now shows dashboard for organizers with fest roles
- **Team Management**: Uses fest-specific permissions
- **Permission Gates**: Updated to use hierarchical system

## Security Considerations

### 1. Permission Validation
- Backend validates both user-level and fest-specific permissions
- No client-side permission bypass possible

### 2. Role Escalation
- Users cannot assign roles higher than their own
- Clear permission boundaries between roles

### 3. Audit Trail
- All role assignments are tracked
- Assignment history maintained

## Future Enhancements

### 1. Role Templates
- Predefined role templates for common scenarios
- Bulk role assignment

### 2. Permission Groups
- Group permissions for easier management
- Custom permission sets

### 3. Advanced Features
- Role inheritance
- Temporary role assignments
- Role approval workflows
