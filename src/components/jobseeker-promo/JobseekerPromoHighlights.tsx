'use client';

import React from 'react';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHighlights: React.FC = () => {
  return (
    <section className={styles.benefitsSection} id="benefits">
      <div className={styles.container}>
        <div className={styles.benefitsHeader}>
          <h2>Why Choose Job10</h2>
        </div>

        <div className={styles.benefitsGrid}>
          {/* Card 1: Faster matches */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>Less searching. Faster matches.</div>
            <p className={styles.benefitDesc}>
              Get matched with relevant job opportunities.
            </p>
          </div>

          {/* Card 2: AI matching */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm14-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2zM8 4h2v2H8V4zm5 0h2v2h-2V4zm-5 14h2v2H8v-2zm5 0h2v2h-2v-2zM7 7h10v10H7V7zm2 2v6h6V9H9z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>AI-powered job matching.</div>
            <p className={styles.benefitDesc}>
              Job10 AI analyzes your resume to find roles that fit your profile.
            </p>
          </div>

          {/* Card 3: Verified openings */}
          <div className={`${styles.benefitCard} ${styles.benefitCardVerified}`}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>Real companies. Genuine openings.</div>
            <p className={styles.benefitDesc}>
              Discover opportunities from verified hiring companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
