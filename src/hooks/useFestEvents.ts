import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Event, Sponsor, Judge } from '../types/fest';

interface ApiEvent {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  startDate: string;
  endDate: string;
  location?: string;
  image?: string;
  bannerImage?: string;
  category?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  isTeamEvent?: boolean;
  teamSize?: number;
  rules?: string;
  prizes?: string;
  sponsors?: Sponsor[];
  judges?: Judge[];
}

export function useFestEvents(festId: string) {
  return useQuery<Event[]>({
    queryKey: ['fest-events', festId],
    queryFn: async () => {
      const events = await apiFetch(`/api/fests/${festId}/events`);
      // Map _id to id if needed
      return (events as ApiEvent[]).map((event: ApiEvent) => ({
        ...event,
        id: event.id || event._id || '', // prefer id, fallback to _id
      }));
    },
    enabled: !!festId,
  });
} 