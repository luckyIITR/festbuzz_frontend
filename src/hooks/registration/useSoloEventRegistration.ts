import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { SoloRegistrationRequest, RegistrationResponse } from '../../types/event-registration';
import { getToken } from '../../lib/token';

export function useSoloEventRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SoloRegistrationRequest): Promise<RegistrationResponse> => {
      const token = getToken();
      return apiFetch<RegistrationResponse>(
        '/event/solo',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
        token
      );
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['event', variables.eventId] });
      queryClient.invalidateQueries({ queryKey: ['fests', variables.festId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'registrations'] });
    },
    onError: (error) => {
      console.error('Solo event registration failed:', error);
    },
  });
} 