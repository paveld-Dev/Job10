import type { Metadata } from 'next';
import { JobseekerPromoPage } from '@/components/jobseeker-promo/JobseekerPromoPage';

export const metadata: Metadata = {
  title: 'Job10 — Your Next Career Move Starts in 10 Minutes',
  description:
    'Skip application black holes. Job10 connects you directly with top verified companies through intelligent AI skill matching in just 10 minutes.',
  openGraph: {
    title: 'Job10 — Your Next Career Move Starts in 10 Minutes',
    description:
      'Skip application black holes. Job10 connects you directly with top verified companies through intelligent AI skill matching in just 10 minutes.',
    images: [
      {
        url: '/images/hero-woman-asset.jpg',
        width: 1200,
        height: 630,
        alt: 'Job10 Career Match',
      },
    ],
  },
};

export default function HomePage() {
  return <JobseekerPromoPage />;
}
