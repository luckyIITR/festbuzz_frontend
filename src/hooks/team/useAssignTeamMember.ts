import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';
import { TeamMemberResponse, AssignTeamMemberPayload } from '../../types/team';

export function useAssignTeamMember(festId: string) {
  const queryClient = useQueryClient();
  const token = getToken();

  return useMutation({
    mutationFn: (payload: AssignTeamMemberPayload) =>
      apiFetch<TeamMemberResponse>(`/api/festival-team/${festId}/assign`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }, token),
    onSuccess: () => {
      // Invalidate and refetch festival team data
      queryClient.invalidateQueries({ queryKey: ['festival-team', festId] });
    },
  });
}
