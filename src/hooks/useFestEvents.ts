import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Event } from '../types/fest';

export function useFestEvents(festId: string) {
  return useQuery<Event[]>({
    queryKey: ['fest-events', festId],
    queryFn: async () => {
      const events = await apiFetch(`/api/fests/${festId}/events`);
      // Map _id to id if needed
      return (events as any[]).map((event: any) => ({
        ...event,
        id: event.id || event._id, // prefer id, fallback to _id
      }));
    },
    enabled: !!festId,
  });
} 