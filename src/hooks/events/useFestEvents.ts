import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Event, Sponsor, Judge } from '../../types/fest';

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
        festId: festId, // Add the festId
        type: event.category || 'General', // Map category to type
        visibility: 'public', // Default visibility
        mode: 'offline', // Default mode
        imageUrls: event.image ? [event.image] : [], // Map image to imageUrls array
        tickets: event.price ? [{ // Create a ticket from price
          name: 'Entry',
          eventFeeType: 'paid',
          price: event.price,
          availableFrom: event.startDate,
          availableTill: event.endDate,
          availableTime: '00:00',
          endTime: '23:59',
          maxQuantity: event.maxParticipants || 100,
          currentQuantity: event.currentParticipants || 0,
          description: 'Event entry ticket'
        }] : []
      }));
    },
    enabled: !!festId,
  });
} 