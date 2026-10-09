# Job10 Campaign & Web Platform — Complete Codebase Context for Claude

This document provides a single-file, exhaustive repository dump and architectural blueprint of the **Job10** web application. It includes the directory layout, design rules, complete TypeScript source files, React 19 / Next.js 16 components, and styling sheets.

---

## Table of Contents
1. [Project Overview & Architectural Decisions](#1-project-overview--architectural-decisions)
2. [Dependencies & Build Configuration](#2-dependencies--build-configuration)
   - `package.json`
   - `next.config.ts`
   - `tsconfig.json`
3. [App Router Pages & Root Layout](#3-app-router-pages--root-layout)
   - `src/app/layout.tsx`
   - `src/app/page.tsx`
   - `src/app/campaign/get-started/page.tsx`
   - `src/app/globals.css`
4. [Central Campaign Configuration & Types](#4-central-campaign-configuration--types)
   - `src/config/campaign.types.ts`
   - `src/config/campaign.config.ts`
5. [State Hooks](#5-state-hooks)
   - `src/hooks/useCampaignAudience.ts`
6. [Core Page Coordinator Component](#6-core-page-coordinator-component)
   - `src/components/CampaignPageView.tsx`
7. [Layout Components](#7-layout-components)
   - `src/components/layout/Job10Logo.tsx`
   - `src/components/layout/CampaignHeader.tsx`
   - `src/components/layout/CampaignFooter.tsx`
8. [Hero & Interactive UI Components](#8-hero--interactive-ui-components)
   - `src/components/sections/CampaignHero.tsx`
   - `src/components/ui/HeroActionPanel.tsx`
   - `src/components/ui/AudienceActionCards.tsx`
9. [Full-Page Sections](#9-full-page-sections)
   - `src/components/sections/HowItWorks.tsx`
   - `src/components/sections/BenefitsSection.tsx`
   - `src/components/sections/FinalCTA.tsx`
10. [Design Tokens & Stylesheets](#10-design-tokens--stylesheets)
    - `src/styles/campaign.tokens.css`
    - `src/styles/campaign.css`

---

## 1. Project Overview & Architectural Decisions

- **Brand:** Job10 (*Talent Matches Faster*)
- **Campaign Proposition:** *"Your Next Opportunity Starts in 10 Minutes."*
- **Framework:** Next.js 16 (App Router) with React 19 & TypeScript 5.9+.
- **Hero Image:** Served directly from `/public/images/herobg.png` with high-resolution photography on the right and natural photographic lighting (no artificial muddy gradient overlays).
- **Asymmetric S-Curve Action Tab:** The top of the hero action panel contains an integrated white tab contour with an organic SVG S-curve (`.job10-tab-curve-step`) that dynamically attaches to whichever tab is active (**Find a Job** or **Find Talent**).
- **Non-Mandatory Resume Discovery:**
  - **Option 1 (Find Jobs with AI):** Optional resume selection (PDF/DOC) with explicit confirm/replace/remove actions before upload. CTA: `Upload Resume & Match →`.
  - **Option 2 (Explore Jobs Without Resume):** Immediate search by Role, Category, and Location without requiring sign-in or resume upload. CTA: `Search Jobs →`.
  - Typed search fields remain preserved across mode toggles.
- **Dynamic 3-Step Journey:** Updates dynamically between the Direct Search Path (`01 Search by Role`, `02 Explore Jobs`, `03 View Job Details`) and the AI Resume Match Path (`01 Upload Resume`, `02 AI Matching`, `03 Explore Matched Jobs`).

---

## 2. Dependencies & Build Configuration

### `package.json`
```json
{
  "name": "job10-1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "oxlint"
  },
  "dependencies": {
    "lucide-react": "^1.53.0",
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "oxlint": "^1.81.0",
    "typescript": "~5.9.2"
  }
}
```

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 3. App Router Pages & Root Layout

### `src/app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job10 — Your Next Opportunity Starts in 10 Minutes',
  description:
    'Find opportunities that match your skills or discover talent that fits your team. AI-powered matching connecting qualified candidates with top companies faster.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### `src/app/page.tsx`
```tsx
import { CampaignPageView } from '@/components/CampaignPageView';

export default function HomePage() {
  return <CampaignPageView />;
}
```

### `src/app/campaign/get-started/page.tsx`
```tsx
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
```

### `src/app/globals.css`
```css
@import '../styles/campaign.tokens.css';
@import '../styles/campaign.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  min-height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #ffffff;
  color: #0f172a;
  overflow-x: hidden;
}
```

---

## 4. Central Campaign Configuration & Types

### `src/config/campaign.types.ts`
```typescript
export type AudienceType = 'jobseeker' | 'recruiter';
export type JobseekerMode = 'with-resume' | 'without-resume';

export interface CampaignSectionConfig {
  id: string;
  component: string;
  enabled: boolean;
  order: number;
  variant?: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  highlight?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  stats: string;
  badge: string;
}

export interface AudienceCardData {
  audience: AudienceType;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface CampaignConfig {
  campaignId: string;
  campaignName: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  heroDescription: string;
  sections: CampaignSectionConfig[];
  navigation: {
    brandName: string;
    brandTagline: string;
    navItems: NavItem[];
    cta: {
      label: string;
      href: string;
    };
  };
  searchPanel: {
    jobseeker: {
      tabLabel: string;
      inputs: {
        rolePlaceholder: string;
        categoryOptions: string[];
        locationPlaceholder: string;
      };
      ctaText: string;
      targetHref: string;
    };
    recruiter: {
      tabLabel: string;
      inputs: {
        rolePlaceholder: string;
        categoryOptions: string[];
        locationPlaceholder: string;
      };
      ctaText: string;
      targetHref: string;
    };
  };
  audienceCards: AudienceCardData[];
  steps: {
    headline: string;
    subheadline: string;
    jobseekerWithResume: StepItem[];
    jobseekerWithoutResume: StepItem[];
    recruiter: StepItem[];
  };
  features: {
    headline: string;
    subheadline: string;
    jobseeker: FeatureItem[];
    recruiter: FeatureItem[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
    jobseekerCta: {
      label: string;
      href: string;
    };
    recruiterCta: {
      label: string;
      href: string;
    };
    trustBadge: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}
```

### `src/config/campaign.config.ts`
```typescript
import type { CampaignConfig } from './campaign.types';

export const defaultCampaignConfig: CampaignConfig = {
  campaignId: 'get-started',
  campaignName: 'Your Next Opportunity Starts in 10 Minutes',
  eyebrow: 'FASTER MATCHES • BRIGHTER OPPORTUNITIES',
  headlinePrefix: 'Your next',
  headlineHighlight: '10 minutes.',
  heroDescription:
    'Find opportunities that match your skills or discover talent that fits your team. Your next move starts with Job10.',
  
  sections: [
    { id: 'hero', component: 'CampaignHero', enabled: true, order: 1, variant: 'photographic' },
    { id: 'how-it-works', component: 'HowItWorks', enabled: true, order: 2 },
    { id: 'benefits', component: 'BenefitsSection', enabled: true, order: 3 },
    { id: 'final-cta', component: 'FinalCTA', enabled: true, order: 4 },
    { id: 'footer', component: 'CampaignFooter', enabled: true, order: 5 },
  ],

  navigation: {
    brandName: 'Job10',
    brandTagline: 'TALENT MATCHES FASTER',
    navItems: [
      { label: 'Home', href: '/', active: true },
      { label: 'Find a Job', href: '/campaign/get-started?audience=jobseeker' },
      { label: 'Find Talent', href: '/campaign/get-started?audience=recruiter' },
    ],
    cta: {
      label: 'Get Started →',
      href: '/campaign/get-started?audience=jobseeker#action-panel',
    },
  },

  searchPanel: {
    jobseeker: {
      tabLabel: 'Find a Job',
      inputs: {
        rolePlaceholder: 'Job title or skill',
        categoryOptions: [
          'Category',
          'Technology & Engineering',
          'Product & Design',
          'Sales & Marketing',
          'Data & Analytics',
        ],
        locationPlaceholder: 'Location',
      },
      ctaText: 'Get Started →',
      targetHref: '/onboarding/jobseeker',
    },
    recruiter: {
      tabLabel: 'Find Talent',
      inputs: {
        rolePlaceholder: 'Job role or position',
        categoryOptions: [
          'Category',
          'Full Stack Developers',
          'Product Designers',
          'Engineering Leads',
          'AI / Data Specialists',
        ],
        locationPlaceholder: 'Location',
      },
      ctaText: 'Get Started →',
      targetHref: '/onboarding/recruiter',
    },
  },

  audienceCards: [
    {
      audience: 'jobseeker',
      title: 'For Jobseekers',
      description: 'Upload your resume and discover relevant jobs matched to your skills.',
      ctaText: 'Find My Match →',
      ctaHref: '/onboarding/jobseeker?step=resume',
    },
    {
      audience: 'recruiter',
      title: 'For Recruiters',
      description: 'Find top candidates and build your dream team with AI matching.',
      ctaText: 'Find Talent →',
      ctaHref: '/onboarding/recruiter?step=requirements',
    },
  ],

  steps: {
    headline: 'Three simple steps. One smarter start.',
    subheadline:
      'A streamlined matching engine crafted to eliminate friction and connect qualified talent with visionary employers in 10 minutes.',
    jobseekerWithResume: [
      {
        number: '01',
        title: 'Upload Resume',
        description: 'Upload your existing PDF or Word resume. Our neural parser extracts your technical depth, velocity, and achievements.',
        tag: 'Optional AI Boost',
      },
      {
        number: '02',
        title: 'AI Matching',
        description: 'Multi-dimensional skill mapping aligns your verified track record with roles matching your compensation and impact goals.',
        tag: 'Neural Scoring',
        highlight: true,
      },
      {
        number: '03',
        title: 'Explore Matched Jobs',
        description: 'Review high-affinity roles with direct hiring team interview fast-tracks and transparent compensation bands.',
        tag: 'Direct Interview Queue',
      },
    ],
    jobseekerWithoutResume: [
      {
        number: '01',
        title: 'Search by Role',
        description: 'Enter your preferred job title, target tech stack, or location to instantly filter through thousands of active positions.',
        tag: 'Immediate Search',
      },
      {
        number: '02',
        title: 'Explore Jobs',
        description: 'Browse transparently listed roles with verified salary benchmarks, remote flexibility ratings, and company culture.',
        tag: 'Zero Sign-in Barrier',
        highlight: true,
      },
      {
        number: '03',
        title: 'View Job Details',
        description: 'Dive deep into engineering team requirements, projects, tech stacks, and apply with ease whenever you are ready.',
        tag: 'Full Transparency',
      },
    ],
    recruiter: [
      {
        number: '01',
        title: 'Create your account',
        description: 'Set your team parameters, talent budget, and culture pillars with seamless organization onboarding.',
        tag: 'Verified Employer',
      },
      {
        number: '02',
        title: 'Add your job requirements',
        description: 'Specify technical must-haves, compensation brackets, and team dynamics with smart criteria templates.',
        tag: 'Precision Targeting',
        highlight: true,
      },
      {
        number: '03',
        title: 'Discover matching candidates',
        description: 'Review pre-vetted talent matched with 94%+ skill relevance. Connect directly without inbox spam.',
        tag: 'Top 5% Talent Pool',
      },
    ],
  },

  features: {
    headline: 'Better matches. Less effort.',
    subheadline:
      'Job10 replaces endless scrolling and resume black holes with transparent algorithmic matching designed for precision and speed.',
    jobseeker: [
      {
        title: 'AI-Powered Opportunity Matching',
        description: 'Intelligent multi-dimensional matching based on genuine project impact, not just superficial keyword density.',
        stats: '94% Match Relevance',
        badge: 'Smart Matching',
      },
      {
        title: 'Relevant Opportunities Based on Skills',
        description: 'Curated roles aligned with your career trajectory, compensation benchmarks, and remote flexibility.',
        stats: '10 Min Onboarding',
        badge: 'Tailored Roles',
      },
      {
        title: 'Direct Path Toward Real Interviews',
        description: 'Bypass legacy recruiting agency middlemen and connect straight into hiring managers’ booking calendars.',
        stats: '3.8x Faster Feedback',
        badge: 'Priority Queue',
      },
    ],
    recruiter: [
      {
        title: 'Intelligent Candidate Recommendations',
        description: 'Our neural ranking engine maps candidate achievements to your tech stack and velocity requirements.',
        stats: '82% Acceptance Rate',
        badge: 'High Precision',
      },
      {
        title: 'Relevant Pre-Vetted Candidate Discovery',
        description: 'Instant access to active, pre-assessed professionals ready to interview immediately.',
        stats: '< 24h First Intro',
        badge: 'Active Seekers',
      },
      {
        title: 'Reduced Manual Screening Overheads',
        description: 'Structured candidate snapshots highlight verified strengths, salary expectations, and timeline fit.',
        stats: '75% Time Saved',
        badge: 'Zero Resume Fatigue',
      },
    ],
  },

  finalCta: {
    headline: 'A better match starts with your next click.',
    subheadline:
      'Join thousands of high-growth tech professionals and forward-thinking companies already accelerating their hiring velocity.',
    jobseekerCta: {
      label: 'Find My Match →',
      href: '/campaign/get-started?audience=jobseeker#action-panel',
    },
    recruiterCta: {
      label: 'Find Talent →',
      href: '/campaign/get-started?audience=recruiter#action-panel',
    },
    trustBadge: 'Takes only 10 minutes • Free for jobseekers • No credit card required',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Job10 Technologies Inc. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Security', href: '/legal/security' },
      { label: 'Contact Support', href: 'mailto:support@job10.com' },
    ],
  },
};
```

---

## 5. State Hooks

### `src/hooks/useCampaignAudience.ts`
```typescript
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

    syncAudienceFromUrl();
    window.addEventListener('popstate', syncAudienceFromUrl);
    return () => window.removeEventListener('popstate', syncAudienceFromUrl);
  }, []);

  const changeAudience = (newAudience: AudienceType) => {
    setAudience(newAudience);
    const url = new URL(window.location.href);
    url.searchParams.set('audience', newAudience);
    window.history.replaceState({}, '', url.toString());
  };

  return {
    audience,
    setAudience: changeAudience,
    isJobseeker: audience === 'jobseeker',
    isRecruiter: audience === 'recruiter',
  };
}
```

---

## 6. Core Page Coordinator Component

### `src/components/CampaignPageView.tsx`
```tsx
'use client';

import React, { useState } from 'react';
import { defaultCampaignConfig } from '@/config/campaign.config';
import type { CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { useCampaignAudience } from '@/hooks/useCampaignAudience';
import { CampaignHeader } from '@/components/layout/CampaignHeader';
import { CampaignFooter } from '@/components/layout/CampaignFooter';
import { CampaignHero } from '@/components/sections/CampaignHero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface CampaignPageProps {
  customConfig?: Partial<CampaignConfig>;
}

export function CampaignPageView({ customConfig }: CampaignPageProps) {
  const config = { ...defaultCampaignConfig, ...customConfig };
  const { audience, setAudience } = useCampaignAudience('jobseeker');
  const [jobseekerMode, setJobseekerMode] = useState<JobseekerMode>('without-resume');

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return (
          <CampaignHero
            key="hero"
            audience={audience}
            onAudienceChange={setAudience}
            config={config}
            jobseekerMode={jobseekerMode}
            onJobseekerModeChange={setJobseekerMode}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorks
            key="how-it-works"
            audience={audience}
            onAudienceChange={setAudience}
            jobseekerMode={jobseekerMode}
            onJobseekerModeChange={setJobseekerMode}
            steps={config.steps}
          />
        );
      case 'benefits':
        return (
          <BenefitsSection
            key="benefits"
            audience={audience}
            features={config.features}
          />
        );
      case 'final-cta':
        return <FinalCTA key="final-cta" config={config.finalCta} />;
      case 'footer':
        return <CampaignFooter key="footer" config={config.footer} />;
      default:
        return null;
    }
  };

  const enabledSections = [...config.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="job10-campaign-wrapper">
      <CampaignHeader
        navItems={config.navigation.navItems}
        ctaLabel={config.navigation.cta.label}
        ctaHref={config.navigation.cta.href}
        onAudienceSelect={setAudience}
      />

      <main>{enabledSections.map((sec) => renderSection(sec.id))}</main>
    </div>
  );
}

export default CampaignPageView;
```

---

## 7. Layout Components

### `src/components/layout/Job10Logo.tsx`
```tsx
import React from 'react';

interface Job10LogoProps {
  className?: string;
  size?: number;
}

export const Job10Logo: React.FC<Job10LogoProps> = ({ className = '', size = 42 }) => {
  return (
    <div className={`job10-logo-group ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Job10 Logo"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="speedGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38BDF8" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Speed motion lines */}
        <path
          d="M3 13H15M1 21H12M4 29H14"
          stroke="#38BDF8"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#speedGlow)"
        />

        {/* Briefcase Handle */}
        <path
          d="M26 12V9C26 7.5 27.2 6.5 28.7 6.5H35.3C36.8 6.5 38 7.5 38 9V12"
          stroke="#4F46E5"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Briefcase Body with vibrant gradient */}
        <rect
          x="18"
          y="12"
          width="32"
          height="26"
          rx="8"
          fill="url(#logoBgGrad)"
        />

        {/* Inner check / badge highlight */}
        <path
          d="M27 25L32 30L41 20"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="job10-logo-text">
        <span className="job10-brand-title">
          Job<span>10</span>
        </span>
        <span className="job10-brand-tagline">TALENT MATCHES FASTER</span>
      </div>
    </div>
  );
};
```

### `src/components/layout/CampaignHeader.tsx`
```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Job10Logo } from './Job10Logo';
import type { NavItem } from '@/config/campaign.types';

interface CampaignHeaderProps {
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  onAudienceSelect?: (audience: 'jobseeker' | 'recruiter') => void;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  navItems,
  ctaLabel,
  ctaHref,
  onAudienceSelect,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.includes('jobseeker') && onAudienceSelect) {
      e.preventDefault();
      onAudienceSelect('jobseeker');
      const el = document.getElementById('action-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href.includes('recruiter') && onAudienceSelect) {
      e.preventDefault();
      onAudienceSelect('recruiter');
      const el = document.getElementById('action-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`job10-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="job10-container">
        <div className="job10-header-inner">
          <Job10Logo />

          <nav>
            <ul className="job10-nav-menu">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`job10-nav-link ${item.active ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(item.href, e)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href={ctaHref} className="job10-btn-pill-gradient">
            {ctaLabel}
          </a>

          <button
            className="job10-mobile-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
```

### `src/components/layout/CampaignFooter.tsx`
```tsx
import React from 'react';
import { Job10Logo } from './Job10Logo';
import type { CampaignConfig } from '@/config/campaign.types';

interface CampaignFooterProps {
  config: CampaignConfig['footer'];
}

export const CampaignFooter: React.FC<CampaignFooterProps> = ({ config }) => {
  return (
    <footer className="job10-footer">
      <div className="job10-container">
        <div className="job10-footer-inner">
          <Job10Logo size={32} />

          <ul className="job10-footer-links">
            {config.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="job10-footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="job10-footer-copy">{config.copyright}</div>
        </div>
      </div>
    </footer>
  );
};
```

---

## 8. Hero & Interactive UI Components

### `src/components/sections/CampaignHero.tsx`
```tsx
'use client';

import React from 'react';
import type { AudienceType, CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { HeroActionPanel } from '@/components/ui/HeroActionPanel';
import { AudienceActionCards } from '@/components/ui/AudienceActionCards';
import { Sparkles } from 'lucide-react';

interface CampaignHeroProps {
  audience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  config: CampaignConfig;
  jobseekerMode?: JobseekerMode;
  onJobseekerModeChange?: (mode: JobseekerMode) => void;
}

export const CampaignHero: React.FC<CampaignHeroProps> = ({
  audience,
  onAudienceChange,
  config,
  jobseekerMode,
  onJobseekerModeChange,
}) => {
  return (
    <section className="job10-hero">
      {/* Background Photography without artificial gradient overlay */}
      <div className="job10-hero-bg">
        <img
          src="/images/herobg.png"
          alt="Professional interacting with Job10 platform on smartphone"
          className="job10-hero-img"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      <div className="job10-container">
        <div className="job10-hero-content-wrapper">
          <div className="job10-hero-grid">
            {/* Eyebrow Pill */}
            <div className="job10-eyebrow-pill">
              <Sparkles className="job10-eyebrow-sparkle" size={13} />
              <span>{config.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="job10-hero-headline">
              Your next
              <br />
              opportunity
              <br />
              starts in{' '}
              <span className="job10-hero-gradient-text">
                {config.headlineHighlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="job10-hero-description">{config.heroDescription}</p>

            {/* Conversion Panel */}
            <HeroActionPanel
              audience={audience}
              onAudienceChange={onAudienceChange}
              config={config.searchPanel}
              jobseekerMode={jobseekerMode}
              onJobseekerModeChange={onJobseekerModeChange}
            />

            {/* Audience Action Cards */}
            <AudienceActionCards
              cards={config.audienceCards}
              onSelectAudience={onAudienceChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
```

### `src/components/ui/HeroActionPanel.tsx`
```tsx
'use client';

import React, { useState } from 'react';
import type { AudienceType, CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { Search, LayoutGrid, MapPin, User, Users, ArrowRight, UploadCloud, FileText, CheckCircle, X } from 'lucide-react';

interface HeroActionPanelProps {
  audience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  config: CampaignConfig['searchPanel'];
  jobseekerMode?: JobseekerMode;
  onJobseekerModeChange?: (mode: JobseekerMode) => void;
}

export const HeroActionPanel: React.FC<HeroActionPanelProps> = ({
  audience,
  onAudienceChange,
  config,
  jobseekerMode = 'without-resume',
  onJobseekerModeChange,
}) => {
  const isJobseeker = audience === 'jobseeker';
  const currentConfig = isJobseeker ? config.jobseeker : config.recruiter;

  const [roleInput, setRoleInput] = useState('');
  const [category, setCategory] = useState(currentConfig.inputs.categoryOptions[0]);
  const [locationInput, setLocationInput] = useState('');

  // Resume file state for Option 1
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileConfirmed, setFileConfirmed] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleModeSwitch = (mode: JobseekerMode) => {
    if (onJobseekerModeChange) {
      onJobseekerModeChange(mode);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileConfirmed(false); // require explicit user confirmation
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileConfirmed(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isJobseeker && jobseekerMode === 'with-resume' && selectedFile && !fileConfirmed) {
      setFileConfirmed(true);
      return;
    }

    const queryParams = new URLSearchParams({
      audience,
      mode: isJobseeker ? jobseekerMode : 'recruiter',
      role: roleInput,
      category,
      location: locationInput,
      hasResume: selectedFile ? 'true' : 'false',
    });
    window.location.href = `${currentConfig.targetHref}?${queryParams.toString()}`;
  };

  return (
    <div className="job10-panel-container" id="action-panel">
      <div className="job10-action-panel-shell">
        {/* Continuous top tab silhouette bar with dynamic organic cutting */}
        <div className="job10-tab-header" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isJobseeker}
            className={`job10-tab-item ${isJobseeker ? 'active' : ''}`}
            onClick={() => onAudienceChange('jobseeker')}
          >
            <User size={19} className="job10-tab-icon" />
            <span className="job10-tab-label">Find a Job</span>
            {isJobseeker && <span className="job10-tab-underline" />}
          </button>

          {/* S-curve cutting transition when Jobseeker tab is active */}
          {isJobseeker && (
            <div className="job10-tab-curve-step">
              <svg width="34" height="52" viewBox="0 0 34 52" fill="none" preserveAspectRatio="none">
                <path d="M0,0 C16,0 18,52 34,52 L0,52 Z" fill="#ffffff" />
              </svg>
            </div>
          )}

          <button
            type="button"
            role="tab"
            aria-selected={!isJobseeker}
            className={`job10-tab-item ${!isJobseeker ? 'active recruiter-active' : ''}`}
            onClick={() => onAudienceChange('recruiter')}
          >
            <Users size={19} className="job10-tab-icon" />
            <span className="job10-tab-label">Find Talent</span>
            {!isJobseeker && <span className="job10-tab-underline recruiter-underline" />}
          </button>

          {/* S-curve cutting transition when Recruiter tab is active */}
          {!isJobseeker && (
            <div className="job10-tab-curve-step">
              <svg width="34" height="52" viewBox="0 0 34 52" fill="none" preserveAspectRatio="none">
                <path d="M0,0 C16,0 18,52 34,52 L0,52 Z" fill="#ffffff" />
              </svg>
            </div>
          )}
        </div>

        {/* Dual Entry Mode Selector for Jobseekers (Option 1 vs Option 2) */}
        {isJobseeker && (
          <div className="job10-jobseeker-mode-bar">
            <button
              type="button"
              className={`job10-mode-btn ${jobseekerMode === 'without-resume' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('without-resume')}
            >
              <Search size={14} />
              <span>Explore Jobs Without Resume</span>
              <span className="job10-mode-tag">Quick Search</span>
            </button>

            <button
              type="button"
              className={`job10-mode-btn ${jobseekerMode === 'with-resume' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('with-resume')}
            >
              <UploadCloud size={14} />
              <span>Find Jobs with AI</span>
              <span className="job10-mode-tag ai-tag">Optional AI Boost</span>
            </button>
          </div>
        )}

        {/* Optional Resume Upload Tray when Option 1 is selected */}
        {isJobseeker && jobseekerMode === 'with-resume' && (
          <div className="job10-resume-upload-strip">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="resume-file-input"
            />

            {!selectedFile ? (
              <div className="job10-resume-prompt">
                <div className="job10-resume-prompt-text">
                  <FileText size={16} className="job10-resume-icon" />
                  <span>
                    <strong>Optional:</strong> Upload your resume (PDF/DOC) for personalized AI skill extraction and ranked matching.
                  </span>
                </div>
                <button
                  type="button"
                  className="job10-btn-choose-file"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={14} />
                  <span>Select Resume</span>
                </button>
              </div>
            ) : (
              <div className="job10-resume-selected-row">
                <div className="job10-selected-info">
                  <CheckCircle size={16} className="job10-check-icon" />
                  <span className="job10-filename">{selectedFile.name}</span>
                  <span className="job10-filesize">
                    ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </span>
                  {fileConfirmed && <span className="job10-confirmed-pill">Ready to Match</span>}
                </div>
                <div className="job10-file-actions">
                  <button
                    type="button"
                    className="job10-file-replace-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="job10-file-remove-btn"
                    onClick={handleRemoveFile}
                    title="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Form Fields */}
        <form className="job10-panel-form" onSubmit={handleSubmit}>
          <div className="job10-input-group">
            <Search size={18} className="job10-input-icon" />
            <input
              type="text"
              className="job10-input"
              placeholder={isJobseeker ? "Job title or skill" : "Job role or position"}
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              aria-label="Job title or role"
            />
          </div>

          <div className="job10-input-group">
            <LayoutGrid size={18} className="job10-input-icon" />
            <select
              className="job10-input job10-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
            >
              <option value="" disabled>Category</option>
              {currentConfig.inputs.categoryOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="job10-select-arrow">▾</span>
          </div>

          <div className="job10-input-group">
            <MapPin size={18} className="job10-input-icon" />
            <input
              type="text"
              className="job10-input"
              placeholder="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              aria-label="Location"
            />
          </div>

          <button type="submit" className="job10-btn-submit">
            <span>
              {isJobseeker
                ? jobseekerMode === 'with-resume'
                  ? selectedFile && !fileConfirmed
                    ? 'Confirm & Match →'
                    : 'Upload Resume & Match →'
                  : 'Search Jobs →'
                : 'Get Started →'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
```

### `src/components/ui/AudienceActionCards.tsx`
```tsx
'use client';

import React from 'react';
import type { AudienceCardData } from '@/config/campaign.types';
import { User, Users, ArrowRight } from 'lucide-react';

interface AudienceActionCardsProps {
  cards: AudienceCardData[];
  onSelectAudience?: (aud: 'jobseeker' | 'recruiter') => void;
}

export const AudienceActionCards: React.FC<AudienceActionCardsProps> = ({
  cards,
  onSelectAudience,
}) => {
  return (
    <div className="job10-cards-row">
      {cards.map((card) => {
        const isJobseeker = card.audience === 'jobseeker';
        return (
          <a
            key={card.audience}
            href={card.ctaHref}
            className={`job10-audience-card ${card.audience}`}
            onClick={() => {
              if (onSelectAudience) {
                onSelectAudience(card.audience);
              }
            }}
          >
            <div className="job10-card-body">
              <div className="job10-card-icon-bubble">
                {isJobseeker ? <User size={19} /> : <Users size={19} />}
              </div>
              <div className="job10-card-texts">
                <h4 className="job10-card-title">{card.title}</h4>
                <p className="job10-card-sub">{card.description}</p>
              </div>
            </div>
            <div className="job10-card-arrow">
              <ArrowRight size={15} />
            </div>
          </a>
        );
      })}
    </div>
  );
};
```

---

## 9. Full-Page Sections

### `src/components/sections/HowItWorks.tsx`
```tsx
'use client';

import React from 'react';
import type { AudienceType, StepItem, JobseekerMode } from '@/config/campaign.types';
import { User, Users, FileText, Search } from 'lucide-react';

interface HowItWorksProps {
  audience: AudienceType;
  onAudienceChange: (aud: AudienceType) => void;
  jobseekerMode?: JobseekerMode;
  onJobseekerModeChange?: (mode: JobseekerMode) => void;
  steps: {
    headline: string;
    subheadline: string;
    jobseekerWithResume: StepItem[];
    jobseekerWithoutResume: StepItem[];
    recruiter: StepItem[];
  };
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  audience,
  onAudienceChange,
  jobseekerMode = 'without-resume',
  onJobseekerModeChange,
  steps,
}) => {
  const isJobseeker = audience === 'jobseeker';
  const currentSteps = isJobseeker
    ? jobseekerMode === 'with-resume'
      ? steps.jobseekerWithResume
      : steps.jobseekerWithoutResume
    : steps.recruiter;

  return (
    <section className="job10-steps-section" id="how-it-works">
      <div className="job10-container">
        <div className="job10-section-header">
          <span className="job10-section-tag">Frictionless Process</span>
          <h2 className="job10-section-title">{steps.headline}</h2>
          <p className="job10-section-subtitle">{steps.subheadline}</p>
        </div>

        {/* Stepper Audience & Journey Mode Toggles */}
        <div className="job10-stepper-toggle-group">
          <div className="job10-toggle-pill">
            <button
              className={`job10-toggle-btn ${isJobseeker ? 'active' : ''}`}
              onClick={() => onAudienceChange('jobseeker')}
            >
              <User size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              For Jobseekers
            </button>
            <button
              className={`job10-toggle-btn ${!isJobseeker ? 'active' : ''}`}
              onClick={() => onAudienceChange('recruiter')}
            >
              <Users size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              For Recruiters
            </button>
          </div>

          {/* Sub-toggle when Jobseeker is active: With Resume vs Without Resume */}
          {isJobseeker && (
            <div className="job10-sub-toggle-pill">
              <button
                type="button"
                className={`job10-sub-toggle-btn ${jobseekerMode === 'without-resume' ? 'active' : ''}`}
                onClick={() => onJobseekerModeChange && onJobseekerModeChange('without-resume')}
              >
                <Search size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: -2 }} />
                Direct Search Path
              </button>
              <button
                type="button"
                className={`job10-sub-toggle-btn ${jobseekerMode === 'with-resume' ? 'active' : ''}`}
                onClick={() => onJobseekerModeChange && onJobseekerModeChange('with-resume')}
              >
                <FileText size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: -2 }} />
                AI Resume Match Path
              </button>
            </div>
          )}
        </div>

        {/* 3 Step Cards */}
        <div className="job10-steps-grid">
          {currentSteps.map((step, idx) => (
            <div
              key={idx}
              className={`job10-step-card ${step.highlight ? 'highlight' : ''}`}
            >
              <div className="job10-step-num">
                <span>{step.number}</span>
                <span className="job10-step-badge">{step.tag}</span>
              </div>
              <h3 className="job10-step-title">{step.title}</h3>
              <p className="job10-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### `src/components/sections/BenefitsSection.tsx`
```tsx
import React from 'react';
import type { AudienceType, FeatureItem } from '@/config/campaign.types';
import { Zap, ShieldCheck, Target } from 'lucide-react';

interface BenefitsSectionProps {
  audience: AudienceType;
  features: {
    headline: string;
    subheadline: string;
    jobseeker: FeatureItem[];
    recruiter: FeatureItem[];
  };
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  audience,
  features,
}) => {
  const currentFeatures = audience === 'jobseeker' ? features.jobseeker : features.recruiter;
  const isJobseeker = audience === 'jobseeker';

  return (
    <section className="job10-features-section" id="benefits">
      <div className="job10-container">
        <div className="job10-features-layout">
          {/* Left Column: Text & Feature Benefits */}
          <div className="job10-features-content">
            <span className="job10-section-tag">Match Intelligence</span>
            <h2 className="job10-section-title">{features.headline}</h2>
            <p className="job10-section-subtitle">{features.subheadline}</p>

            <div className="job10-feature-list">
              {currentFeatures.map((feat, idx) => (
                <div key={idx} className="job10-feature-item">
                  <div className="job10-feature-icon-box">
                    {idx === 0 ? <Zap size={22} /> : idx === 1 ? <Target size={22} /> : <ShieldCheck size={22} />}
                  </div>
                  <div className="job10-feature-info">
                    <div className="job10-feature-heading-row">
                      <h4 className="job10-feature-item-title">{feat.title}</h4>
                      <span className="job10-feature-stat-pill">{feat.stats}</span>
                    </div>
                    <p className="job10-feature-item-desc">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Beautiful Realistic Job10 Product UI Preview */}
          <div className="job10-preview-container">
            <div className="job10-preview-card">
              <div className="job10-preview-header">
                <div className="job10-preview-dots">
                  <span className="job10-dot red" />
                  <span className="job10-dot yellow" />
                  <span className="job10-dot green" />
                </div>
                <span className="job10-preview-badge">
                  {isJobseeker ? 'Live Opportunity Feed • Job10 AI' : 'Active Candidate Matches • Job10 AI'}
                </span>
              </div>

              {isJobseeker ? (
                <>
                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Staff Frontend Architect</span>
                      <span className="job10-mock-score">98% Match</span>
                    </div>
                    <div className="job10-mock-sub">Fintech Scaleup • Remote (US/EU) • $190k - $230k</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">React 19</span>
                      <span className="job10-mock-tag">TypeScript</span>
                      <span className="job10-mock-tag">Design Systems</span>
                      <span className="job10-mock-tag">Next.js</span>
                    </div>
                  </div>

                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Principal Design Technologist</span>
                      <span className="job10-mock-score">95% Match</span>
                    </div>
                    <div className="job10-mock-sub">AI Infrastructure • San Francisco, CA • $210k - $250k</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">Figma Tokens</span>
                      <span className="job10-mock-tag">WebGL</span>
                      <span className="job10-mock-tag">Fullstack UX</span>
                    </div>
                  </div>

                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Senior Full Stack Engineer</span>
                      <span className="job10-mock-score">92% Match</span>
                    </div>
                    <div className="job10-mock-sub">Cloud Native AI • Remote • $175k - $210k</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">Node / Go</span>
                      <span className="job10-mock-tag">GraphQL</span>
                      <span className="job10-mock-tag">Kubernetes</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Elena Rostova • Senior React Architect</span>
                      <span className="job10-mock-score">97% Affinity</span>
                    </div>
                    <div className="job10-mock-sub">8+ yrs exp • Ex-Stripe • Available in 2 weeks</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">React Ecosystem</span>
                      <span className="job10-mock-tag">High Concurrency</span>
                      <span className="job10-mock-tag">Team Leadership</span>
                    </div>
                  </div>

                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Marcus Chen • Staff ML Engineer</span>
                      <span className="job10-mock-score">94% Affinity</span>
                    </div>
                    <div className="job10-mock-sub">6+ yrs exp • Ex-DeepMind • Open to remote</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">PyTorch</span>
                      <span className="job10-mock-tag">LLM Fine-tuning</span>
                      <span className="job10-mock-tag">Distributed Training</span>
                    </div>
                  </div>

                  <div className="job10-mock-item">
                    <div className="job10-mock-top">
                      <span className="job10-mock-title">Sarah Jenkins • Lead Product Designer</span>
                      <span className="job10-mock-score">91% Affinity</span>
                    </div>
                    <div className="job10-mock-sub">7+ yrs exp • Ex-Figma • Immediate start</div>
                    <div className="job10-mock-tags">
                      <span className="job10-mock-tag">Enterprise SaaS</span>
                      <span className="job10-mock-tag">Design Systems</span>
                      <span className="job10-mock-tag">Rapid Prototyping</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### `src/components/sections/FinalCTA.tsx`
```tsx
import React from 'react';
import type { CampaignConfig } from '@/config/campaign.types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  config: CampaignConfig['finalCta'];
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config }) => {
  return (
    <section className="job10-final-cta" id="get-started">
      <div className="job10-container">
        <div className="job10-cta-box">
          <div className="job10-eyebrow-pill" style={{ margin: '0 auto 20px auto' }}>
            <Sparkles size={13} className="job10-eyebrow-sparkle" />
            <span>ACCELERATE YOUR TRAJECTORY</span>
          </div>

          <h2 className="job10-cta-headline">{config.headline}</h2>
          <p className="job10-cta-sub">{config.subheadline}</p>

          <div className="job10-cta-buttons">
            <a href={config.jobseekerCta.href} className="job10-btn-white-solid">
              <span>{config.jobseekerCta.label}</span>
              <ArrowRight size={17} />
            </a>

            <a href={config.recruiterCta.href} className="job10-btn-glass-purple">
              <span>{config.recruiterCta.label}</span>
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="job10-trust-text">
            <span>{config.trustBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## 10. Design Tokens & Stylesheets

### `src/styles/campaign.tokens.css`
```css
:root {
  /* Job10 Brand Palette */
  --job10-primary-blue: #176bff;
  --job10-primary-indigo: #4057f5;
  --job10-primary-purple: #8b22f5;
  --job10-deep-navy: #0d1629;
  --job10-dark-surface: #101c38;
  --job10-dark-card: rgba(16, 28, 56, 0.7);
  
  /* Brand Gradients */
  --job10-grad-brand: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #9333ea 100%);
  --job10-grad-hero-text: linear-gradient(90deg, #38bdf8 0%, #60a5fa 35%, #a855f7 70%, #c084fc 100%);
  --job10-grad-blue-purple: linear-gradient(135deg, #176bff 0%, #8b22f5 100%);
  --job10-grad-btn-hover: linear-gradient(135deg, #0d5be0 0%, #7916e6 100%);
  --job10-grad-light-blue: linear-gradient(180deg, #f0f7ff 0%, #e5f0ff 100%);
  --job10-grad-light-purple: linear-gradient(180deg, #f8f3ff 0%, #f0e6ff 100%);
  
  /* Neutrals */
  --job10-bg-white: #ffffff;
  --job10-bg-subtle: #f8fafc;
  --job10-bg-section: #f1f5f9;
  --job10-text-primary: #0f172a;
  --job10-text-secondary: #475569;
  --job10-text-muted: #64748b;
  --job10-border-light: rgba(226, 232, 240, 0.8);
  --job10-border-focus: #3b82f6;

  /* Glassmorphism & Translucency */
  --job10-glass-panel: rgba(255, 255, 255, 0.96);
  --job10-glass-border: rgba(255, 255, 255, 0.85);
  --job10-glass-dark: rgba(15, 23, 42, 0.65);
  --job10-glass-pill: rgba(255, 255, 255, 0.12);
  --job10-glass-pill-border: rgba(255, 255, 255, 0.22);

  /* Shadows */
  --job10-shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.05);
  --job10-shadow-md: 0 6px 16px rgba(15, 23, 42, 0.08);
  --job10-shadow-lg: 0 16px 36px -8px rgba(15, 23, 42, 0.14);
  --job10-shadow-hero-panel: 0 20px 48px -10px rgba(13, 27, 62, 0.28), 0 0 1px rgba(255, 255, 255, 0.6) inset;
  --job10-shadow-glow: 0 0 32px rgba(124, 58, 237, 0.35);

  /* Geometry */
  --job10-radius-sm: 8px;
  --job10-radius-md: 14px;
  --job10-radius-lg: 20px;
  --job10-radius-xl: 28px;
  --job10-radius-pill: 9999px;

  /* Typography */
  --job10-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
```

### `src/styles/campaign.css`
```css
@import './campaign.tokens.css';

/* Base Layout and Container Styles */
.job10-campaign-wrapper {
  font-family: var(--job10-font-sans);
  color: var(--job10-text-primary);
  background-color: var(--job10-bg-white);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.job10-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;
}

@media (min-width: 1024px) {
  .job10-container {
    padding: 0 48px;
  }
}

@media (min-width: 1440px) {
  .job10-container {
    padding: 0 64px;
    max-width: 1400px;
  }
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
.job10-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 24px 0;
  transition: all 0.3s ease;
}

.job10-header.scrolled {
  position: fixed;
  background: rgba(13, 22, 41, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 14px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.job10-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.job10-logo-group {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
}

.job10-logo-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job10-logo-text {
  display: flex;
  flex-direction: column;
}

.job10-brand-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #ffffff;
  line-height: 1;
}

.job10-brand-title span {
  color: #38bdf8;
}

.job10-brand-tagline {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
  text-transform: uppercase;
}

.job10-nav-menu {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.job10-nav-link {
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  padding: 6px 2px;
}

.job10-nav-link:hover,
.job10-nav-link.active {
  color: #ffffff;
}

.job10-nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--job10-grad-hero-text);
  border-radius: 2px;
}

.job10-btn-pill-gradient {
  background: var(--job10-grad-brand);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 24px;
  border-radius: var(--job10-radius-pill);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.job10-btn-pill-gradient:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.55);
  background: var(--job10-grad-btn-hover);
}

.job10-mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */
.job10-hero {
  position: relative;
  min-height: 860px;
  width: 100%;
  background-color: #0b1220;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 105px;
  padding-bottom: 60px;
}

/* Hero Background Layer */
.job10-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.job10-hero-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 84% center;
}

.job10-hero-content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
}

.job10-hero-grid {
  display: flex;
  flex-direction: column;
  max-width: 660px;
}

@media (min-width: 1280px) {
  .job10-hero-grid {
    max-width: 710px;
  }
}

/* Eyebrow Pill matching reference exactly */
.job10-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: rgba(30, 41, 59, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--job10-radius-pill);
  color: #f1f5f9;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 22px;
  width: fit-content;
}

.job10-eyebrow-sparkle {
  color: #38bdf8;
  font-size: 14px;
}

/* Main Headline matching reference */
.job10-hero-headline {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  color: #ffffff;
  margin-bottom: 18px;
}

.job10-hero-gradient-text {
  background: linear-gradient(90deg, #38bdf8 0%, #2563eb 45%, #a855f7 85%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-weight: 800;
}

@media (min-width: 1280px) {
  .job10-hero-headline {
    font-size: 66px;
  }
}

/* Sub-copy matching reference */
.job10-hero-description {
  font-size: 17px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 28px;
  max-width: 560px;
  font-weight: 400;
}

/* ==========================================================================
   CONVERSION PANEL (SEARCH & AUDIENCE TABS)
   ========================================================================== */
.job10-panel-container {
  width: 100%;
  margin-bottom: 22px;
}

/* Continuous integrated container */
.job10-action-panel-shell {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 48px -8px rgba(11, 18, 36, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: visible;
}

/* Header tab bar matching screenshot's continuous contour */
.job10-tab-header {
  display: flex;
  align-items: stretch;
  background: transparent;
  padding: 0;
  position: relative;
  border-top-left-radius: 20px;
  height: 52px;
}

.job10-tab-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  color: #556987;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  user-select: none;
  height: 52px;
}

.job10-tab-item:first-child {
  border-top-left-radius: 20px;
}

.job10-tab-item .job10-tab-icon {
  color: #6366f1;
  transition: color 0.2s ease;
}

.job10-tab-item.active {
  color: #2563eb;
  font-weight: 700;
  background: #ffffff;
}

.job10-tab-item.active .job10-tab-icon {
  color: #2563eb;
}

.job10-tab-item.active.recruiter-active {
  color: #4f46e5;
  background: #ffffff;
}

.job10-tab-item.active.recruiter-active .job10-tab-icon {
  color: #4f46e5;
}

.job10-tab-label {
  font-size: 15px;
}

/* Glowing blue active line beneath active tab matching screenshot */
.job10-tab-underline {
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 3px;
  background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 100%);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
}

.job10-tab-underline.recruiter-underline {
  background: linear-gradient(90deg, #4f46e5 0%, #a855f7 100%);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
}

/* Organic S-curve step down to main container top edge */
.job10-tab-curve-step {
  display: flex;
  align-items: stretch;
  height: 52px;
  margin-left: -1px;
}

.job10-tab-curve-step svg {
  display: block;
  height: 100%;
}

/* Dual Entry Mode Selector for Jobseekers (Option 1 vs Option 2) */
.job10-jobseeker-mode-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px 4px 18px;
  background: #ffffff;
  border-bottom: 1px dashed #e2e8f0;
}

.job10-mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: var(--job10-radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job10-mode-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.job10-mode-btn.active {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
}

.job10-mode-tag {
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--job10-radius-pill);
  background: #e2e8f0;
  color: #475569;
}

.job10-mode-btn.active .job10-mode-tag {
  background: #dbeafe;
  color: #1e40af;
}

.job10-mode-tag.ai-tag {
  background: #f3e8ff;
  color: #7e22ce;
}

.job10-mode-btn.active .job10-mode-tag.ai-tag {
  background: #ede9fe;
  color: #6b21a8;
}

/* Optional Resume Upload Tray */
.job10-resume-upload-strip {
  padding: 12px 18px 6px 18px;
  background: #faf5ff;
  border-bottom: 1px solid #f3e8ff;
  display: flex;
  align-items: center;
  animation: fadeIn 0.2s ease-in-out;
}

.job10-resume-prompt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
}

.job10-resume-prompt-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b21a8;
}

.job10-resume-icon {
  color: #9333ea;
  flex-shrink: 0;
}

.job10-btn-choose-file {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #ffffff;
  border: 1px solid #d8b4fe;
  border-radius: var(--job10-radius-md);
  color: #7e22ce;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.job10-btn-choose-file:hover {
  background: #f3e8ff;
  border-color: #c084fc;
}

.job10-resume-selected-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.job10-selected-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.job10-check-icon {
  color: #10b981;
}

.job10-filename {
  font-weight: 600;
  color: #1e293b;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.job10-filesize {
  color: #64748b;
  font-size: 12px;
}

.job10-confirmed-pill {
  font-size: 11px;
  font-weight: 700;
  background: #ecfdf5;
  color: #047857;
  padding: 2px 8px;
  border-radius: var(--job10-radius-pill);
}

.job10-file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.job10-file-replace-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  color: #2563eb;
  cursor: pointer;
  text-decoration: underline;
  padding: 4px;
}

.job10-file-remove-btn {
  background: #f1f5f9;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job10-file-remove-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

/* Stepper Audience & Journey Mode Toggles */
.job10-stepper-toggle-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 40px;
}

.job10-sub-toggle-pill {
  display: inline-flex;
  background: #e0e7ff;
  padding: 3px;
  border-radius: var(--job10-radius-pill);
  gap: 4px;
}

.job10-sub-toggle-btn {
  padding: 5px 16px;
  border-radius: var(--job10-radius-pill);
  font-size: 12.5px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: #4338ca;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job10-sub-toggle-btn.active {
  background: #ffffff;
  color: #1e1b4b;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Search Form Fields Bar */
.job10-panel-form {
  padding: 10px 18px 18px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: relative;
}

.job10-input-group {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}

.job10-input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  pointer-events: none;
}

.job10-input {
  width: 100%;
  height: 50px;
  padding: 0 14px 0 42px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14.5px;
  color: #1e293b;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.job10-input::placeholder {
  color: #64748b;
  font-weight: 400;
}

.job10-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.job10-select {
  appearance: none;
  cursor: pointer;
  padding-right: 36px;
  color: #64748b;
}

.job10-select-arrow {
  position: absolute;
  right: 14px;
  color: #64748b;
  pointer-events: none;
  font-size: 13px;
}

/* Get Started Button matching reference blue-to-purple gradient */
.job10-btn-submit {
  height: 50px;
  padding: 0 28px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 30%, #6366f1 70%, #9333ea 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.35);
  transition: all 0.2s ease;
}

.job10-btn-submit:hover {
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.55);
  transform: translateY(-1px);
}

/* ==========================================================================
   TWO AUDIENCE ACTION CARDS
   ========================================================================== */
.job10-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 650px;
}

.job10-audience-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-radius: 16px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.job10-audience-card.jobseeker {
  background: rgba(235, 245, 255, 0.95);
  border-color: rgba(191, 219, 254, 0.8);
}

.job10-audience-card.recruiter {
  background: rgba(246, 241, 255, 0.95);
  border-color: rgba(233, 213, 255, 0.8);
}

.job10-audience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.job10-audience-card.jobseeker:hover {
  border-color: #38bdf8;
}

.job10-audience-card.recruiter:hover {
  border-color: #c084fc;
}

.job10-card-body {
  display: flex;
  align-items: center;
  gap: 14px;
}

.job10-card-icon-bubble {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.job10-audience-card.jobseeker .job10-card-icon-bubble {
  background: #dbeafe;
  color: #2563eb;
}

.job10-audience-card.recruiter .job10-card-icon-bubble {
  background: #f3e8ff;
  color: #7c3aed;
}

.job10-card-texts {
  display: flex;
  flex-direction: column;
}

.job10-card-title {
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 2px 0;
}

.job10-audience-card.jobseeker .job10-card-title {
  color: #1e3a8a;
}

.job10-audience-card.recruiter .job10-card-title {
  color: #581c87;
}

.job10-card-sub {
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
  margin: 0;
  max-width: 190px;
}

.job10-card-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  color: #64748b;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.job10-audience-card:hover .job10-card-arrow {
  color: #2563eb;
  transform: translateX(3px);
}

.job10-audience-card.recruiter:hover .job10-card-arrow {
  color: #7c3aed;
}

/* ==========================================================================
   SECTION 02 — THREE SIMPLE STEPS
   ========================================================================== */
.job10-steps-section {
  padding: 100px 0;
  background: #f8fafc;
  position: relative;
  border-top: 1px solid #e2e8f0;
}

.job10-section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 50px auto;
}

.job10-section-tag {
  display: inline-block;
  padding: 5px 14px;
  border-radius: var(--job10-radius-pill);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: #e0e7ff;
  color: #4338ca;
  margin-bottom: 14px;
}

.job10-section-title {
  font-size: 38px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
}

.job10-section-subtitle {
  font-size: 17px;
  line-height: 1.6;
  color: #64748b;
}

/* Stepper Switcher */
.job10-stepper-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.job10-toggle-pill {
  display: inline-flex;
  background: #e2e8f0;
  padding: 4px;
  border-radius: var(--job10-radius-pill);
}

.job10-toggle-btn {
  padding: 8px 24px;
  border-radius: var(--job10-radius-pill);
  font-size: 14px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job10-toggle-btn.active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Steps Grid */
.job10-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  position: relative;
}

.job10-step-card {
  background: #ffffff;
  border-radius: var(--job10-radius-lg);
  padding: 36px 28px;
  border: 1px solid #e2e8f0;
  position: relative;
  transition: all 0.25s ease;
  box-shadow: var(--job10-shadow-sm);
  display: flex;
  flex-direction: column;
}

.job10-step-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--job10-shadow-lg);
  border-color: #cbd5e1;
}

.job10-step-card.highlight {
  border-color: #c7d2fe;
  background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%);
  box-shadow: 0 10px 30px rgba(67, 56, 202, 0.08);
}

.job10-step-num {
  font-size: 32px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.job10-step-card.highlight .job10-step-num {
  color: var(--job10-primary-blue);
}

.job10-step-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--job10-radius-pill);
  background: #f1f5f9;
  color: #475569;
}

.job10-step-card.highlight .job10-step-badge {
  background: #dbeafe;
  color: #1d4ed8;
}

.job10-step-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
}

.job10-step-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

/* ==========================================================================
   SECTION 03 — BETTER MATCHES. LESS EFFORT.
   ========================================================================== */
.job10-features-section {
  padding: 110px 0;
  background: #ffffff;
}

.job10-features-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.job10-features-content {
  display: flex;
  flex-direction: column;
}

.job10-feature-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 36px;
}

.job10-feature-item {
  display: flex;
  gap: 18px;
  padding: 20px;
  border-radius: var(--job10-radius-md);
  border: 1px solid #f1f5f9;
  background: #fafbfc;
  transition: all 0.2s ease;
}

.job10-feature-item:hover {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: var(--job10-shadow-md);
}

.job10-feature-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.job10-feature-info {
  display: flex;
  flex-direction: column;
}

.job10-feature-heading-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.job10-feature-item-title {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.job10-feature-stat-pill {
  font-size: 11.5px;
  font-weight: 700;
  background: #ecfdf5;
  color: #059669;
  padding: 3px 10px;
  border-radius: var(--job10-radius-pill);
}

.job10-feature-item-desc {
  font-size: 14.5px;
  line-height: 1.55;
  color: #64748b;
  margin: 0;
}

/* Product Preview Interactive Mockup */
.job10-preview-card {
  background: #0f172a;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
  border: 1px solid #1e293b;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.job10-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 24px;
}

.job10-preview-dots {
  display: flex;
  gap: 6px;
}

.job10-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.job10-dot.red { background: #ef4444; }
.job10-dot.yellow { background: #f59e0b; }
.job10-dot.green { background: #10b981; }

.job10-preview-badge {
  font-size: 11px;
  font-weight: 600;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 4px 12px;
  border-radius: var(--job10-radius-pill);
}

.job10-mock-item {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 14px;
  transition: all 0.2s ease;
}

.job10-mock-item:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(30, 41, 59, 0.95);
}

.job10-mock-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.job10-mock-title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}

.job10-mock-score {
  font-size: 12px;
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  padding: 4px 10px;
  border-radius: var(--job10-radius-pill);
}

.job10-mock-sub {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.job10-mock-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.job10-mock-tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
}

/* ==========================================================================
   SECTION 04 — FINAL CONVERSION
   ========================================================================== */
.job10-final-cta {
  padding: 90px 0;
  background: linear-gradient(135deg, #0d1629 0%, #1e1b4b 60%, #31104b 100%);
  color: #ffffff;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.job10-cta-box {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.job10-cta-headline {
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin-bottom: 16px;
}

.job10-cta-sub {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin-bottom: 36px;
}

.job10-cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.job10-btn-white-solid {
  background: #ffffff;
  color: #0f172a;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 28px;
  border-radius: var(--job10-radius-pill);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.job10-btn-white-solid:hover {
  transform: translateY(-2px);
  background: #f8fafc;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.job10-btn-glass-purple {
  background: rgba(139, 34, 245, 0.35);
  border: 1px solid rgba(192, 132, 252, 0.5);
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 28px;
  border-radius: var(--job10-radius-pill);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.job10-btn-glass-purple:hover {
  background: rgba(139, 34, 245, 0.55);
  border-color: #c084fc;
  transform: translateY(-2px);
}

.job10-trust-text {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.65);
}

/* ==========================================================================
   SECTION 05 — FOOTER
   ========================================================================== */
.job10-footer {
  background: #090e1a;
  padding: 36px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  font-size: 14px;
}

.job10-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.job10-footer-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.job10-footer-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.job10-footer-link:hover {
  color: #ffffff;
}

/* ==========================================================================
   RESPONSIVENESS (TABLET & MOBILE)
   ========================================================================== */
@media (max-width: 1024px) {
  .job10-hero {
    min-height: auto;
    padding-top: 110px;
    padding-bottom: 60px;
  }

  .job10-hero-img {
    opacity: 0.35;
    object-position: center;
  }

  .job10-hero-headline {
    font-size: 46px;
  }

  .job10-steps-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .job10-features-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .job10-nav-menu,
  .job10-header .job10-btn-pill-gradient {
    display: none;
  }

  .job10-mobile-toggle {
    display: block;
  }

  .job10-hero {
    padding-top: 96px;
    padding-bottom: 50px;
  }

  .job10-hero-headline {
    font-size: 36px;
  }

  .job10-hero-description {
    font-size: 16px;
  }

  .job10-panel-form {
    flex-direction: column;
    padding: 14px;
  }

  .job10-input-group {
    width: 100%;
  }

  .job10-btn-submit {
    width: 100%;
    justify-content: center;
  }

  .job10-cards-row {
    grid-template-columns: 1fr;
  }

  .job10-audience-card {
    padding: 14px 16px;
  }

  .job10-section-title {
    font-size: 28px;
  }

  .job10-cta-headline {
    font-size: 30px;
  }

  .job10-cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .job10-btn-white-solid,
  .job10-btn-glass-purple {
    width: 100%;
    justify-content: center;
  }

  .job10-footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
```
