'use client';

import React from 'react';
import Image from 'next/image';

export const JobseekerPromoHero: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Live Content */}
          <div className="hero-content">
            <div className="badge">
              <span className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </span>
              AI-POWERED JOB MATCHING
            </div>

            <h1 className="hero-headline">
              Get an interview<br />
              <span style={{ whiteSpace: 'nowrap' }}>
                in <span className="highlight">10 minutes.</span>
              </span>
            </h1>

            <p className="hero-subhead">
              Skip the endless applications. Job10 matches your skills and experience with opportunities at verified companies, helping you get noticed by the right employers faster.
            </p>

            <div className="hero-actions">
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                className="btn btn-primary"
                id="hero-primary-cta"
              >
                <span>Explore Jobs</span>
                <span className="btn-arrow">&rarr;</span>
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="proof-avatars">
                <Image
                  src="/images/explore-man.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="proof-avatar"
                />
                <Image
                  src="/images/explore-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="proof-avatar"
                />
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="proof-avatar"
                />
              </div>
              <div className="proof-text">
                Matched <strong>15,000+ candidates</strong> with<br />top tier tech teams &middot; ★ 4.9/5
              </div>
            </div>
          </div>

          {/* Right Column: Professional Woman with Seamless Radial/Horizontal Fade */}
          <div className="hero-media-wrap">
            <Image
              src="/images/hero-woman-asset.jpg"
              alt="Professional woman discovering career opportunities"
              width={500}
              height={460}
              priority
              id="hero-faded-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
