import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { getToken } from '../lib/token';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  address?: string;
  profileImage?: string;
  role?: string;
  joinDate?: string;
  totalFestsRegistered?: number;
  totalEventsRegistered?: number;
  totalAmountPaid?: number;
  googleAvatar?: string;
}

interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  college?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  address?: string;
}

interface UpdateProfileResponse {
  msg: string;
  user: ProfileData;
}

export function useProfile() {
  return useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      return apiFetch<ProfileData>('/api/auth/profile', {
        method: 'GET',
      }, token);
    },
    enabled: !!getToken(), // Only run query if token exists
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Filter out empty/undefined values and only send provided fields
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => 
          value !== undefined && value !== null && value !== ''
        )
      );
      
      console.log('Sending payload:', filteredPayload);
      return apiFetch<UpdateProfileResponse>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(filteredPayload),
      }, token);
    },
    onSuccess: (data: UpdateProfileResponse) => {
      // Update localStorage with the user data from the response
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Invalidate and refetch the profile query to get fresh data from backend
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
} 