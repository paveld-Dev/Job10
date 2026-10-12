'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFeature: React.FC = () => {
  return (
    <section className={styles.featureSection} id="jobseekers">
      <div className={styles.container}>
        <div className={styles.featureGrid}>
          {/* Left Media Asset with Floating Badges */}
          <div className={styles.featureMediaWrap}>
            <div className={styles.featureGlow} aria-hidden="true" />

            <div className={styles.featureImageCard}>
              <Image
                src="/images/feature-recruiter-card.png"
                alt="Professional engineer exploring tailored roles"
                width={460}
                height={460}
                className={styles.featureMediaImg}
              />
            </div>

            {/* Top Floating Match Card */}
            <div className={`${styles.floatingCard} ${styles.floatingCardTop}`}>
              <div className={styles.floatingCardBadge}>
                <span className={styles.pulseDot} />
                <span>98% Compatibility</span>
              </div>
              <div className={styles.floatingCardTitle}>Senior Software Engineer</div>
              <div className={styles.floatingCardMeta}>Verified Direct Match &middot; Active Hiring</div>
            </div>

            {/* Bottom Floating Salary Card */}
            <div className={`${styles.floatingCard} ${styles.floatingCardBottom}`}>
              <div className={styles.floatingCardSalary}>
                <span className={styles.salaryBadge}>$150K &ndash; $185K</span>
                <span className={styles.salaryType}>/ year</span>
              </div>
              <div className={styles.floatingCardMeta}>100% Remote &middot; Full Equity Package</div>
            </div>
          </div>

          {/* Right Content */}
          <div className={styles.featureContent}>
            <span className={styles.featureEyebrow}>
              <span>✦</span> FOR JOBSEEKERS
            </span>
            <h2 className={styles.featureHeadline}>Land roles tailored to your unique skills.</h2>
            <p className={styles.featureDesc}>
              Create your profile, upload your resume or browse directly to receive instant, AI-matched roles from top verified companies &mdash; all in minutes.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featurePillar}>
                <div className={styles.featureIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className={styles.featurePillarContent}>
                  <h3 className={styles.featurePillarTitle}>Instant AI Resume Matching</h3>
                  <p className={styles.featurePillarDesc}>Zero manual entry &mdash; intelligent parsing maps your capabilities directly to open positions.</p>
                </div>
              </div>

              <div className={styles.featurePillar}>
                <div className={styles.featureIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </div>
                <div className={styles.featurePillarContent}>
                  <h3 className={styles.featurePillarTitle}>100% Upfront Salary Transparency</h3>
                  <p className={styles.featurePillarDesc}>No guesswork. View exact compensation benchmarks, verified equity, and remote policies upfront.</p>
                </div>
              </div>

              <div className={styles.featurePillar}>
                <div className={styles.featureIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z" />
                  </svg>
                </div>
                <div className={styles.featurePillarContent}>
                  <h3 className={styles.featurePillarTitle}>Direct Hiring Manager Channels</h3>
                  <p className={styles.featurePillarDesc}>Skip application black holes and start conversations directly with vetted tech leaders.</p>
                </div>
              </div>
            </div>

            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              className={`${styles.btn} ${styles.btnPrimary}`}
              id="feature-find-jobs-btn"
            >
              <span>Find Jobs Now</span>
              <span className={styles.btnArrow}>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
