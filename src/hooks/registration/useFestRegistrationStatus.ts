import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface RegistrationStatusData {
  isRegistered: boolean;
  registration?: {
    id: string;
    status: string;
    ticket: string;
    createdAt: string;
  };
}

interface RegistrationStatusResponse {
  success: boolean;
  message: string;
  data: RegistrationStatusData;
}

export function useFestRegistrationStatus(festId: string) {
  return useQuery<RegistrationStatusData>({
    queryKey: ['fest-registration-status', festId],
    queryFn: async (): Promise<RegistrationStatusData> => {
      const token = getToken();
      if (!token) {
        return { isRegistered: false };
      }
      
      try {
        const response = await apiFetch<RegistrationStatusResponse>(`/api/registration/fest/${festId}/status`, {
          method: 'GET',
        }, token);
        
        // Return the data from the response
        return response.data;
      } catch {
        // If user is not registered, API might return 404
        return { isRegistered: false };
      }
    },
    enabled: !!festId && !!getToken(),
  });
} 