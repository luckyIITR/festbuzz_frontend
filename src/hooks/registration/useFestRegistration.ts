import { useMutation } from '@tanstack/react-query';
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
  answers?: Record<string, unknown>; // Optional answers field
}

export function useFestRegistration() {
  return useMutation({
    mutationFn: (payload: FestRegistrationPayload) => {
      const token = getToken();
      return apiFetch('/api/registration/fest', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, token);
    },
  });
} 