import { useAuth } from '../contexts/AuthContext';
import { useMyFestivalRoles } from './team';
import { hasPermission, Permission } from '../types/user';

export function useFestPermissions(festId?: string) {
  const { user } = useAuth();
  const { data: myFestRoles } = useMyFestivalRoles();

  // Get user's role in the specific festival
  const getFestRole = (): string | null => {
    if (!festId || !myFestRoles?.data) return null;
    
    const festRole = myFestRoles.data.find(role => role.festId._id === festId);
    return festRole?.role || null;
  };

  // Check if user has permission based on hierarchical system
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;

    // First check user-level permissions
    const userLevelPermission = hasPermission(user.role, permission);
    if (userLevelPermission) return true;

    // If user is organizer, check fest-specific permissions
    if (user.role === 'organizer' && festId) {
      const festRole = getFestRole();
      if (!festRole) return false;

      // Map fest roles to permissions
      const festRolePermissions: Record<string, Permission[]> = {
        'festival head': [
          'manage_fests',
          'create_events',
          'modify_events',
          'manage_events',
          'assign_event_roles',
          'send_certificates',
          'publish_results',
          'view_event_details',
          'view_participants',
          'manage_users'
        ],
        'event manager': [
          'create_events',
          'modify_events',
          'manage_events',
          'assign_event_roles',
          'send_certificates',
          'publish_results',
          'view_event_details',
          'view_participants'
        ],
        'event coordinator': [
          'view_event_details',
          'view_participants'
        ],
        'event volunteer': [
          'view_participants'
        ]
      };

      return festRolePermissions[festRole]?.includes(permission) || false;
    }

    return false;
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => checkPermission(permission));
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => checkPermission(permission));
  };

  // Permission checks
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
  const canManageTeam = checkPermission('assign_event_roles');

  // Check if user can access dashboard (has any management permissions)
  const canAccessDashboard = checkAnyPermission([
    'manage_fests',
    'create_events',
    'modify_events',
    'manage_events',
    'assign_event_roles',
    'send_certificates',
    'publish_results',
    'view_event_details',
    'view_participants'
  ]);

  return {
    user,
    festRole: getFestRole(),
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
