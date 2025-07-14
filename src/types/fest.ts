export interface Sponsor {
  _id: string;
  id: string;
  name: string;
  logo?: string;
  image?: string;
  website?: string;
}

export interface Judge {
  id: string;
  name: string;
  photo?: string;
  bio?: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  price: number;
  startDate: string;
  endDate: string;
  location?: string;
  image?: string;
  bannerImage?: string;
  category?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  isTeamEvent?: boolean;
  teamSize?: number;
  rules?: string;
  prizes?: string;
  sponsors?: Sponsor[];
  judges?: Judge[];
}

export interface Fest {
  id: string;
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