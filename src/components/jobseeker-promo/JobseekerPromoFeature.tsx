'use client';

import React from 'react';
import Image from 'next/image';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFeature: React.FC = () => {
  return (
    <section className={styles.featureSection} id="jobseekers">
      <div className={styles.container}>
        <div className={styles.featureGrid3Col}>
          {/* Left Column: Headline, Summary & Cards */}
          <div className={styles.featureColLeft}>
            <div className={styles.featureLeftTop}>
              <h2 className={styles.featureHeadline}>Collaborate to Build The Innovative Tech Ecosystem</h2>
              <p className={styles.featureDesc}>
                Create a high-impact collaborative environment where leading tech talent and innovative organizations connect, build, and scale together seamlessly.
              </p>
            </div>

            <div className={styles.featureCardsWrap}>
              <div className={styles.featurePillCard}>
                <div className={styles.featurePillIcon} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
                <div className={styles.featurePillBody}>
                  <h3 className={styles.featurePillTitle}>Panel With Expert Developers</h3>
                  <p className={styles.featurePillDesc}>Direct access to vetted engineering leads and technical advisors.</p>
                </div>
              </div>

              <div className={styles.featurePillCard}>
                <div className={styles.featurePillIcon} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </div>
                <div className={styles.featurePillBody}>
                  <h3 className={styles.featurePillTitle}>Focusing On Revenue</h3>
                  <p className={styles.featurePillDesc}>Accelerate business value and high-velocity product delivery.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Large Portrait Photo */}
          <div className={styles.featureColCenter}>
            <Image
              src="/images/collaborate-team.jpg"
              alt="Three confident business professionals in navy suits standing in modern glass office"
              width={480}
              height={640}
              className={styles.featureCenterImg}
            />
          </div>

          {/* Right Column: Header, Link & Office Photo */}
          <div className={styles.featureColRight}>
            <div className={styles.featureRightTop}>
              <h3 className={styles.featureRightTitle}>Collaboration Is the Key of Success</h3>
              <p className={styles.featureRightDesc}>Direct connection with verified technical leaders driving high-impact growth.</p>
              <a href="https://job10-delta.vercel.app/?audience=jobseeker" className={styles.featureMoreBtn} id="feature-more-btn">
                <span>More About Us</span>
                <span className={styles.btnArrow}>&rarr;</span>
              </a>
            </div>
            <div className={styles.featureRightImgWrap}>
              <Image
                src="/images/collaborate-office.jpg"
                alt="Two employees at desk with monitors showing charts"
                width={360}
                height={360}
                className={styles.featureRightImg}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
