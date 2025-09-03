import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { RemoveTeamMemberResponse } from '../../types/team';

export function useRemoveTeamMember(festId: string) {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation({
    mutationFn: (userId: string) =>
      apiFetch<RemoveTeamMemberResponse>(`/api/festival-team/${festId}/remove/${userId}`, {
        method: 'DELETE',
      }, token),
    onSuccess: () => {
      // Invalidate and refetch festival team data
      queryClient.invalidateQueries({ queryKey: ['festival-team', festId] });
    },
  });
}
