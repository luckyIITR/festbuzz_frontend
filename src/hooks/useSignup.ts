import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { setToken } from '../lib/token';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token?: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) =>
      apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: unknown) => {
      const signupData = data as SignupResponse;
      if (signupData?.token) setToken(signupData.token);
      if (signupData?.user) {
        localStorage.setItem('user', JSON.stringify(signupData.user));
        window.dispatchEvent(new Event('userChanged'));
      }
    },
  });
} 