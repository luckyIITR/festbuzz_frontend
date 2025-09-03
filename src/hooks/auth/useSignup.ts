import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';
import { LoginResponse } from '../../types/user';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: 'organizer' | 'participant';
}

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) =>
      apiFetch<LoginResponse>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: LoginResponse) => {
      if (data?.data?.token) setToken(data.data.token);
      if (data?.data?.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.dispatchEvent(new Event('userChanged'));
      }
    },
  });
} 