import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token?: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: unknown) => {
      const loginData = data as LoginResponse;
      if (loginData?.token) setToken(loginData.token);
      if (loginData?.user) localStorage.setItem('user', JSON.stringify(loginData.user));
    },
  });
} 