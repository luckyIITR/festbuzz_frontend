import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Fest } from '../types/fest';

export function useFests() {
  return useQuery<Fest[]>({
    queryKey: ['fests'],
    queryFn: async () => {
      const fests = await apiFetch('/api/fests');
      // Map _id to id if needed
      return (fests as any[]).map((fest: any) => ({
        ...fest,
        id: fest.id || fest._id, // prefer id, fallback to _id
      }));
    },
  });
} 