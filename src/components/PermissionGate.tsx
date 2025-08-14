'use client';

import { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { Permission } from '../types/user';

interface PermissionGateProps {
  children: ReactNode;
  permissions: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function PermissionGate({ 
  children, 
  permissions, 
  requireAll = false,
  fallback = null 
}: PermissionGateProps) {
  const { checkAnyPermission, checkAllPermissions } = usePermissions();

  const hasAccess = requireAll 
    ? checkAllPermissions(permissions)
    : checkAnyPermission(permissions);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Convenience components for common permission checks
export function CreateFestsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['create_fests']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ManageFestsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['manage_fests']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function CreateEventsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['create_events']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ManageEventsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['manage_events']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ViewEventDetailsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['view_event_details']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ViewParticipantsGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['view_participants']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}

export function ManageUsersGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGate permissions={['manage_users']} fallback={fallback}>
      {children}
    </PermissionGate>
  );
}
