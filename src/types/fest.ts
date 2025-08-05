export interface Sponsor {
  _id?: string;
  name: string;
  image: string;
  title: string;
}

export interface Ticket {
  _id?: string;
  name: string;
  feeType: string;
  price: number;
  availableFrom: string; // ISO date string
  availableTill: string; // ISO date string
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
  festId?: string;
  price?: number;
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
  // New status fields
  status?: 'draft' | 'published' | 'archived';
  publishedAt?: string; // ISO date string
  publishedBy?: string; // User ID
  draftVersion?: number;
  lastSavedAsDraft?: string; // ISO date string
}

export interface EventStatus {
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null; // ISO date string
  publishedBy: string | null; // User ID
  draftVersion: number;
  lastSavedAsDraft: string; // ISO date string
  canPublish: boolean;
}

export interface EventStatusResponse {
  success: boolean;
  data: EventStatus;
}

export interface Fest {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  visibility: string;
  state: string;
  city: string;
  venue: string;
  college: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  festMode: string;
  rulebook?: string;
  instagram?: string;
  website?: string;
  about?: string;
  contact?: string;
  email?: string;
  createdBy: string; // ObjectId as string
  isRegistrationOpen: boolean;
  logo?: string;
  heroImage?: string;
  organizerLogo?: string;
  bannerImage?: string;
  galleryImages?: string[];
  sponsors?: Sponsor[];
  events?: string[]; // Array of Event ObjectIds as strings
  tickets?: Ticket[];
  createdAt?: string;
  updatedAt?: string;
}

// Attendee/Candidate Interfaces
export interface TeamInfo {
  teamId: string;
  teamName: string;
  isTeamMember: boolean;
}

export interface Candidate {
  registrationId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  instituteName: string;
  city: string;
  state: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  registrationStatus: 'confirmed' | 'pending' | 'cancelled';
  ticket: string;
  answers: string[];
  registeredAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // Event-specific fields
  registrationType?: 'solo' | 'team';
  teamInfo?: TeamInfo;
}

export interface CandidateFilters {
  status?: 'confirmed' | 'pending' | 'cancelled';
  type?: 'solo' | 'team'; // Only for events
  search?: string;
  page?: number;
  limit?: number;
}

export interface FestCandidatesResponse {
  success: boolean;
  data: {
    festId: string;
    festName: string;
    candidates: Candidate[];
    pagination: PaginationInfo;
    filters: CandidateFilters;
  };
}

export interface EventCandidatesResponse {
  success: boolean;
  data: {
    eventId: string;
    eventName: string;
    festId: string;
    candidates: Candidate[];
    pagination: PaginationInfo;
    filters: CandidateFilters;
  };
}

// Event Registration Interfaces
export interface EventRegistrationBreakdown {
  confirmed: number;
  pending: number;
  cancelled: number;
  solo: number;
  team: number;
}

export interface EventRegistrationCount {
  eventId: string;
  eventName: string;
  festId: string;
  totalRegistrations: number;
  confirmedCount: number;
  pendingCount: number;
  cancelledCount: number;
  soloCount: number;
  teamCount: number;
  breakdown: EventRegistrationBreakdown;
}

export interface TopInstitute {
  _id: string;
  count: number;
}

export interface GenderDistribution {
  Male: number;
  Female: number;
  Other: number;
}

export interface TeamStats {
  totalTeams: number;
  avgTeamSize: number;
}

export interface EventRegistrationStats {
  eventId: string;
  eventName: string;
  festId: string;
  totalRegistrations: number;
  confirmedCount: number;
  pendingCount: number;
  cancelledCount: number;
  recentRegistrations: number;
  soloCount: number;
  teamCount: number;
  genderDistribution: GenderDistribution;
  topInstitutes: TopInstitute[];
  teamStats: TeamStats;
}

export interface EventRegistrationCountResponse {
  success: boolean;
  data: EventRegistrationCount;
}

export interface EventRegistrationStatsResponse {
  success: boolean;
  data: EventRegistrationStats;
}

// Registration Interfaces
export interface RegistrationBreakdown {
  confirmed: number;
  pending: number;
  cancelled: number;
}

export interface RegistrationCount {
  festId: string;
  festName: string;
  totalRegistrations: number;
  confirmedCount: number;
  pendingCount: number;
  cancelledCount: number;
  breakdown: RegistrationBreakdown;
}

export interface RegistrationStats {
  festId: string;
  festName: string;
  totalRegistrations: number;
  confirmedCount: number;
  pendingCount: number;
  cancelledCount: number;
  recentRegistrations: number;
  genderDistribution: GenderDistribution;
  topInstitutes: TopInstitute[];
}

export interface RegistrationCountResponse {
  success: boolean;
  data: RegistrationCount;
}

export interface RegistrationStatsResponse {
  success: boolean;
  data: RegistrationStats;
}

// Wishlist and Recently Viewed Interfaces
export interface WishlistItem {
  _id: string;
  addedAt: string;
  festId: Fest;
}

export interface RecentlyViewedItem {
  _id: string;
  viewedAt: string;
  viewCount: number;
  festId: Fest;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface WishlistResponse {
  success: boolean;
  data: {
    wishlist: WishlistItem[];
    pagination: PaginationInfo;
  };
}

export interface RecentlyViewedResponse {
  success: boolean;
  data: {
    recentlyViewed: RecentlyViewedItem[];
    pagination: PaginationInfo;
  };
}

export interface WishlistCheckResponse {
  success: boolean;
  data: {
    isInWishlist: boolean;
  };
}

export interface CountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

export interface StatsResponse {
  success: boolean;
  data: {
    totalViews: number;
    uniqueFests: number;
    avgViewsPerFest: number;
  };
} 