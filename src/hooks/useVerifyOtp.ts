import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { setToken } from '../lib/token';

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  token?: string;
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) =>
      apiFetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: unknown) => {
      const verifyData = data as VerifyOtpResponse;
      if (verifyData?.token) setToken(verifyData.token);
    },
  });
} 