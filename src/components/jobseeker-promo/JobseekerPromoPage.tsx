'use client';

import React from 'react';
import { JobseekerPromoHeader } from './JobseekerPromoHeader';
import { JobseekerPromoHero } from './JobseekerPromoHero';
import { JobseekerPromoHighlights } from './JobseekerPromoHighlights';
import { JobseekerPromoFeature } from './JobseekerPromoFeature';
import { JobseekerPromoFinalCTA } from './JobseekerPromoFinalCTA';
import { JobseekerPromoFooter } from './JobseekerPromoFooter';

export const JobseekerPromoPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#0b1a3c] font-sans text-lg leading-[1.6] antialiased overflow-x-hidden">
      {/* Section 01: Header */}
      <JobseekerPromoHeader />

      <main>
        {/* Section 02: Hero with Live Content & Visual */}
        <JobseekerPromoHero />

        {/* Section 03: Why Job10 (3 Value Highlights) */}
        <JobseekerPromoHighlights />

        {/* Section 04: Popular Job Openings */}
        <JobseekerPromoFeature />

        {/* Section 05: Final CTA */}
        <JobseekerPromoFinalCTA />
      </main>

      {/* Section 06: Footer */}
      <JobseekerPromoFooter />
    </div>
  );
};
