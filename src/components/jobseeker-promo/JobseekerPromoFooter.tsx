'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFooter: React.FC = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.footerSimple}>
          <div className={styles.footerSimpleBrand}>
            <a href="#" aria-label="Job10 Home">
              <Image
                src="/images/job10-logo.png"
                alt="Job10"
                width={108}
                height={28}
                style={{ width: '108px', height: 'auto', display: 'block' }}
              />
            </a>
            <span className={styles.footerSimpleCopy}>&copy; 2026 Job10 Platform Inc. All rights reserved.</span>
          </div>
          <div className={styles.footerSimpleLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
