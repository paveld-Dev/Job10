import React from 'react';
import type { CampaignConfig } from '@/config/campaign.types';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  config: CampaignConfig['finalCta'];
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config }) => {
  const cleanJobseekerLabel = config.jobseekerCta.label.replace(/\s*→\s*$/, '');
  const cleanRecruiterLabel = config.recruiterCta.label.replace(/\s*→\s*$/, '');

  return (
    <section className="job10-final-cta" id="get-started">
      <div className="container-fluid">
        <div className="job10-cta-box">
          <h2 className="job10-cta-headline">{config.headline}</h2>
          <p className="job10-cta-sub">{config.subheadline}</p>

          <div className="job10-cta-buttons">
            <a href={config.jobseekerCta.href} className="job10-btn-white-solid">
              <span>{cleanJobseekerLabel}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a href={config.recruiterCta.href} className="job10-btn-outline-navy">
              <span>{cleanRecruiterLabel}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="job10-trust-text">
            <span>{config.trustBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
