import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Fest } from '../../types/fest';

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
  sponsors?: import('@/types/fest').Sponsor[];
  events?: unknown[]; // Now an array of objects or empty array
  tickets?: import('@/types/fest').Ticket[];
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiFest;
}

export function useFest(festId: string) {
  return useQuery<Fest>({
    queryKey: ['fest', festId],
    queryFn: async () => {
      const response = await apiFetch<ApiResponse>(`/api/fests/${festId}`);
      
      if (!response.success) {
        throw new Error('Failed to fetch fest');
      }

      const fest = response.data;
      
      // Map _id to id and handle createdBy (can be null now)
      return {
        ...fest,
        id: fest.id || fest._id || '',
        createdBy: fest.createdBy || '', // Handle null case by converting to empty string
        events: Array.isArray(fest.events) ? fest.events.map((event: unknown) => (event as { _id?: string; id?: string })._id || (event as { _id?: string; id?: string }).id || '').filter(Boolean) : [], // Convert events to array of IDs
      };
    },
    enabled: !!festId,
  });
} 