import type { Metadata } from 'next';
import { JobseekerPromoPage } from '@/components/jobseeker-promo/JobseekerPromoPage';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';

export const metadata: Metadata = {
  title: jobseekerPromoConfig.meta.title,
  description: jobseekerPromoConfig.meta.description,
  openGraph: {
    title: jobseekerPromoConfig.meta.title,
    description: jobseekerPromoConfig.meta.description,
    images: [
      {
        url: jobseekerPromoConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: 'Job10 Jobseeker Campaign',
      },
    ],
  },
};

export default function CampaignJobseekerPage() {
  return <JobseekerPromoPage />;
}
