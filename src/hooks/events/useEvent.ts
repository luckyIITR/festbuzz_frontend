import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Event, EventResponse } from '../../types/fest';

export function useEvent(festId: string, eventId: string) {
  return useQuery<Event>({
    queryKey: ['event', festId, eventId],
    queryFn: async () => {
      const response = await apiFetch<EventResponse>(`/api/events/${eventId}`);
      return response.data;
    },
    enabled: !!festId && !!eventId,
  });
} 