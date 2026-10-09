import type { Metadata } from 'next';
import { CampaignPageView } from '@/components/CampaignPageView';

export const metadata: Metadata = {
  title: 'Job10 — Get Started | Your Next Opportunity Starts in 10 Minutes',
  description:
    'Start with Job10 in 10 minutes. Fast, AI-driven job and talent matching for top engineers and growing companies.',
};

export default function CampaignGetStartedPage() {
  return <CampaignPageView />;
}
