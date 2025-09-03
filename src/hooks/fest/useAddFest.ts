// /app/hooks/fest/useaddfest.ts

import { useState } from 'react';

// Define TypeScript interfaces for better type safety
export interface FestivalTicket {
  name: string;
  feeType: 'free' | 'paid';
  price?: number;
  availableFrom?: string;
  availableTill?: string;
}

export interface FestivalSponsor {
  name: string;
  image: string;
  title: string;
  website?: string; // Added website field that exists in your form
}

export interface FestivalFormData {
  name: string;
  type: 'Technical' | 'Cultural' | 'Sports' | 'Academic' | 'Mixed' | 'Thomso'; // Added 'Thomso' from your form
  visibility: 'public' | 'private';
  state: string;
  city: string;
  venue: string;
  college: string;
  startDate: string;
  endDate: string;
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
  sponsors?: FestivalSponsor[];
  tickets?: FestivalTicket[];
  aftermovie?: string; // Added aftermovie field from your form
}

export interface FestivalResponse {
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
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: FestivalResponse;
}

interface UseAddFestState {
  isLoading: boolean;
  error: string | null;
  data: FestivalResponse | null;
  isSuccess: boolean;
}

interface UseAddFestReturn extends UseAddFestState {
  addFestival: (festivalData: FestivalFormData) => Promise<FestivalResponse | null>;
  reset: () => void;
  clearError: () => void; // Added utility function
}

export const useAddFest = (): UseAddFestReturn => {
  const [state, setState] = useState<UseAddFestState>({
    isLoading: false,
    error: null,
    data: null,
    isSuccess: false,
  });

  const addFestival = async (festivalData: FestivalFormData): Promise<FestivalResponse | null> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false,
    }));

    try {
      // Validate required fields before sending
      const validationErrors = validateFestivalData(festivalData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Clean up the data before sending
      const cleanedData: FestivalFormData = {
        ...festivalData,
        // Convert datetime-local format to ISO string if they exist
        startDate: festivalData.startDate ? new Date(festivalData.startDate).toISOString() : '',
        endDate: festivalData.endDate ? new Date(festivalData.endDate).toISOString() : '',
        // Filter out empty values
        galleryImages: festivalData.galleryImages?.filter(img => img && img.trim() !== '') || [],
        sponsors: festivalData.sponsors?.filter(sponsor => sponsor.name && sponsor.name.trim() !== '') || [],
        tickets: festivalData.tickets?.filter(ticket => ticket.name && ticket.name.trim() !== '') || [],
        // Ensure optional fields are undefined if empty rather than empty strings
        rulebook: festivalData.rulebook?.trim() || undefined,
        instagram: festivalData.instagram?.trim() || undefined,
        website: festivalData.website?.trim() || undefined,
        contact: festivalData.contact?.trim() || undefined,
        email: festivalData.email?.trim() || undefined,
        logo: festivalData.logo?.trim() || undefined,
        heroImage: festivalData.heroImage?.trim() || undefined,
        organizerLogo: festivalData.organizerLogo?.trim() || undefined,
        bannerImage: festivalData.bannerImage?.trim() || undefined,
        aftermovie: festivalData.aftermovie?.trim() || undefined,
      };

      const response = await fetch('/api/fests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you have authentication
          // 'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(cleanedData),
      });

      // Handle non-JSON responses
      let result: ApiResponse;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Handle non-JSON response (like HTML error pages)
        // const textResponse = await response.text();
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to create festival');
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        data: result.data!,
        isSuccess: true,
        error: null,
      }));

      return result.data;
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isSuccess: false,
        data: null,
      }));

      // Log error for debugging (consider using a proper logging service in production)
      console.error('Festival creation error:', error);
      
      return null;
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      data: null,
      isSuccess: false,
    });
  };

  const clearError = () => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  };

  return {
    ...state,
    addFestival,
    reset,
    clearError,
  };
};

