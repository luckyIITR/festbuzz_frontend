export interface TeamMember {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    college?: string;
  };
  festId: string;
  role: string; // This will be fest-specific role like 'festival head', 'event manager', etc.
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

export interface AssignTeamMemberPayload {
  email: string;
  role: string;
  expiresAt?: string;
  notes?: string;
}

export interface UpdateTeamMemberPayload {
  role?: string;
  expiresAt?: string;
  notes?: string;
}

export interface TeamMemberResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

export interface TeamMembersResponse {
  success: boolean;
  message: string;
  data: TeamMember[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface RemoveTeamMemberResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    festId: string;
    removedRole: string;
  };
}

export interface UserFestival {
  _id: string;
  userId: string;
  festId: {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    venue: string;
    college: string;
  };
  role: string;
  assignedBy: {
    _id: string;
    name: string;
    email: string;
  };
  isActive: boolean;
  assignedAt: string;
  expiresAt?: string;
}

export interface UserFestivalsResponse {
  success: boolean;
  message: string;
  data: UserFestival[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}
