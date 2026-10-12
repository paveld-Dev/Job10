'use client';

import React from 'react';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHighlights: React.FC = () => {
  return (
    <section className={styles.benefitsSection} id="benefits">
      <div className={styles.container}>
        <div className={styles.benefitsHeader}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✦</span>
            Why Choose Job10
          </div>
          <h2>Accelerate your career search with zero friction</h2>
        </div>

        <div className={styles.benefitsGrid}>
          {/* Card 1: 10 Min */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>10 Min</div>
            <div className={styles.benefitSubtitle}>Match Velocity</div>
            <p className={styles.benefitDesc}>
              Direct algorithmic screening connects you with verified hiring managers in minutes, not weeks.
            </p>
          </div>

          {/* Card 2: AI-Driven */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm14-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2zM8 4h2v2H8V4zm5 0h2v2h-2V4zm-5 14h2v2H8v-2zm5 0h2v2h-2v-2zM7 7h10v10H7V7zm2 2v6h6V9H9z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>AI-Driven</div>
            <div className={styles.benefitSubtitle}>Precision Fit</div>
            <p className={styles.benefitDesc}>
              Skills-first matching analyzes your unique career capabilities to pinpoint the highest compatibility roles.
            </p>
          </div>

          {/* Card 3: Verified */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className={styles.benefitTitle}>Verified</div>
            <div className={styles.benefitSubtitle}>Top Opportunities</div>
            <p className={styles.benefitDesc}>
              Every position is backed by vetted compensation, direct company verification, and active hiring budgets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
