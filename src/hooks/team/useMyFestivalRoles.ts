import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { UserFestivalsResponse } from '../../types/team';

export function useMyFestivalRoles(page: number = 1, limit: number = 20) {
  const token = getToken();
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  const endpoint = `/api/festival-team/my-festivals?${queryParams.toString()}`;

  return useQuery<UserFestivalsResponse>({
    queryKey: ['my-festival-roles', page, limit],
    queryFn: async () => {
      const response = await apiFetch<UserFestivalsResponse>(endpoint, {}, token);
      
      if (!response.success) {
        throw new Error('Failed to fetch my festival roles');
      }

      return response;
    },
    enabled: !!token,
  });
}
