'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFooter: React.FC = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.footerSimple}>
          <a
            className={styles.footerSimpleBrand}
            href="https://job10-delta.vercel.app/"
            aria-label="Job10 Home"
          >
            <Image
              src="/images/job10-logo.png"
              alt="Job10 — Get an interview within 10 minutes!"
              width={180}
              height={48}
              style={{ width: '180px', height: 'auto', display: 'block' }}
            />
          </a>
          <p className={styles.footerSimpleDescription}>
            Job10 is an intelligent talent matching platform connecting top
            <br className={styles.footerDesktopBreak} /> companies with world-class professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
