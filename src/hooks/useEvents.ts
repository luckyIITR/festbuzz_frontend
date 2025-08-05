import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { Event, EventStatusResponse } from '../types/fest';

// Get events by status
export function useEventsByStatus(status: 'draft' | 'published' | 'archived') {
  return useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ['events', 'by-status', status],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events?status=${status}`, {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get published events only
export function usePublishedEvents() {
  return useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ['events', 'published'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/events/published', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get draft events (admin only)
export function useDraftEvents() {
  return useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ['events', 'drafts'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/events/drafts', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get events for a specific fest
export function useFestEvents(festId: string) {
  return useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ['events', 'fest', festId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events?festId=${festId}`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get events for a specific fest by status
export function useFestEventsByStatus(festId: string, status: 'draft' | 'published' | 'archived') {
  return useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ['events', 'fest', festId, 'status', status],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events?festId=${festId}&status=${status}`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get event status
export function useEventStatus(eventId: string) {
  return useQuery<EventStatusResponse>({
    queryKey: ['event-status', eventId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events/${eventId}/status`, {}, token);
    },
    enabled: !!getToken() && !!eventId,
  });
}

// Save event as draft
export function useSaveEventAsDraft() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventData: Partial<Event>) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/events/draft', {
        method: 'POST',
        body: JSON.stringify(eventData)
      }, token);
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['events', 'drafts'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'draft'] });
    },
  });
}

// Publish event
export function usePublishEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events/${eventId}/publish`, {
        method: 'POST'
      }, token);
    },
    onSuccess: (_, eventId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['events', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'drafts'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'draft'] });
      queryClient.invalidateQueries({ queryKey: ['event-status', eventId] });
    },
  });
}

// Unpublish event
export function useUnpublishEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events/${eventId}/unpublish`, {
        method: 'POST'
      }, token);
    },
    onSuccess: (_, eventId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['events', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'drafts'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'draft'] });
      queryClient.invalidateQueries({ queryKey: ['event-status', eventId] });
    },
  });
}

// Archive event
export function useArchiveEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/events/${eventId}/archive`, {
        method: 'POST'
      }, token);
    },
    onSuccess: (_, eventId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['events', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'published'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'by-status', 'archived'] });
      queryClient.invalidateQueries({ queryKey: ['event-status', eventId] });
    },
  });
} 