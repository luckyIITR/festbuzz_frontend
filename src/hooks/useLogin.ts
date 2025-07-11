import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { setToken } from '../lib/token';

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: any) => {
      if (data?.token) setToken(data.token);
      if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
} 