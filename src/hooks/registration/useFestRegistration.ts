import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface FestRegistrationPayload {
  festId: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  city: string;
  state: string;
  instituteName: string;
  answers?: string[]; // Array of strings as per backend documentation
}

interface FestRegistrationData {
  _id: string;
  userId: string;
  festId: string;
  status: string;
  ticket: string;
  qrCode: string;
  answers: string[];
  createdAt: string;
}

interface FestRegistrationResponse {
  success: boolean;
  message: string;
  data: FestRegistrationData;
}

export function useFestRegistration() {
  const queryClient = useQueryClient();
  
  return useMutation<FestRegistrationResponse, Error, FestRegistrationPayload>({
    mutationFn: (payload: FestRegistrationPayload) => {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      return apiFetch<FestRegistrationResponse>('/api/registration/fest', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, token);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch registration status for this fest
      queryClient.invalidateQueries({ queryKey: ['fest-registration-status', variables.festId] });
      queryClient.invalidateQueries({ queryKey: ['myfests', 'registered'] });
    },
  });
} 