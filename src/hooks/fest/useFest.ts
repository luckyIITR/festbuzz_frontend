import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Fest } from '../../types/fest';

export function useFest(festId: string) {
  return useQuery<Fest>({
    queryKey: ['fest', festId],
    queryFn: () => apiFetch(`/api/fests/${festId}`),
    enabled: !!festId,
  });
} 