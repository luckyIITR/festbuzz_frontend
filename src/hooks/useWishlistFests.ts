import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { Fest } from '../types/fest';

export function useWishlistFests() {
  return useQuery<Fest[]>({
    queryKey: ['myfests', 'wishlist'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/myfests/wishlist', {}, token);
    },
    enabled: !!getToken(),
  });
} 