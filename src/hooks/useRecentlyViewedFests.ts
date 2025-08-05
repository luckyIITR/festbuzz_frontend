import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { Fest, RecentlyViewedResponse } from '../types/fest';

export function useRecentlyViewedFests() {
  return useQuery<Fest[]>({
    queryKey: ['recently-viewed-fests'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const response = await apiFetch('/api/recently-viewed', {}, token) as RecentlyViewedResponse;
      // Extract fest data from recently viewed items
      return response.data.recentlyViewed.map(item => item.festId);
    },
    enabled: !!getToken(),
  });
} 