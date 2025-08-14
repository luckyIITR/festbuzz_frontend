import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { setToken } from '../../lib/token';
import { VerifyResponse } from '../../types/user';

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) =>
      apiFetch<VerifyResponse>('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data: VerifyResponse) => {
      if (data?.data?.token) setToken(data.data.token);
    },
  });
} 