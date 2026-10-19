'use client';

import React from 'react';

export const JobseekerPromoFinalCTA: React.FC = () => {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-card-inner">
            <div className="cta-content">
              <h2 className="cta-headline">Your next opportunity could be one click away.</h2>
              <p className="cta-desc">
                Join thousands of professionals finding matched roles and advancing their careers faster today.
              </p>
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                className="btn btn-white"
                id="final-cta-btn"
              >
                Find My Match &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
