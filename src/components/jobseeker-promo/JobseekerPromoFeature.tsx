'use client';

import React from 'react';
import Image from 'next/image';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFeature: React.FC = () => {
  const { feature, redirectUrls } = jobseekerPromoConfig;

  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <div className={styles.featureCard}>
          {/* Left Column: Image with Decorative Backdrop & Dot Matrix */}
          <div className={styles.featureImageCol}>
            <div className={styles.featureImageWrap}>
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                width={420}
                height={430}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
          </div>

          {/* Right Column: Copy & CTA */}
          <div className={styles.featureTextCol}>
            {/* Audience Badge Pill */}
            <div className={styles.featureBadge}>
              <span className={styles.featureBadgeIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#2b3bff" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <span>{feature.badge}</span>
            </div>

            {/* Headline */}
            <h2 className={styles.featureHeadline}>
              {feature.headline}
            </h2>

            {/* Description */}
            <p className={styles.featureDescription}>
              {feature.description}
            </p>

            {/* Action CTA Button */}
            <a
              href={redirectUrls.featureCta}
              className={styles.featureCtaBtn}
            >
              <span>{feature.ctaLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
