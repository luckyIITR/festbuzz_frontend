'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { PROTECTED_ROUTES, hasAnyPermission, Permission } from '@/types/user';

interface RouteGuardProps {
  children: ReactNode;
  requiredPermissions?: Permission[];
  fallback?: ReactNode;
}

export function RouteGuard({ 
  children, 
  requiredPermissions = [], 
  fallback = null 
}: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to initialize

    // Check if route requires authentication
    const protectedRoute = PROTECTED_ROUTES.find(route => {
      // Convert dynamic route patterns to regex for matching
      const routePattern = route.path
        .replace(/\[.*?\]/g, '[^/]+') // Replace [param] with regex pattern
        .replace(/\//g, '\\/'); // Escape forward slashes
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(pathname);
    });

    if (protectedRoute) {
      // Route is protected, check authentication
      if (!isAuthenticated) {
        router.push(protectedRoute.redirectTo || '/login');
        return;
      }

      // Check if user has required permissions for this route
      if (protectedRoute.permissions.length > 0 && user) {
        const hasAccess = hasAnyPermission(user.role, protectedRoute.permissions);
        if (!hasAccess) {
          router.push('/unauthorized');
          return;
        }
      }
    }

    // Check component-level permissions
    if (requiredPermissions.length > 0) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (user && !hasAnyPermission(user.role, requiredPermissions)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router, requiredPermissions]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If no permissions required or user has access, render children
  if (requiredPermissions.length === 0 || (user && hasAnyPermission(user.role, requiredPermissions))) {
    return <>{children}</>;
  }

  // Show fallback if user doesn't have required permissions
  return <>{fallback}</>;
}

// Higher-order component for protecting pages
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions: Permission[] = []
) {
  return function ProtectedComponent(props: P) {
    return (
      <RouteGuard requiredPermissions={requiredPermissions}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}
