import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { CreateFestRequest, CreateFestResponse } from './useAddFestMutation';

export interface UpdateFestRequest extends Partial<CreateFestRequest> {
  id?: string;
}

export function useUpdateFest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...festData }: UpdateFestRequest): Promise<CreateFestResponse> => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      return apiFetch<CreateFestResponse>(`/api/fests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(festData),
      }, token);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['fest', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
      queryClient.invalidateQueries({ queryKey: ['fest-status', variables.id] });
      
      // Update the specific fest in cache if we have the data
      if (data.data && variables.id) {
        queryClient.setQueryData(['fest', variables.id], data.data);
      }
    },
    onError: (error) => {
      console.error('Error updating fest:', error);
    },
  });
};
