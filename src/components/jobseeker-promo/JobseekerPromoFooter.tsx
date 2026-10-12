'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFooter: React.FC = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image
              src="/images/job10-logo.png"
              alt="Job10"
              width={120}
              height={32}
              style={{ width: '120px', height: 'auto', display: 'block' }}
            />
            <p>
              Job10 is the modern career platform connecting ambitious professionals with verified tech companies through instant AI skill matching.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Jobseekers</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://job10-delta.vercel.app/?audience=jobseeker">Browse Jobs</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=jobseeker">Upload Resume</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=jobseeker">Salary Insights</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=jobseeker">Match Velocity</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Employers</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://job10-delta.vercel.app/?audience=employer">Hire Top Talent</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=employer">Pricing</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=employer">Enterprise Solutions</a></li>
              <li><a href="https://job10-delta.vercel.app/?audience=employer">Recruiter Portal</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">About Job10</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            Job10 &mdash; Talent Matches Faster. &copy; 2026 Job10 Platform Inc. All rights reserved.
          </div>
          <div className={styles.footerLegalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
