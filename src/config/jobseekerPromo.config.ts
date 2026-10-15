export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: 'lightning' | 'sparkle' | 'shield';
  accentColor?: string;
}

export interface JobseekerPromoConfig {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  redirectUrls: {
    base: string;
    headerCta: string;
    heroCta: string;
    featureCta: string;
    finalCta: string;
    footerLinks: {
      howItWorks: string;
      browseJobs: string;
      privacy: string;
      terms: string;
      contact: string;
    };
  };
  header: {
    logoSrc: string;
    logoAlt: string;
    ctaLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaLabel: string;
    bgImage: string;
  };
  highlights: {
    badgeText: string;
    title: string;
    items: StatItem[];
  };
  feature: {
    badge: string;
    headline: string;
    description: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
  };
  finalCta: {
    headline: string;
    description: string;
    ctaLabel: string;
  };
  footer: {
    logoSrc: string;
    logoAlt: string;
    copyright: string;
    tagline: string;
    links: NavItem[];
  };
}

const BASE_URL = 'https://job10-delta.vercel.app/';

const makeUtmUrl = (content: string): string => {
  return `${BASE_URL}?audience=jobseeker&utm_source=email&utm_medium=promo&utm_campaign=job10_launch&utm_content=${content}`;
};

export const jobseekerPromoConfig: JobseekerPromoConfig = {
  meta: {
    title: 'Job10 — Your Next Career Move Starts in 10 Minutes',
    description:
      'Skip application black holes. Job10 connects you directly with top verified companies through intelligent AI skill matching in just 10 minutes.',
    ogImage: '/images/hero-clean-banner.jpg',
  },
  redirectUrls: {
    base: BASE_URL,
    headerCta: makeUtmUrl('header_get_started'),
    heroCta: makeUtmUrl('hero_get_started'),
    featureCta: makeUtmUrl('jobseeker_find_jobs'),
    finalCta: makeUtmUrl('final_explore_now'),
    footerLinks: {
      howItWorks: `${BASE_URL}#how-it-works`,
      browseJobs: `${BASE_URL}?audience=jobseeker`,
      privacy: `${BASE_URL}privacy`,
      terms: `${BASE_URL}terms`,
      contact: `${BASE_URL}contact`,
    },
  },
  header: {
    logoSrc: '/images/job10-logo.png',
    logoAlt: 'Job10 Logo',
    ctaLabel: 'Get Started →',
  },
  hero: {
    eyebrow: 'A SIMPLER WAY TO GET HIRED',
    titleLine1: 'Your next opportunity',
    titleLine2: 'starts in 10 minutes.',
    description:
      'Whether you’re taking your next career leap or discovering top-tier opportunities, Job10 connects candidates faster with intelligent skill matching.',
    ctaLabel: 'Get Started →',
    bgImage: '/images/hero-clean-banner.jpg',
  },
  highlights: {
    badgeText: 'THE 10-MINUTE DIFFERENCE',
    title: 'Why Top Candidates Choose Job10',
    items: [
      {
        id: 'stat-1',
        value: '10 Min',
        label: 'Match Velocity',
        icon: 'lightning',
        accentColor: '#2b3bff',
      },
      {
        id: 'stat-2',
        value: 'AI-Driven',
        label: 'Precision Fit',
        icon: 'sparkle',
        accentColor: '#0b1a3c',
      },
      {
        id: 'stat-3',
        value: 'Verified',
        label: 'Top Opportunities',
        icon: 'shield',
        accentColor: '#0b1a3c',
      },
    ],
  },
  feature: {
    badge: 'FOR JOBSEEKERS',
    headline: 'Land roles tailored to your unique skills.',
    description:
      'Skip endless application black holes. Upload your resume or browse directly to receive instant, AI-matched roles from top verified companies.',
    ctaLabel: 'Find Jobs →',
    imageSrc: '/images/feature-jobseeker-card.png',
    imageAlt: 'Professional woman working on laptop at modern workspace',
  },
  finalCta: {
    headline: 'Ready to experience the 10-minute difference?',
    description:
      'Join thousands of professionals finding matched roles and advancing their careers faster today.',
    ctaLabel: 'Explore Job10 Now →',
  },
  footer: {
    logoSrc: '/images/job10-logo.png',
    logoAlt: 'Job10',
    copyright: '© 2026 Job10 Platform Inc. All rights reserved.',
    tagline: 'Job10 — Talent Matches Faster.',
    links: [
      { label: 'How It Works', href: `${BASE_URL}#how-it-works` },
      { label: 'Browse Jobs', href: `${BASE_URL}?audience=jobseeker` },
      { label: 'Privacy Policy', href: `${BASE_URL}privacy` },
      { label: 'Terms of Service', href: `${BASE_URL}terms` },
      { label: 'Contact', href: `${BASE_URL}contact` },
    ],
  },
};
