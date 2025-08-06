import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { TeamRegistrationRequest, JoinTeamRequest, TeamCreateResponse, TeamJoinResponse } from '../../types/event-registration';
import { getToken } from '../../lib/token';

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TeamRegistrationRequest): Promise<TeamCreateResponse> => {
      const token = getToken();
      return apiFetch<TeamCreateResponse>(
        '/api/teams/create',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
        token
      );
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['event', variables.eventId] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'registrations'] });
    },
    onError: (error) => {
      console.error('Team creation failed:', error);
    },
  });
}

export function useJoinTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: JoinTeamRequest): Promise<TeamJoinResponse> => {
      const token = getToken();
      return apiFetch<TeamJoinResponse>(
        '/api/teams/join',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
        token
      );
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'registrations'] });
    },
    onError: (error) => {
      console.error('Team join failed:', error);
    },
  });
} 