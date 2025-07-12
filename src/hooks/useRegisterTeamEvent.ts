import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

interface RegisterTeamEventPayload {
  festId: string;
  eventId: string;
  data: {
    teamName: string;
    teamMembers: Array<{
      name: string;
      email: string;
      phone?: string;
      college?: string;
      year?: string;
      branch?: string;
    }>;
  };
  token?: string;
}

export function useRegisterTeamEvent() {
  return useMutation({
    mutationFn: (payload: RegisterTeamEventPayload) =>
      apiFetch(
        `/api/fests/${payload.festId}/events/${payload.eventId}/register/team`,
        {
          method: 'POST',
          body: JSON.stringify(payload.data),
        },
        payload.token
      ),
  });
} 