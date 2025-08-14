import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Fest, Sponsor, Ticket } from '../../types/fest';

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
  createdBy: string | null; // Now can be null or string
  isRegistrationOpen: boolean;
  logo?: string;
  heroImage?: string;
  organizerLogo?: string;
  bannerImage?: string;
  galleryImages?: string[];
  sponsors?: Sponsor[];
  events?: string[]; // Array of event IDs as strings
  tickets?: Ticket[];
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiFest[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function useFests() {
  return useQuery<Fest[]>({
    queryKey: ['fests'],
    queryFn: async () => {
      const response = await apiFetch<ApiResponse>('/api/fests');
      
      if (!response.success) {
        throw new Error('Failed to fetch fests');
      }

      // Map _id to id and handle createdBy (can be null now)
      return response.data.map((fest: ApiFest) => ({
        ...fest,
        id: fest.id || fest._id || '',
        createdBy: fest.createdBy || '', // Handle null case by converting to empty string
      }));
    },
  });
} 