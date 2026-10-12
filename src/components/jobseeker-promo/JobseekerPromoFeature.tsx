'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFeature: React.FC = () => {
  return (
    <section className={styles.featureSection} id="jobseekers">
      <div className={styles.container}>
        <div className={styles.featureGrid}>
          {/* Left Media Asset */}
          <div className={styles.featureMediaWrap}>
            <Image
              src="/images/feature-recruiter-card.png"
              alt="Professional engineer exploring tailored roles"
              width={440}
              height={440}
              className={styles.featureMediaImg}
            />
          </div>

          {/* Right Content */}
          <div className={styles.featureContent}>
            <span className={styles.featureEyebrow}>FOR JOBSEEKERS</span>
            <h2 className={styles.featureHeadline}>Land roles tailored to your unique skills.</h2>
            <p className={styles.featureDesc}>
              Create your profile, upload your resume or browse directly to receive instant, AI-matched roles from top verified companies &mdash; all in minutes.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureListItem}>
                <span className={styles.featureCheckIcon}>✓</span>
                Instant AI resume parsing with zero manual entry
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCheckIcon}>✓</span>
                100% upfront salary transparency and remote indicators
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCheckIcon}>✓</span>
                Direct communication channels with engineering and hiring leads
              </li>
            </ul>

            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              className={`${styles.btn} ${styles.btnPrimary}`}
              id="feature-find-jobs-btn"
            >
              Find Jobs &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
