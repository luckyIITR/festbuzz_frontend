import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions, Permission } from '../types/user';

export function usePermissions() {
  const { user } = useAuth();

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  const canCreateFests = checkPermission('create_fests');
  const canManageFests = checkPermission('manage_fests');
  const canCreateEvents = checkPermission('create_events');
  const canModifyEvents = checkPermission('modify_events');
  const canManageEvents = checkPermission('manage_events');
  const canAssignEventRoles = checkPermission('assign_event_roles');
  const canSendCertificates = checkPermission('send_certificates');
  const canPublishResults = checkPermission('publish_results');
  const canViewEventDetails = checkPermission('view_event_details');
  const canViewParticipants = checkPermission('view_participants');
  const canManageUsers = checkPermission('manage_users');

  return {
    user,
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
  };
}
