import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';
import { LoginResponse } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: LoginResponse) => {
      if (data?.data?.token) setToken(data.data.token);
      if (data?.data?.user) {
        login(data.data.user, data.data.token);
      }
    },
  });
} 