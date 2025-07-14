import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import { Fest, Sponsor } from '../types/fest';

interface ApiFest {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  organizer: string;
  location: string;
  startDate: string;
  endDate: string;
  price?: number;
  logo?: string;
  organizerLogo?: string;
  heroImage?: string;
  bannerImage?: string;
  theme?: string;
  eligibility?: string;
  specialAttractions?: string;
  perks?: string;
  categories?: string[];
  galleryImages?: string[];
  sponsors?: Sponsor[];
  maxParticipants?: number;
  currentParticipants?: number;
  isRegistrationOpen?: boolean;
  isTeamRegistration?: boolean;
  teamSize?: number;
  rules?: string;
  prizes?: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
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