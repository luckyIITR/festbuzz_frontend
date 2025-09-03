import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { TeamMembersResponse, GetTeamMembersParams } from '../../types/team';

export function useFestivalTeam(festId: string, params: GetTeamMembersParams = {}) {
  const token = getToken();
  
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.role) queryParams.append('role', params.role);
  if (params.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const endpoint = `/api/festival-team/${festId}${queryString ? `?${queryString}` : ''}`;

  return useQuery<TeamMembersResponse>({
    queryKey: ['festival-team', festId, params],
    queryFn: async () => {
      const response = await apiFetch<TeamMembersResponse>(endpoint, {}, token);
      
      if (!response.success) {
        throw new Error('Failed to fetch festival team');
      }

      return response;
    },
    enabled: !!festId && !!token,
  });
}
