import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';

interface RegistrationStatus {
  isRegistered: boolean;
  registration?: {
    id: string;
    status: string;
    ticket: string;
    createdAt: string;
  };
}

export function useFestRegistrationStatus(festId: string) {
  return useQuery<RegistrationStatus>({
    queryKey: ['fest-registration-status', festId],
    queryFn: async (): Promise<RegistrationStatus> => {
      const token = getToken();
      if (!token) {
        return { isRegistered: false };
      }
      
      try {
        const response = await apiFetch<RegistrationStatus>(`/api/registration/fest/${festId}/status`, {
          method: 'GET',
        }, token);
        return response;
      } catch {
        // If user is not registered, API might return 404
        return { isRegistered: false };
      }
    },
    enabled: !!festId && !!getToken(),
  });
} 