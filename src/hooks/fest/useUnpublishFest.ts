import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface UnpublishFestResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    status: 'draft' | 'archived' | 'published';
    publishedAt: string | null;
    publishedBy: string | null;
  };
}

export function useUnpublishFest() {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation({
    mutationFn: async (festId: string) => {
      return apiFetch<UnpublishFestResponse>(`/api/fests/${festId}/unpublish`, {
        method: 'PUT',
      }, token);
    },
    onSuccess: (_res, festId) => {
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['user-festivals'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
    },
  });
}
