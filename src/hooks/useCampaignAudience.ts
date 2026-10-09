import { useState, useEffect } from 'react';
import type { AudienceType } from '@/config/campaign.types';

export function useCampaignAudience(initialAudience: AudienceType = 'jobseeker') {
  const [audience, setAudience] = useState<AudienceType>(initialAudience);

  useEffect(() => {
    const syncAudienceFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const paramAudience = searchParams.get('audience');
      if (paramAudience === 'recruiter' || paramAudience === 'jobseeker') {
        setAudience(paramAudience);
      }
    };

    const handleAudienceEvent = (e: Event) => {
      const customEvent = e as CustomEvent<AudienceType>;
      if (customEvent.detail && (customEvent.detail === 'jobseeker' || customEvent.detail === 'recruiter')) {
        setAudience(customEvent.detail);
      }
    };

    syncAudienceFromUrl();
    window.addEventListener('popstate', syncAudienceFromUrl);
    window.addEventListener('job10:audience-change', handleAudienceEvent);
    return () => {
      window.removeEventListener('popstate', syncAudienceFromUrl);
      window.removeEventListener('job10:audience-change', handleAudienceEvent);
    };
  }, []);

  const changeAudience = (newAudience: AudienceType) => {
    setAudience(newAudience);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('audience', newAudience);
      window.history.replaceState({}, '', url.toString());
      window.dispatchEvent(new CustomEvent('job10:audience-change', { detail: newAudience }));
    }
  };

  return {
    audience,
    setAudience: changeAudience,
    isJobseeker: audience === 'jobseeker',
    isRecruiter: audience === 'recruiter',
  };
}
