import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';

interface RegisterEventPayload {
  festId: string;
  eventId: string;
  data: any;
  token?: string;
}

export function useRegisterEvent() {
  return useMutation({
    mutationFn: (payload: RegisterEventPayload) =>
      apiFetch(
        `/api/fests/${payload.festId}/events/${payload.eventId}/register`,
        {
          method: 'POST',
          body: JSON.stringify(payload.data),
        },
        payload.token
      ),
  });
} 