import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { getToken } from '../../lib/token';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  college?: string;
}

interface SearchUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export function useSearchUsers(searchTerm: string) {
  const token = getToken();
  
  const endpoint = `/api/users/search?q=${encodeURIComponent(searchTerm)}`;

  return useQuery<SearchUsersResponse>({
    queryKey: ['search-users', searchTerm],
    queryFn: async () => {
      const response = await apiFetch<SearchUsersResponse>(endpoint, {}, token);
      
      if (!response.success) {
        throw new Error('Failed to search users');
      }

      return response;
    },
    enabled: !!searchTerm && searchTerm.length >= 2 && !!token,
  });
}
