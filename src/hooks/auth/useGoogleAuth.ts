import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';
import { useRouter } from 'next/navigation';
import { LoginResponse } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';

interface GoogleAuthPayload {
  accessToken: string;
  idToken?: string;
}

export function useGoogleAuth() {
  const router = useRouter();
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (payload: GoogleAuthPayload) =>
      apiFetch<LoginResponse>('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: LoginResponse) => {
      if (data?.data?.token) setToken(data.data.token);
      if (data?.data?.user) {
        login(data.data.user, data.data.token);
        // Redirect to profile page to complete profile setup
        router.push('/profile');
      }
    },
  });
} 