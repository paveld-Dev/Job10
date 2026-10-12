'use client';

import React from 'react';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFinalCTA: React.FC = () => {
  const { finalCta, redirectUrls } = jobseekerPromoConfig;

  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.container}>
        <div className={styles.finalCtaCard}>
          <h2 className={styles.finalCtaHeadline}>
            {finalCta.headline}
          </h2>
          <p className={styles.finalCtaDescription}>
            {finalCta.description}
          </p>
          <a
            href={redirectUrls.finalCta}
            className={styles.finalCtaBtn}
          >
            <span>{finalCta.ctaLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
