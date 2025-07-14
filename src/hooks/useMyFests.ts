import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';
import { Fest } from '../types/fest';

export function useMyFests() {
  return useQuery<Fest[]>({
    queryKey: ['myfests'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      return await apiFetch('/api/myfests', {}, token);
    },
    enabled: !!getToken(),
  });
} 