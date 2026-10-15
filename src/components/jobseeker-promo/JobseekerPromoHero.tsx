'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHero: React.FC = () => {
  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column: Live Content */}
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </span>
              AI-POWERED JOB MATCHING
            </div>

            <h1 className={styles.heroHeadline}>
              Get an interview<br />
              <span style={{ whiteSpace: 'nowrap' }}>
                in <span className={styles.highlight}>10 minutes.</span>
              </span>
            </h1>

            <p className={styles.heroSubhead}>
              Skip the endless applications. Job10 matches your skills and experience with opportunities at verified companies, helping you get noticed by the right employers faster.
            </p>

            <div className={styles.heroActions}>
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="hero-primary-cta"
              >
                <span>Explore Jobs</span>
                <span className={styles.btnArrow}>&rarr;</span>
              </a>
            </div>

            <div className={styles.heroSocialProof}>
              <div className={styles.proofAvatars}>
                <Image
                  src="/images/explore-man.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className={styles.proofAvatar}
                />
                <Image
                  src="/images/explore-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className={styles.proofAvatar}
                />
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className={styles.proofAvatar}
                />
              </div>
              <div className={styles.proofText}>
                Matched <strong>15,000+ candidates</strong> with<br />top tier tech teams &middot; ★ 4.9/5
              </div>
            </div>
          </div>

          {/* Right Column: Professional Woman with Seamless Radial/Horizontal Fade */}
          <div className={styles.heroMediaWrap}>
            <Image
              src="/images/hero-woman-asset.jpg"
              alt="Professional woman discovering career opportunities"
              width={500}
              height={460}
              priority
              className={styles.heroMediaImg}
              id="hero-faded-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
