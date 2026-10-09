'use client';

import React from 'react';
import type { AudienceType, FeatureItem } from '@/config/campaign.types';
import { Globe, Zap, Users, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  audience?: AudienceType;
  features?: {
    headline: string;
    subheadline: string;
    jobseeker: FeatureItem[];
    recruiter: FeatureItem[];
  };
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  audience = 'jobseeker',
}) => {
  const isJobseeker = audience === 'jobseeker';

  return (
    <section className="job10-opportunities-section" id="benefits" aria-label="Top Opportunities Worldwide">
      <div className="container-fluid">
        <div className="job10-opportunities-layout">
          {/* Left Column: Title + Desc + Feature Badges + CTA */}
          <div className="job10-opportunities-content">
            <h2 className="job10-opportunities-title">
              {isJobseeker
                ? 'Reach Top Opportunities Worldwide'
                : 'Hire Top Talent Worldwide Fast'}
            </h2>

            <p className="job10-opportunities-desc">
              {isJobseeker
                ? 'Explore thousands of roles from top companies, get personalized matches, and take the next step in your career with confidence.'
                : 'Connect with thousands of verified professionals, get AI-powered candidate matches, and scale your dream team with confidence.'}
            </p>

            {/* Feature Pills Row */}
            <div className="job10-opportunities-pills-row">
              <div className="job10-feature-badge-pill">
                <div className="job10-badge-icon-bubble" aria-hidden="true">
                  <Globe size={18} />
                </div>
                <span className="job10-badge-label">Global Reach</span>
              </div>

              <div className="job10-feature-badge-pill">
                <div className="job10-badge-icon-bubble" aria-hidden="true">
                  <Zap size={18} />
                </div>
                <span className="job10-badge-label">Easy & Fast Search</span>
              </div>

              <div className="job10-feature-badge-pill">
                <div className="job10-badge-icon-bubble" aria-hidden="true">
                  <Users size={18} />
                </div>
                <span className="job10-badge-label">Personalized Matches</span>
              </div>
            </div>

            {/* Dark Navy CTA Button */}
            <div className="job10-opportunities-cta-wrap">
              <a
                href={isJobseeker ? '/campaign/get-started?audience=jobseeker#action-panel' : '/campaign/get-started?audience=recruiter#action-panel'}
                className="job10-btn-navy-pill"
              >
                <span>{isJobseeker ? 'Find a Job' : 'Post a Job'}</span>
                <ArrowRight size={16} className="job10-btn-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Photographic Showcase Graphic with Floating Cards */}
          <div className="job10-opportunities-visual-wrap">
            <div className="job10-opportunities-showcase-card">
              <img
                src="/images/modern-remote.png"
                alt="Modern Remote — Professional connecting with top job opportunities worldwide on Job10"
                className="job10-opportunities-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
