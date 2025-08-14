import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';


interface ApiFest {
  _id?: string;
  id?: string;
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
  rulebook?: string;
  instagram?: string;
  website?: string;
  about?: string;
  contact?: string;
  email?: string;
  createdBy?: string;
  isRegistrationOpen: boolean;
  logo?: string;
  heroImage?: string;
  organizerLogo?: string;
  bannerImage?: string;
  galleryImages?: string[];
  sponsors?: import('@/types/fest').Sponsor[];
  events?: string[];
  tickets?: import('@/types/fest').Ticket[];
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    "upcoming": ApiFest[];
    "ongoing": ApiFest[];
    "past": ApiFest[];
  }
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function useMyFests() {
  return useQuery<{
    upcoming: ApiFest[];
    ongoing: ApiFest[];
    past: ApiFest[];
  }>({
    queryKey: ['myfests'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No authentication token found');
      
      const response = await apiFetch<ApiResponse>('/api/myfests', {}, token);
      
      if (!response.success) {
        throw new Error('Failed to fetch my fests');
      }

      // Map _id to id and createdBy object to string
      return response.data;
    },
    enabled: !!getToken(),
  });
} 