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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </span>
              Talent Matches Faster
            </div>

            <h1 className={styles.heroHeadline}>
              Your next<br />
              career move<br />
              starts in<br />
              <span className={styles.highlight}>
                <span className={styles.highlightUnderline}>10</span> minutes.
              </span>
            </h1>

            <p className={styles.heroSubhead}>
              Skip application black holes. Job10 connects you directly with top verified companies through intelligent AI skill matching &mdash; so you can take the next step in your career in just 10 minutes.
            </p>

            <div className={styles.heroActions}>
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="hero-primary-cta"
              >
                Explore Jobs Now &rarr;
              </a>
              <a
                href="#benefits"
                className={`${styles.btn} ${styles.btnOutline}`}
                id="hero-secondary-cta"
              >
                How It Works
              </a>
            </div>

            <div className={styles.heroSocialProof}>
              <div className={styles.proofAvatars}>
                <Image
                  src="/images/explore-man.jpg"
                  alt="Candidate"
                  width={32}
                  height={32}
                  className={styles.proofAvatar}
                />
                <Image
                  src="/images/explore-woman.jpg"
                  alt="Candidate"
                  width={32}
                  height={32}
                  className={styles.proofAvatar}
                />
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Candidate"
                  width={32}
                  height={32}
                  className={styles.proofAvatar}
                />
              </div>
              <div className={styles.proofText}>
                Matched <strong>15,000+ candidates</strong> with top tier tech teams &middot; ★ 4.9/5
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Soft Seamless Fade */}
          <div className={styles.heroMediaWrap}>
            <Image
              src="/images/hero-woman-asset.jpg"
              alt="Professional woman discovering career opportunities"
              width={480}
              height={440}
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
