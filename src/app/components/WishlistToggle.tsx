'use client';

import React, { useState } from 'react';
import { useWishlistCheck, useToggleWishlist } from '@/hooks/user';

interface WishlistToggleProps {
  festId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const WishlistToggle: React.FC<WishlistToggleProps> = ({ 
  festId, 
  className = '', 
  size = 'md' 
}) => {
  const { data: checkData, isLoading: isChecking } = useWishlistCheck(festId);
  const { addToWishlist, removeFromWishlist, isAdding, isRemoving } = useToggleWishlist();
  
  // Optimistic state for immediate UI feedback
  const [optimisticState, setOptimisticState] = useState<boolean | null>(null);
  
  const isInWishlist = optimisticState !== null ? optimisticState : (checkData?.data?.isInWishlist || false);
  const isLoading = isChecking || isAdding || isRemoving;

  const handleToggle = () => {
    if (isLoading) return;
    
    // Set optimistic state immediately
    setOptimisticState(!isInWishlist);
    
    if (isInWishlist) {
      removeFromWishlist(festId, {
        onError: () => {
          // Revert optimistic state on error
          setOptimisticState(null);
        }
      });
    } else {
      addToWishlist(festId, {
        onError: () => {
          // Revert optimistic state on error
          setOptimisticState(null);
        }
      });
    }
  };

  // Reset optimistic state when server state changes
  React.useEffect(() => {
    if (checkData?.data?.isInWishlist !== undefined) {
      setOptimisticState(null);
    }
  }, [checkData?.data?.isInWishlist]);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${sizeClasses[size]} ${className} transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-3/4 w-3/4 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 22 21"
          xmlns="http://www.w3.org/2000/svg"
          className={`object-contain w-full h-full fill-current transition-colors duration-200 ${
            isInWishlist ? 'text-pink-500' : 'text-white hover:text-pink-300'
          }`}
        >
          <path
            d="M19.3115 2.50913C16.9773 0.0498337 14.2743 1.08705 12.6007 2.18391C11.655 2.80369 10.345 2.80369 9.39929 2.18392C7.72564 1.08706 5.02272 0.0498608 2.68853 2.50914C-2.85249 8.3471 6.64988 19.5967 11 19.5967C15.3502 19.5967 24.8525 8.3471 19.3115 2.50913Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};

export default WishlistToggle; 