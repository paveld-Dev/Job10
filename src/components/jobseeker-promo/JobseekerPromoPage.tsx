'use client';

import React from 'react';
import { JobseekerPromoHeader } from './JobseekerPromoHeader';
import { JobseekerPromoHero } from './JobseekerPromoHero';
import { JobseekerPromoHighlights } from './JobseekerPromoHighlights';
import { JobseekerPromoFeature } from './JobseekerPromoFeature';
import { JobseekerPromoFinalCTA } from './JobseekerPromoFinalCTA';
import { JobseekerPromoFooter } from './JobseekerPromoFooter';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Section 01: Header */}
      <JobseekerPromoHeader />

      <main>
        {/* Section 02: Hero with Overlaid Content */}
        <JobseekerPromoHero />

        {/* Section 03: Why Job10 (3 Highlights) */}
        <JobseekerPromoHighlights />

        {/* Section 04: For Jobseekers Block */}
        <JobseekerPromoFeature />

        {/* Section 05: Final CTA */}
        <JobseekerPromoFinalCTA />
      </main>

      {/* Section 06: Footer */}
      <JobseekerPromoFooter />
    </div>
  );
};
