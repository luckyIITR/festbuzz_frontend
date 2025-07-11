import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { setToken } from '../lib/token';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) =>
      apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: any) => {
      if (data?.token) setToken(data.token);
    },
  });
} 