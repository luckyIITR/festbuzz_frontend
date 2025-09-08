import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { 
  RegistrationCountResponse, 
  RegistrationStatsResponse,
  RegistrationCount
} from '../../types/fest';

// Get registration count for a specific fest
export function useRegistrationCount(festId: string) {
  return useQuery<RegistrationCountResponse>({
    queryKey: ['registration-count', festId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/registration/fest/${festId}/count`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get detailed registration stats for a specific fest (Admin only)
export function useRegistrationStats(festId: string) {
  return useQuery<RegistrationStatsResponse>({
    queryKey: ['registration-stats', festId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/registration/fest/${festId}/stats`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get registration count for multiple fests
export function useMultipleRegistrationCounts(festIds: string[]) {
  return useQuery<(RegistrationCount & { festId: string })[]>({
    queryKey: ['registration-counts', festIds],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      // Fetch registration counts for all fests in parallel
      const promises = festIds.map(festId => 
        apiFetch(`/api/registration/fest/${festId}/count`, {}, token)
      );
      
      const results = await Promise.all(promises) as RegistrationCountResponse[];
      return results.map((result, index) => ({
        ...result.data,
        festId: festIds[index]
      }));
    },
    enabled: !!getToken() && festIds.length > 0,
  });
} 