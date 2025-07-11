import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

interface RegisterTeamEventPayload {
  festId: string;
  eventId: string;
  data: any;
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