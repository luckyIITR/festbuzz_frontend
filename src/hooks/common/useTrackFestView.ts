import { useEffect, useRef } from 'react';
import { useAddToRecentlyViewed } from '../user';
import { getToken } from '../../lib/token';

export function useTrackFestView(festId: string) {
  const addToRecentlyViewed = useAddToRecentlyViewed();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track if user is authenticated, festId is provided, and we haven't tracked this view yet
    if (getToken() && festId && !hasTracked.current) {
      hasTracked.current = true;
      addToRecentlyViewed.mutate(festId);
    }
  }, [festId, addToRecentlyViewed]);

  return {
    isTracking: addToRecentlyViewed.isPending,
  };
} 