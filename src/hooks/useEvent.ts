import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Event } from '../types/fest';

export function useEvent(festId: string, eventId: string) {
  return useQuery<Event>({
    queryKey: ['event', festId, eventId],
    queryFn: () => apiFetch(`/api/fests/${festId}/events/${eventId}`),
    enabled: !!festId && !!eventId,
  });
} 