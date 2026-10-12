'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.siteHeader} ${isScrolled ? styles.siteHeaderScrolled : ''}`} id="site-header">
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <a href="#" className={styles.headerLogo} aria-label="Job10 Home">
              <Image
                src="/images/job10-logo.png"
                alt="Job10"
                width={132}
                height={36}
                priority
                style={{ width: '132px', height: 'auto', display: 'block' }}
              />
            </a>
          </div>
          <nav aria-label="Main Navigation" className={styles.headerCenter}>
            <ul className={styles.navLinks}>
              <li><a href="#benefits" className={styles.navLink}>How It Works</a></li>
              <li><a href="#jobseekers" className={styles.navLink}>For Jobseekers</a></li>
              <li><a href="#jobseekers" className={styles.navLink}>Browse Jobs</a></li>
              <li><a href="#cta" className={styles.navLink}>Get Started</a></li>
            </ul>
          </nav>
          <div className={styles.headerRight}>
            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ height: '50px', padding: '0 28px', fontSize: '18px' }}
              id="header-cta-btn"
            >
              <span>Explore Jobs Now</span>
              <span className={styles.btnArrow}>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
