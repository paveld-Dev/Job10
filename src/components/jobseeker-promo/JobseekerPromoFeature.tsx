'use client';

import React from 'react';
import styles from './jobseekerPromo.module.css';

export const JobseekerPromoFeature: React.FC = () => {
  return (
    <section className={`${styles.featureSection} ${styles.popularOpenings}`} id="jobseekers" aria-labelledby="popular-openings-title">
      <div className={styles.container}>
        <div className={styles.openingsTop}>
          <div>
            <h2 id="popular-openings-title">Popular Job Openings</h2>
            <p className={styles.openingsIntro}>
              Explore roles across in-demand fields and discover opportunities that match your skills and experience.
            </p>
          </div>
        </div>
        <div className={styles.openingsList} aria-label="Example job categories">
          <article className={styles.openingRow}>
            <div className={styles.openingSymbol} aria-hidden="true">01</div>
            <div className={styles.openingInfo}>
              <h3>Software Developer</h3>
              <p>Engineering <span aria-hidden="true">·</span> Explore matching opportunities</p>
            </div>
            <a
              className={styles.openingLink}
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              aria-label="Explore Software Developer opportunities"
            >
              Explore roles <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className={styles.openingRow}>
            <div className={styles.openingSymbol} aria-hidden="true">02</div>
            <div className={styles.openingInfo}>
              <h3>UI/UX Designer</h3>
              <p>Design <span aria-hidden="true">·</span> Explore matching opportunities</p>
            </div>
            <a
              className={styles.openingLink}
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              aria-label="Explore UI/UX Designer opportunities"
            >
              Explore roles <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className={styles.openingRow}>
            <div className={styles.openingSymbol} aria-hidden="true">03</div>
            <div className={styles.openingInfo}>
              <h3>Project Manager</h3>
              <p>Operations <span aria-hidden="true">·</span> Explore matching opportunities</p>
            </div>
            <a
              className={styles.openingLink}
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              aria-label="Explore Project Manager opportunities"
            >
              Explore roles <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className={styles.openingRow}>
            <div className={styles.openingSymbol} aria-hidden="true">04</div>
            <div className={styles.openingInfo}>
              <h3>Data Analyst</h3>
              <p>Analytics <span aria-hidden="true">·</span> Explore matching opportunities</p>
            </div>
            <a
              className={styles.openingLink}
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              aria-label="Explore Data Analyst opportunities"
            >
              Explore roles <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
        <div className={styles.openingsBottom}>
          <span className={styles.openingsNote}>Example roles · Live opportunities are available on Job10.</span>
          <a className={`${styles.btn} ${styles.btnPrimary} ${styles.openingsCta}`} href="https://job10-delta.vercel.app/?audience=jobseeker">
            View More Openings <span className={styles.btnArrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