// Improved validation function with more comprehensive checks
export const validateFestivalData = (data: Partial<FestivalFormData>): string[] => {
  const errors: string[] = [];

  // Required field validation
  if (!data.name?.trim()) errors.push('Festival name is required');
  if (!data.type) errors.push('Festival type is required');
  if (!data.visibility) errors.push('Visibility setting is required');
  if (!data.state?.trim()) errors.push('State is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.venue?.trim()) errors.push('Venue is required');
  if (!data.college?.trim()) errors.push('College is required');
  if (!data.startDate) errors.push('Start date is required');
  if (!data.endDate) errors.push('End date is required');
  if (!data.festMode) errors.push('Festival mode is required');
  if (!data.about?.trim()) errors.push('About section is required');

  // Date validation
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime())) errors.push('Invalid start date format');
    if (isNaN(end.getTime())) errors.push('Invalid end date format');
    
    // Check date logic
    if (start >= end) {
      errors.push('End date must be after start date');
    }
    
    // Check if dates are not in the past (optional - remove if you allow past events)
    const now = new Date();
    if (start < now) {
      errors.push('Start date cannot be in the past');
    }
  }

  // Email validation (improved regex)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Invalid email format');
  }

  // URL validation for optional fields
  const urlFields = ['rulebook', 'instagram', 'website', 'aftermovie'];
  urlFields.forEach(field => {
    const value = data[field as keyof FestivalFormData] as string;
    if (value && value.trim()) {
      try {
        new URL(value.trim());
      } catch {
        errors.push(`Invalid ${field} URL format`);
      }
    }
  });

  // Phone number validation (basic)
  if (data.contact && data.contact.trim()) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.contact.trim())) {
      errors.push('Invalid contact number format');
    }
  }

  // Ticket validation
  if (data.tickets && data.tickets.length > 0) {
    data.tickets.forEach((ticket, index) => {
      if (!ticket.name?.trim()) {
        errors.push(`Ticket ${index + 1}: Name is required`);
      }
      if (ticket.feeType === 'paid') {
        if (!ticket.price || ticket.price <= 0) {
          errors.push(`Ticket ${index + 1}: Valid price is required for paid tickets`);
        }
      }
      
      // Validate ticket availability dates
      if (ticket.availableFrom && ticket.availableTill) {
        const fromDate = new Date(ticket.availableFrom);
        const tillDate = new Date(ticket.availableTill);
        
        if (isNaN(fromDate.getTime())) {
          errors.push(`Ticket ${index + 1}: Invalid 'available from' date`);
        }
        if (isNaN(tillDate.getTime())) {
          errors.push(`Ticket ${index + 1}: Invalid 'available till' date`);
        }
        if (fromDate >= tillDate) {
          errors.push(`Ticket ${index + 1}: 'Available till' must be after 'available from'`);
        }
      }
    });
  }

  // Sponsor validation
  if (data.sponsors && data.sponsors.length > 0) {
    data.sponsors.forEach((sponsor, index) => {
      if (!sponsor.name?.trim()) {
        errors.push(`Sponsor ${index + 1}: Name is required`);
      }
      if (sponsor.website && sponsor.website.trim()) {
        try {
          new URL(sponsor.website.trim());
        } catch {
          errors.push(`Sponsor ${index + 1}: Invalid website URL`);
        }
      }
    });
  }

  return errors;
};

// Export default form data structure with all fields from your form
export const getDefaultFestivalData = (): FestivalFormData => ({
  name: '',
  type: 'Technical',
  visibility: 'public',
  state: '',
  city: '',
  venue: '',
  college: '',
  startDate: '',
  endDate: '',
  festMode: 'offline',
  about: '',
  rulebook: '',
  instagram: '',
  website: '',
  contact: '',
  email: '',
  logo: '',
  heroImage: '',
  organizerLogo: '',
  bannerImage: '',
  galleryImages: [],
  sponsors: [],
  tickets: [],
  aftermovie: '',
});