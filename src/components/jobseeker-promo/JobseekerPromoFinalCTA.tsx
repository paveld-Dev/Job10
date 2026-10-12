'use client';

import React from 'react';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFinalCTA: React.FC = () => {
  return (
    <section className={styles.ctaSection} id="cta">
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaCardInner}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaHeadline}>Your next opportunity could be one click away.</h2>
              <p className={styles.ctaDesc}>
                Join thousands of professionals finding matched roles and advancing their careers faster today.
              </p>
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                className={`${styles.btn} ${styles.btnWhite}`}
                id="final-cta-btn"
              >
                Find My Match &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
