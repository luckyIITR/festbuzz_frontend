import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { TeamMemberResponse, UpdateTeamMemberPayload } from '../../types/team';

export function useUpdateTeamMember(festId: string) {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: UpdateTeamMemberPayload }) =>
      apiFetch<TeamMemberResponse>(`/api/festival-team/${festId}/update/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }, token),
    onSuccess: () => {
      // Invalidate and refetch festival team data
      queryClient.invalidateQueries({ queryKey: ['festival-team', festId] });
    },
  });
}
