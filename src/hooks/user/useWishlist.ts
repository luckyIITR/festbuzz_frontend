import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { 
  WishlistResponse, 
  WishlistCheckResponse, 
  CountResponse
} from '../../types/fest';

// Get user's wishlist
export function useWishlist(page: number = 1, limit: number = 50) {
  return useQuery<WishlistResponse>({
    queryKey: ['wishlist', page, limit],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/wishlist?page=${page}&limit=${limit}`, {}, token);
    },
    enabled: !!getToken(),
  });
}

// Check if a fest is in wishlist
export function useWishlistCheck(festId: string) {
  return useQuery<WishlistCheckResponse>({
    queryKey: ['wishlist-check', festId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/wishlist/check/${festId}`, {}, token);
    },
    enabled: !!getToken() && !!festId,
  });
}

// Get wishlist count
export function useWishlistCount() {
  return useQuery<CountResponse>({
    queryKey: ['wishlist-count'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/wishlist/count', {}, token);
    },
    enabled: !!getToken(),
  });
}

// Add fest to wishlist
export function useAddToWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/wishlist/add/${festId}`, { method: 'POST' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch wishlist queries
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-check'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-count'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-fests'] });
    },
  });
}

// Remove fest from wishlist
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (festId: string) => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch(`/api/wishlist/remove/${festId}`, { method: 'DELETE' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch wishlist queries
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-check'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-count'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-fests'] });
    },
  });
}

// Clear entire wishlist
export function useClearWishlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/wishlist/clear', { method: 'DELETE' }, token);
    },
    onSuccess: () => {
      // Invalidate and refetch wishlist queries
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-check'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-count'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-fests'] });
    },
  });
}

// Toggle wishlist status
export function useToggleWishlist() {
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  
  return {
    addToWishlist: addToWishlist.mutate,
    removeFromWishlist: removeFromWishlist.mutate,
    isAdding: addToWishlist.isPending,
    isRemoving: removeFromWishlist.isPending,
  };
} 