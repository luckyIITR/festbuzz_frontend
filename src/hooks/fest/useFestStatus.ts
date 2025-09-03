import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

export interface FestStatus {
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  publishedBy: string | null;
  canPublish: boolean;
}

export interface FestStatusResponse {
  success: boolean;
  data: FestStatus;
}

export interface UpdateFestStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string;
    publishedBy?: string;
  };
}

// Get fest status
export function useFestStatus(festId: string) {
  return useQuery<FestStatusResponse>({
    queryKey: ['fest-status', festId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/fests/${festId}/status`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Publish fest
export function usePublishFest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string): Promise<UpdateFestStatusResponse> => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/fests/${festId}/publish`, {
        method: 'PUT'
      }, token);
    },
    onSuccess: (data, festId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
      queryClient.invalidateQueries({ queryKey: ['fest-status', festId] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
    },
  });
}

// Unpublish fest (move back to draft)
export function useUnpublishFest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string): Promise<UpdateFestStatusResponse> => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/fests/${festId}/unpublish`, {
        method: 'PUT'
      }, token);
    },
    onSuccess: (data, festId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
      queryClient.invalidateQueries({ queryKey: ['fest-status', festId] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
    },
  });
}

// Archive fest
export function useArchiveFest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string): Promise<UpdateFestStatusResponse> => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/fests/${festId}/archive`, {
        method: 'PUT'
      }, token);
    },
    onSuccess: (data, festId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
      queryClient.invalidateQueries({ queryKey: ['fest-status', festId] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
    },
  });
}

// Get fests by status
export function useFestsByStatus(status: 'draft' | 'published' | 'archived') {
  return useQuery({
    queryKey: ['fests', 'by-status', status],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/fests?status=${status}`, {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get published fests only (for public viewing)
export function usePublishedFests() {
  return useQuery({
    queryKey: ['fests', 'published'],
    queryFn: async () => {
      return await apiFetch('/api/fests/published');
    },
  });
}

// Get draft fests (admin/organizer only)
export function useDraftFests() {
  return useQuery({
    queryKey: ['fests', 'drafts'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/fests/drafts', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Get archived fests (admin/organizer only)
export function useArchivedFests() {
  return useQuery({
    queryKey: ['fests', 'archived'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/fests/archived', {}, token);
    },
    enabled: !!getToken(),
  });
}
