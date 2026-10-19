'use client';

import React from 'react';

export const JobseekerPromoHighlights: React.FC = () => {
  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        <div className="benefits-header">
          <h2>Why Choose Job10</h2>
        </div>

        <div className="benefits-grid">
          {/* Card 1: Faster matches */}
          <div className="benefit-card">
            <div className="benefit-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
            </div>
            <div className="benefit-title">Less searching. Faster matches.</div>
            <p className="benefit-desc">
              Get matched with relevant job opportunities.
            </p>
          </div>

          {/* Card 2: AI matching */}
          <div className="benefit-card">
            <div className="benefit-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm14-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2zM8 4h2v2H8V4zm5 0h2v2h-2V4zm-5 14h2v2H8v-2zm5 0h2v2h-2v-2zM7 7h10v10H7V7zm2 2v6h6V9H9z" />
              </svg>
            </div>
            <div className="benefit-title">AI-powered job matching.</div>
            <p className="benefit-desc">
              Job10 AI analyzes your resume to find roles that fit your profile.
            </p>
          </div>

          {/* Card 3: Verified openings */}
          <div className="benefit-card benefit-card-verified">
            <div className="benefit-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className="benefit-title">Real companies. Genuine openings.</div>
            <p className="benefit-desc">
              Discover opportunities from verified hiring companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
