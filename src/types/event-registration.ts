// Event Registration Types based on API documentation

export interface SoloRegistrationRequest {
  festId: string;
  eventId: string;
  answers: string[];
}

export interface TeamRegistrationRequest {
  eventId: string;
  teamName: string;
  description?: string;
}

export interface JoinTeamRequest {
  teamCode: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data: {
    registration: {
      id: string;
      type: 'solo' | 'team';
      status: 'confirmed' | 'pending' | 'cancelled';
      ticket: string;
      qrCode: string;
      answers?: string[];
      registeredAt: string;
    };
    event: {
      id: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      location: string;
      mode: string;
      venue: string;
    };
  };
}

export interface TeamCreateResponse {
  success: boolean;
  message: string;
  data: {
    team: {
      id: string;
      teamName: string;
      teamCode: string;
      leaderId: string;
      members: string[];
      currentSize: number;
      maxSize: number;
      availableSlots: number;
      status: 'active' | 'inactive';
    };
    registration: {
      id: string;
      ticket: string;
      qrCode: string;
      status: 'confirmed' | 'pending' | 'cancelled';
    };
  };
}

export interface TeamJoinResponse {
  success: boolean;
  message: string;
  data: {
    team: {
      id: string;
      teamName: string;
      teamCode: string;
      leaderId: string;
      members: string[];
      currentSize: number;
      maxSize: number;
      availableSlots: number;
      status: 'active' | 'inactive';
    };
    registration: {
      id: string;
      ticket: string;
      qrCode: string;
      status: 'confirmed' | 'pending' | 'cancelled';
    };
  };
}

export interface TeamMember {
  name: string;
  email: string;
  phone?: string;
  college?: string;
  branch?: string;
}

export interface RegistrationFormData {
  participantName: string;
  email: string;
  phone?: string;
  college?: string;
  branch?: string;
  answers?: string[];
}

export interface TeamFormData {
  teamName: string;
  description?: string;
  members: TeamMember[];
}

export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface RegistrationFlow {
  steps: RegistrationStep[];
  currentStep: number;
  isComplete: boolean;
} 