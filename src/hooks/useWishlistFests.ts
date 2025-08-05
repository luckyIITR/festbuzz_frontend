import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { Fest, WishlistResponse } from '../types/fest';

export function useWishlistFests() {
  return useQuery<Fest[]>({
    queryKey: ['wishlist-fests'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      const response = await apiFetch('/api/wishlist', {}, token) as WishlistResponse;
      // Extract fest data from wishlist items
      return response.data.wishlist.map(item => item.festId);
    },
    enabled: !!getToken(),
  });
} 