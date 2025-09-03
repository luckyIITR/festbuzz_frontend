import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { UserFestivalsResponse } from '../../types/team';

export function useUserFestivals(userId: string, page: number = 1, limit: number = 20) {
  const token = getToken();
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());

  const endpoint = `/api/festival-team/user/${userId}?${queryParams.toString()}`;

  return useQuery<UserFestivalsResponse>({
    queryKey: ['user-festivals', userId, page, limit],
    queryFn: async () => {
      const response = await apiFetch<UserFestivalsResponse>(endpoint, {}, token);
      
      if (!response.success) {
        throw new Error('Failed to fetch user festivals');
      }

      return response;
    },
    enabled: !!userId && !!token,
  });
}
