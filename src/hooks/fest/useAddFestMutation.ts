import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/token';

// Types based on the backend API specification
export interface CreateFestRequest {
  name: string;
  type: string;
  visibility: 'public' | 'private';
  state: string;
  city: string;
  venue: string;
  college: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  festMode: 'online' | 'offline' | 'hybrid';
  rulebook?: string;
  instagram?: string;
  website?: string;
  about: string;
  contact?: string;
  email?: string;
  logo?: string;
  heroImage?: string;
  organizerLogo?: string;
  bannerImage?: string;
  galleryImages?: string[];
  sponsors?: {
    name: string;
    image: string;
    title: string;
  }[];
  tickets?: {
    name: string;
    feeType: 'free' | 'paid';
    price?: number;
    availableFrom?: string; // ISO date string
    availableTill?: string; // ISO date string
  }[];
  status?: 'draft' | 'published' | 'archived';
}

export interface CreateFestResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    type: string;
    visibility: string;
    state: string;
    city: string;
    venue: string;
    college: string;
    startDate: string;
    endDate: string;
    festMode: string;
    createdBy: string;
    isRegistrationOpen: boolean;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string;
    publishedBy?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useAddFestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (festData: CreateFestRequest): Promise<CreateFestResponse> => {
      const token = getToken();
      return apiFetch<CreateFestResponse>('/api/fests', {
        method: 'POST',
        body: JSON.stringify(festData),
      }, token);
    },
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['fests'] });
      queryClient.invalidateQueries({ queryKey: ['myFests'] });
      queryClient.invalidateQueries({ queryKey: ['recommendedFests'] });
      
      // Optionally, you can also add the new fest to the cache
      if (data.data) {
        queryClient.setQueryData(['fest', data.data.id], data.data);
      }
    },
    onError: (error) => {
      console.error('Error creating fest:', error);
    },
  });
};
