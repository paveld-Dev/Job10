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
            <nav aria-label="Main Navigation">
              <ul className={styles.navLinks}>
                <li><a href="#benefits" className={styles.navLink}>How It Works</a></li>
                <li><a href="#jobseekers" className={styles.navLink}>For Jobseekers</a></li>
                <li><a href="#jobseekers" className={styles.navLink}>Browse Jobs</a></li>
                <li><a href="#cta" className={styles.navLink}>Get Started</a></li>
              </ul>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerPill}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#2b3bff" style={{ display: 'block' }} aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
              Talent Matches Faster
            </span>
            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ height: '40px', padding: '0 22px', fontSize: '13.5px' }}
              id="header-cta-btn"
            >
              Explore Jobs Now &rarr;
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
