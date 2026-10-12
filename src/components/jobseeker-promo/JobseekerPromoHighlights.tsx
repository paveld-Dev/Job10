'use client';

import React from 'react';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

const renderIcon = (type: 'lightning' | 'sparkle' | 'shield') => {
  switch (type) {
    case 'lightning':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2b3bff" aria-hidden="true">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2b3bff" aria-hidden="true">
          <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5L12 2zm7 13l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2b3bff" aria-hidden="true">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      );
    default:
      return null;
  }
};

export const JobseekerPromoHighlights: React.FC = () => {
  const { highlights } = jobseekerPromoConfig;

  return (
    <section className={styles.highlightsSection}>
      <div className={styles.container}>
        <div className={styles.highlightsCard}>
          <div className={styles.highlightsGrid}>
            {highlights.items.map((item) => (
              <div key={item.id} className={styles.highlightCol}>
                <div className={styles.highlightIconBadge}>
                  {renderIcon(item.icon)}
                </div>
                <div
                  className={styles.highlightValue}
                  style={{ color: item.accentColor || '#0b1a3c' }}
                >
                  {item.value}
                </div>
                <div className={styles.highlightLabel}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
