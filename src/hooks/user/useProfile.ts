import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface ProfileData {
  success: boolean;
  message: string;
  data: {
  _id?: string;
  name: string;
  email: string;
  role?: 'superadmin' | 'admin' | 'participant' | 'festival head' | 'event manager' | 'event coordinator' | 'event volunteer';
  profileInfo?: {
    bio?: string;
    avatar?: string;
  };
  // Personal Information
  phone?: string;
  dateOfBirth?: string; // ISO date string
  gender?: 'Male' | 'Female' | 'Other';
  // Academic Information
  college?: string;
  // Location Information
  address?: string;
  city?: string;
  state?: string;
  // Google OAuth fields
  googleId?: string;
  googleEmail?: string;
  googleAvatar?: string;
  // Other fields
  profilePhoto?: string;
  isVerified?: boolean;
  // Timestamps
    createdAt?: string; // ISO date string
    updatedAt?: string; // ISO date string
  }
}

interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  college?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  profileInfo?: {
    bio?: string;
    avatar?: string;
  };
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
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
        localStorage.setItem('user', JSON.stringify(data.data));
      }
      
      // Invalidate and refetch the profile query to get fresh data from backend
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
} 