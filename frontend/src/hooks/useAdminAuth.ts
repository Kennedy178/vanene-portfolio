// src/hooks/useAdminAuth.ts
import { useCallback, useEffect, useState } from 'react';
import { adminLogin } from '../api/admin';
import { apiClient } from '../api/client';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export function useAdminAuth() {
  const [status, setStatus] = useState<AuthStatus>('checking');

  const checkSession = useCallback(() => {
    setStatus('checking');
    // A cheap authenticated endpoint used purely to verify the session
    // cookie is still valid. Reuses the ratings queue call since it's
    // already admin-gated - no separate "whoami" endpoint needed.
    apiClient
      .get('/api/v1/admin/ratings')
      .then(() => setStatus('authenticated'))
      .catch(() => setStatus('unauthenticated'));
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  async function login(password: string) {
    await adminLogin(password);
    setStatus('authenticated');
  }

  return { status, login, recheck: checkSession };
}