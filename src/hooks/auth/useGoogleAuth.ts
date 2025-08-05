import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';
import { useRouter } from 'next/navigation';

interface GoogleAuthPayload {
  accessToken: string;
  idToken?: string;
}

interface GoogleAuthResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
    picture?: string;
  };
  token?: string;
}

export function useGoogleAuth() {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (payload: GoogleAuthPayload) =>
      apiFetch('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: unknown) => {
      const authData = data as GoogleAuthResponse;
      if (authData?.token) setToken(authData.token);
      if (authData?.user) {
        localStorage.setItem('user', JSON.stringify(authData.user));
        window.dispatchEvent(new Event('userChanged'));
        // Redirect to profile page to complete profile setup
        router.push('/profile');
      }
    },
  });
} 