'use client';

import React from 'react';
import type { AudienceCardData, AudienceType, JobseekerMode } from '@/config/campaign.types';
import { User, Users, ArrowRight } from 'lucide-react';

interface AudienceActionCardsProps {
  cards: AudienceCardData[];
  currentAudience: AudienceType;
  jobseekerMode: JobseekerMode;
  onSelectAudience: (aud: AudienceType) => void;
  onToggleJobseekerMode: () => void;
}

export const AudienceActionCards: React.FC<AudienceActionCardsProps> = ({
  cards,
  currentAudience,
  jobseekerMode,
  onSelectAudience,
  onToggleJobseekerMode,
}) => {
  return (
    <div className="job10-cards-row">
      {cards.map((card) => {
        const isJobseekerCard = card.audience === 'jobseeker';
        const isJobseekerAudienceActive = currentAudience === 'jobseeker';
        const isResumeActive = isJobseekerAudienceActive && jobseekerMode === 'with-resume';

        if (isJobseekerCard) {
          return (
            <div
              key={card.audience}
              role="button"
              tabIndex={0}
              aria-pressed={isResumeActive}
              aria-label="Optional: upload your resume to discover opportunities matched to your skills"
              className={`job10-audience-card jobseeker ${isResumeActive ? 'is-active-resume' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (!isJobseekerAudienceActive) {
                  onSelectAudience('jobseeker');
                }
                onToggleJobseekerMode();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!isJobseekerAudienceActive) {
                    onSelectAudience('jobseeker');
                  }
                  onToggleJobseekerMode();
                }
              }}
            >
              <div className="job10-card-body">
                <div className="job10-card-icon-bubble" aria-hidden="true">
                  <User size={19} />
                </div>
                <div className="job10-card-texts">
                  <h4 className="job10-card-title">{card.title}</h4>
                  <p className="job10-card-sub">{card.description}</p>
                </div>
              </div>
              <div className="job10-card-arrow" aria-hidden="true">
                <ArrowRight size={15} />
              </div>
            </div>
          );
        }

        // Recruiter card preserves its regular link and click behavior
        return (
          <a
            key={card.audience}
            href={card.ctaHref}
            className={`job10-audience-card ${card.audience}`}
            onClick={(e) => {
              if (currentAudience !== 'recruiter') {
                e.preventDefault();
                onSelectAudience('recruiter');
              }
            }}
          >
            <div className="job10-card-body">
              <div className="job10-card-icon-bubble" aria-hidden="true">
                <Users size={19} />
              </div>
              <div className="job10-card-texts">
                <h4 className="job10-card-title">{card.title}</h4>
                <p className="job10-card-sub">{card.description}</p>
              </div>
            </div>
            <div className="job10-card-arrow" aria-hidden="true">
              <ArrowRight size={15} />
            </div>
          </a>
        );
      })}
    </div>
  );
};
