import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface PublishFestResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    status: 'published';
    publishedAt: string;
    publishedBy: string;
  };
}

export function usePublishFest() {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation({
    mutationFn: async (festId: string) => {
      return apiFetch<PublishFestResponse>(`/api/fests/${festId}/publish`, {
        method: 'PUT',
      }, token);
    },
    onSuccess: (_res, festId) => {
      // Invalidate fests and related queries so UI refreshes
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['user-festivals'] });
      queryClient.invalidateQueries({ queryKey: ['fest', festId] });
    },
  });
}
