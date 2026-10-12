'use client';

import React from 'react';
import Image from 'next/image';
import { jobseekerPromoConfig } from '@/config/jobseekerPromo.config';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFooter: React.FC = () => {
  const { footer, redirectUrls } = jobseekerPromoConfig;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          {/* Logo */}
          <a
            href={redirectUrls.base}
            className={styles.footerLogoLink}
            aria-label="Job10 Home"
          >
            <Image
              src={footer.logoSrc}
              alt={footer.logoAlt}
              width={112}
              height={30}
              style={{ objectFit: 'contain' }}
            />
          </a>

          {/* Links */}
          <nav className={styles.footerLinksNav} aria-label="Footer Navigation">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.footerLink}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className={styles.footerCopyright}>
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
