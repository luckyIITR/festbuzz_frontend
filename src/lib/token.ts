export function getToken(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return localStorage.getItem('token') || undefined;
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
} 