import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { 
  FestCandidatesResponse, 
  EventCandidatesResponse,
  CandidateFilters 
} from '../types/fest';

// Get fest candidates/attendees
export function useFestCandidates(festId: string, filters: CandidateFilters = {}) {
  return useQuery<FestCandidatesResponse>({
    queryKey: ['fest-candidates', festId, filters],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      
      const queryString = params.toString();
      const url = `/api/registration/fest/${festId}/candidates${queryString ? `?${queryString}` : ''}`;
      
      return await apiFetch(url, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get event candidates/attendees
export function useEventCandidates(eventId: string, filters: CandidateFilters = {}) {
  return useQuery<EventCandidatesResponse>({
    queryKey: ['event-candidates', eventId, filters],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);
      
      const queryString = params.toString();
      const url = `/api/registration/event/${eventId}/candidates${queryString ? `?${queryString}` : ''}`;
      
      return await apiFetch(url, {}, token);
    },
    enabled: !!getToken() && !!eventId,
  });
}

// Get confirmed fest candidates
export function useConfirmedFestCandidates(festId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useFestCandidates(festId, { ...filters, status: 'confirmed' });
}

// Get pending fest candidates
export function usePendingFestCandidates(festId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useFestCandidates(festId, { ...filters, status: 'pending' });
}

// Get cancelled fest candidates
export function useCancelledFestCandidates(festId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useFestCandidates(festId, { ...filters, status: 'cancelled' });
}

// Get solo event candidates
export function useSoloEventCandidates(eventId: string, filters: Omit<CandidateFilters, 'type'> = {}) {
  return useEventCandidates(eventId, { ...filters, type: 'solo' });
}

// Get team event candidates
export function useTeamEventCandidates(eventId: string, filters: Omit<CandidateFilters, 'type'> = {}) {
  return useEventCandidates(eventId, { ...filters, type: 'team' });
}

// Get confirmed event candidates
export function useConfirmedEventCandidates(eventId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useEventCandidates(eventId, { ...filters, status: 'confirmed' });
}

// Get pending event candidates
export function usePendingEventCandidates(eventId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useEventCandidates(eventId, { ...filters, status: 'pending' });
}

// Get cancelled event candidates
export function useCancelledEventCandidates(eventId: string, filters: Omit<CandidateFilters, 'status'> = {}) {
  return useEventCandidates(eventId, { ...filters, status: 'cancelled' });
} 