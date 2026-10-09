'use client';

import { useSyncExternalStore, useCallback } from 'react';

export interface UserSession {
  name: string;
  email: string;
  role: 'jobseeker' | 'recruiter';
  initials: string;
}

function getSessionSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const demoAuth = params.get('demo_auth');
    if (demoAuth === 'jobseeker' || demoAuth === 'recruiter') {
      const demoUser: UserSession = {
        name: demoAuth === 'jobseeker' ? 'Alex Rivera' : 'Sarah Chen',
        email: demoAuth === 'jobseeker' ? 'alex@example.com' : 'sarah@talentco.com',
        role: demoAuth,
        initials: demoAuth === 'jobseeker' ? 'AR' : 'SC',
      };
      window.localStorage.setItem('job10_session', JSON.stringify(demoUser));
      return JSON.stringify(demoUser);
    }
    return window.localStorage.getItem('job10_session');
  } catch {
    return null;
  }
}

function getSessionServerSnapshot(): string | null {
  return null;
}

function subscribeToSession(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'job10_session') callback();
  };
  window.addEventListener('storage', handleStorage);
  window.addEventListener('job10:session-change', callback);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('job10:session-change', callback);
  };
}

export function useAuthSession() {
  const rawSession = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getSessionServerSnapshot
  );

  let session: UserSession | null = null;
  if (rawSession) {
    try {
      session = JSON.parse(rawSession);
    } catch {
      session = null;
    }
  }

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem('job10_session');
        window.dispatchEvent(new Event('job10:session-change'));
      } catch {
        // Ignore
      }
    }
  }, []);

  return {
    session,
    isAuthenticated: !!session,
    signOut,
  };
}
