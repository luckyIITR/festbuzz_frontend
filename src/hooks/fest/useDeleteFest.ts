import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

export interface DeleteFestResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    deletedAt: string;
  };
}

export function useDeleteFest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string): Promise<DeleteFestResponse> => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      return apiFetch<DeleteFestResponse>(`/api/fests/${festId}`, {
        method: 'DELETE',
      }, token);
    },
    onSuccess: (data, festId) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
      queryClient.invalidateQueries({ queryKey: ['fest-status', festId] });
      
      // Remove the specific fest from cache
      queryClient.removeQueries({ queryKey: ['fest', festId] });
    },
    onError: (error) => {
      console.error('Error deleting fest:', error);
    },
  });
};
