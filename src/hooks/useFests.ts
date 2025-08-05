import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Fest, Sponsor, Ticket } from '../types/fest';

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
  createdBy: string;
  isRegistrationOpen: boolean;
  logo?: string;
  heroImage?: string;
  organizerLogo?: string;
  bannerImage?: string;
  galleryImages?: string[];
  sponsors?: Sponsor[];
  events?: string[];
  tickets?: Ticket[];
  createdAt?: string;
  updatedAt?: string;
}

export function useFests() {
  return useQuery<Fest[]>({
    queryKey: ['fests'],
    queryFn: async () => {
      const fests = await apiFetch('/api/fests');
      // Map _id to id if needed
      return (fests as ApiFest[]).map((fest: ApiFest) => ({
        ...fest,
        id: fest.id || fest._id || '', // prefer id, fallback to _id
      }));
    },
  });
} 