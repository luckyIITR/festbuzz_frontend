export type UserRole = 
  | 'superadmin'
  | 'admin'
  | 'festival_head'
  | 'event_manager'
  | 'event_coordinator'
  | 'event_volunteer'
  | 'participant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  phone?: string;
  dateOfBirth?: string;
  college?: string;
  address?: string;
  gender?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Permission types based on the matrix
export type Permission = 
  | 'create_fests'
  | 'manage_fests'
  | 'create_events'
  | 'modify_events'
  | 'manage_events'
  | 'assign_event_roles'
  | 'send_certificates'
  | 'publish_results'
  | 'view_event_details'
  | 'view_participants'
  | 'manage_users';

// Permission matrix mapping roles to permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  superadmin: [
    'create_fests',
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
  admin: [
    'create_fests',
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
  festival_head: [
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
  event_manager: [
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
  event_coordinator: [
    'view_event_details',
    'view_participants'
  ],
  event_volunteer: [
    'view_participants'
  ],
  participant: []
};

// Route permission mapping
export interface RoutePermission {
  path: string;
  permissions: Permission[];
  redirectTo?: string;
}

export const PROTECTED_ROUTES: RoutePermission[] = [
  // Fest management routes
  { path: '/fests/add', permissions: ['create_fests'], redirectTo: '/login' },
  { path: '/fests/[festId]/dashboard', permissions: ['manage_fests'], redirectTo: '/login' },
  { path: '/fests/[festId]/settings', permissions: ['manage_fests'], redirectTo: '/login' },
  
  // Event management routes
  { path: '/fests/[festId]/add-event', permissions: ['create_events'], redirectTo: '/login' },
  { path: '/fests/[festId]/events/[eventId]', permissions: ['view_event_details'], redirectTo: '/login' },
  { path: '/event/details', permissions: ['view_event_details'], redirectTo: '/login' },
  { path: '/event/settings', permissions: ['manage_events'], redirectTo: '/login' },
  { path: '/event/tickets', permissions: ['manage_events'], redirectTo: '/login' },
  { path: '/event/certificates', permissions: ['send_certificates'], redirectTo: '/login' },
  { path: '/event/judging', permissions: ['publish_results'], redirectTo: '/login' },
  { path: '/event/judging/ParametersandRounds', permissions: ['assign_event_roles'], redirectTo: '/login' },
  
  // User management routes
  { path: '/dashboard', permissions: ['manage_users'], redirectTo: '/login' },
  { path: '/profile', permissions: ['view_participants'], redirectTo: '/login' },
  { path: '/myfest', permissions: ['view_participants'], redirectTo: '/login' },
];

// Helper function to check if user has permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

// Helper function to check if user has any of the required permissions
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

// Helper function to check if user has all required permissions
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}
