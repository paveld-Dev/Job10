'use client';

import React from 'react';
import Image from 'next/image';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHero: React.FC = () => {
  const { hero, redirectUrls } = jobseekerPromoConfig;

  return (
    <section className={styles.heroSection}>
      {/* Background Image Layer */}
      <div className={styles.heroBgImageWrap}>
        <Image
          src={hero.bgImage}
          alt="Job10 Opportunities Background"
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImage}
        />
      </div>

      {/* Readable Radial Overlay */}
      <div className={styles.heroOverlay} />

      {/* Hero Content Stack */}
      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Eyebrow */}
          <div className={styles.heroEyebrowWrap}>
            <span className={styles.heroEyebrowLine} />
            <span className={styles.heroEyebrowText}>{hero.eyebrow}</span>
            <span className={styles.heroEyebrowLine} />
          </div>

          {/* Headline */}
          <h1 className={styles.heroHeadline}>
            <span>{hero.titleLine1}</span>
            <span className={styles.heroHeadlineRow}>
              <span>starts in</span>
              {/* 10-Minute Clock Dial Icon */}
              <span className={styles.heroClockDial} style={{ position: 'relative', width: '58px', height: '58px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  aria-hidden="true"
                >
                  <line x1="24" y1="2" x2="24" y2="4.5" stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
                  <line x1="43.5" y1="24" x2="46" y2="24" stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
                  <line x1="24" y1="43.5" x2="24" y2="46" stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
                  <line x1="2" y1="24" x2="4.5" y2="24" stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#2B3BFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="125"
                    strokeDashoffset="18"
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <span style={{ position: 'relative', zIndex: 2, fontSize: '26px', fontWeight: 800, color: '#0b1a3c', lineHeight: 1 }}>
                  10
                </span>
              </span>
              <span>minutes.</span>
            </span>
          </h1>

          {/* Description */}
          <p className={styles.heroDescription}>
            {hero.description}
          </p>

          {/* Prominent CTA Button */}
          <a
            href={redirectUrls.heroCta}
            className={styles.heroCtaBtn}
          >
            <span>{hero.ctaLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
