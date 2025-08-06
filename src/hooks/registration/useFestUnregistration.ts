import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface FestUnregistrationResponse {
  success: boolean;
  message: string;
  data: {
    festId: string;
    festName: string;
    deletedFestRegistration: boolean;
    deletedEventRegistrations: number;
    updatedTeams: number;
    deletedTeams: number;
  };
}

export function useFestUnregistration() {
  const queryClient = useQueryClient();
  
  return useMutation<FestUnregistrationResponse, Error, string>({
    mutationFn: (festId: string) => {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      return apiFetch<FestUnregistrationResponse>(`/api/registration/fest/${festId}/unregister`, {
        method: 'DELETE',
      }, token);
    },
    onSuccess: (data, festId) => {
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ['fest-registration-status', festId] });
      queryClient.invalidateQueries({ queryKey: ['myfests', 'registered'] });
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
      
      // Force refetch the registration status immediately
      queryClient.refetchQueries({ queryKey: ['fest-registration-status', festId] });
      
      // Update localStorage if needed
      if (typeof window !== 'undefined') {
        // You might want to update user stats or remove fest from user's registered fests
        console.log('Unregistration successful:', data);
      }
    },
  });
} 