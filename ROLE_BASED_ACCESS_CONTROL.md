# Role-Based Access Control (RBAC) System

## Overview

The RBAC system provides fine-grained access control based on user roles and permissions.

## User Roles

- `superadmin` - Full system access
- `admin` - Can create and manage fests/events
- `festival_head` - Can manage fests and events
- `event_manager` - Can create and manage events
- `event_coordinator` - Can view event details and participants
- `event_volunteer` - Can view participants only
- `participant` - Basic access

## Permissions

- `create_fests` - Create new festivals
- `manage_fests` - Manage existing festivals
- `create_events` - Create new events
- `modify_events` - Modify existing events
- `manage_events` - Manage events
- `assign_event_roles` - Assign roles to participants
- `send_certificates` - Send certificates
- `publish_results` - Publish event results
- `view_event_details` - View detailed event info
- `view_participants` - View participant lists
- `manage_users` - Manage user accounts

## Usage

### Protecting Pages

```typescript
import { RouteGuard } from '@/components/RouteGuard';

export default function ProtectedPage() {
  return (
    <RouteGuard requiredPermissions={['create_fests']}>
      <PageContent />
    </RouteGuard>
  );
}
```

### Conditional Rendering

```typescript
import { CreateFestsGate } from '@/components/PermissionGate';

<CreateFestsGate>
  <button>Create Fest</button>
</CreateFestsGate>
```

### Permission Hooks

```typescript
import { usePermissions } from '@/hooks/usePermissions';

const { canCreateFests, checkPermission } = usePermissions();
```

## Protected Routes

Routes are automatically protected based on the permission matrix in `src/types/user.ts`.
