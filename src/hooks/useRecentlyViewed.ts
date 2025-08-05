import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { 
  RecentlyViewedResponse, 
  CountResponse,
  StatsResponse,
  RecentlyViewedItem 
} from '../types/fest';

// Get recently viewed fests
export function useRecentlyViewed(page: number = 1, limit: number = 20) {
  return useQuery<RecentlyViewedResponse>({
    queryKey: ['recently-viewed', page, limit],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/recently-viewed?page=${page}&limit=${limit}`, {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get most viewed fests
export function useMostViewed(limit: number = 10) {
  return useQuery<RecentlyViewedItem[]>({
    queryKey: ['most-viewed', limit],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const response = await apiFetch(`/api/recently-viewed/most-viewed?limit=${limit}`, {}, token);
      return response.data;
    },
    enabled: !!getToken(),
  });
}

// Get recently viewed count
export function useRecentlyViewedCount() {
  return useQuery<CountResponse>({
    queryKey: ['recently-viewed-count'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/recently-viewed/count', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get viewing statistics
export function useViewingStats() {
  return useQuery<StatsResponse>({
    queryKey: ['viewing-stats'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/recently-viewed/stats', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Add fest to recently viewed
export function useAddToRecentlyViewed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/recently-viewed/add/${festId}`, { method: 'POST' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch recently viewed queries
      queryClient.invalidateQueries({ queryKey: ['recently-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['most-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-count'] });
      queryClient.invalidateQueries({ queryKey: ['viewing-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-fests'] });
    },
  });
}

// Remove fest from recently viewed
export function useRemoveFromRecentlyViewed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/recently-viewed/remove/${festId}`, { method: 'DELETE' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch recently viewed queries
      queryClient.invalidateQueries({ queryKey: ['recently-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['most-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-count'] });
      queryClient.invalidateQueries({ queryKey: ['viewing-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-fests'] });
    },
  });
}

// Clear recently viewed history
export function useClearRecentlyViewed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/recently-viewed/clear', { method: 'DELETE' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch recently viewed queries
      queryClient.invalidateQueries({ queryKey: ['recently-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['most-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-count'] });
      queryClient.invalidateQueries({ queryKey: ['viewing-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recently-viewed-fests'] });
    },
  });
} 