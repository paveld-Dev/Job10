'use client';

import React from 'react';
import Image from 'next/image';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHeader: React.FC = () => {
  const { header, redirectUrls } = jobseekerPromoConfig;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Left: Job10 Logo */}
          <a
            href={redirectUrls.headerCta}
            className={styles.logoLink}
            aria-label="Job10 Home"
          >
            <Image
              src={header.logoSrc}
              alt={header.logoAlt}
              width={128}
              height={34}
              priority
              style={{ objectFit: 'contain' }}
            />
          </a>

          {/* Right: Single Get Started Button */}
          <a
            href={redirectUrls.headerCta}
            className={styles.headerCtaBtn}
          >
            {header.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
};
