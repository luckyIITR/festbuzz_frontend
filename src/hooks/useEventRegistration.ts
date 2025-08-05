import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { 
  EventRegistrationCountResponse, 
  EventRegistrationStatsResponse 
} from '../types/fest';

// Get event registration count
export function useEventRegistrationCount(eventId: string) {
  return useQuery<EventRegistrationCountResponse>({
    queryKey: ['event-registration-count', eventId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/registration/event/${eventId}/count`, {}, token);
    },
    enabled: !!getToken() && !!eventId,
  });
}

// Get detailed event registration stats (Admin only)
export function useEventRegistrationStats(eventId: string) {
  return useQuery<EventRegistrationStatsResponse>({
    queryKey: ['event-registration-stats', eventId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/registration/event/${eventId}/stats`, {}, token);
    },
    enabled: !!getToken() && !!eventId,
  });
}

// Get registration counts for multiple events
export function useMultipleEventRegistrationCounts(eventIds: string[]) {
  return useQuery({
    queryKey: ['event-registration-counts', eventIds],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      // Fetch registration counts for all events in parallel
      const promises = eventIds.map(eventId => 
        apiFetch(`/api/registration/event/${eventId}/count`, {}, token)
      );
      
      const results = await Promise.all(promises) as EventRegistrationCountResponse[];
      return results.map((result, index) => ({
        ...result.data,
        eventId: eventIds[index]
      }));
    },
    enabled: !!getToken() && eventIds.length > 0,
  });
} 