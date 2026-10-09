'use client';

import React, { useState } from 'react';
import { Briefcase, Clock, DollarSign, MapPin, Bookmark } from 'lucide-react';

export interface RecentJobItem {
  id: string;
  title: string;
  company: string;
  timeAgo: string;
  category: string;
  type: string;
  salary: string;
  location: string;
  logoType: 'spiral' | 'tri-blade' | 'flower' | 'swirl' | 'plaid';
}

const RECENT_JOBS: RecentJobItem[] = [
  {
    id: 'job-1',
    title: 'Forward Security Director',
    company: 'Bauch, Schuppe and Schulist Co',
    timeAgo: '10 min ago',
    category: 'Hotels & Tourism',
    type: 'Full time',
    salary: '$40000-$42000',
    location: 'New-York, USA',
    logoType: 'spiral',
  },
  {
    id: 'job-2',
    title: 'Regional Creative Facilitator',
    company: 'Wisoik - Becker Co',
    timeAgo: '12 min ago',
    category: 'Media',
    type: 'Part time',
    salary: '$28000-$32000',
    location: 'Los-Angeles, USA',
    logoType: 'tri-blade',
  },
  {
    id: 'job-3',
    title: 'Internal Integration Planner',
    company: 'Mraz, Quigley and Feest Inc.',
    timeAgo: '15 min ago',
    category: 'Construction',
    type: 'Full time',
    salary: '$48000-$50000',
    location: 'Texas, USA',
    logoType: 'flower',
  },
  {
    id: 'job-4',
    title: 'District Intranet Director',
    company: 'VonRueden - Weber Co',
    timeAgo: '24 min ago',
    category: 'Commerce',
    type: 'Full time',
    salary: '$42000-$48000',
    location: 'Florida, USA',
    logoType: 'swirl',
  },
  {
    id: 'job-5',
    title: 'Corporate Tactics Facilitator',
    company: 'Cormier, Turner and Flatley Inc',
    timeAgo: '26 min ago',
    category: 'Commerce',
    type: 'Full time',
    salary: '$38000-$40000',
    location: 'Boston, USA',
    logoType: 'plaid',
  },
];

// SVG Logo renderers matching the exact logo designs from reference image
const CompanyLogo: React.FC<{ type: RecentJobItem['logoType'] }> = ({ type }) => {
  switch (type) {
    case 'spiral':
      return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="#f8fafc" />
          <path d="M12 21 C12 15 16 11 21 11 C26 11 30 15 30 21" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 23 C14 27 17 30 21 30 C25 30 28 27 28 23" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 21 C16 18 18 16 21 16 C24 16 26 18 26 21" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 22 C18 24 19 25 21 25 C23 25 24 24 24 22" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'tri-blade':
      return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="#f8fafc" />
          <path d="M21 12 C25 12 27 16 24 19 C21 22 17 21 18 16 C19 13 20 12 21 12 Z" fill="#f97316" />
          <path d="M28 25 C26 28 22 28 20 25 C18 22 20 18 25 18 C28 18 29 22 28 25 Z" fill="#2563eb" />
          <path d="M14 24 C13 20 16 18 19 20 C22 22 21 26 17 27 C15 27 14 26 14 24 Z" fill="#10b981" />
        </svg>
      );
    case 'flower':
      return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="#f8fafc" />
          <rect x="13" y="13" width="7" height="7" rx="2" fill="#ec4899" />
          <rect x="22" y="13" width="7" height="7" rx="2" fill="#06b6d4" />
          <rect x="13" y="22" width="7" height="7" rx="2" fill="#f59e0b" />
          <rect x="22" y="22" width="7" height="7" rx="2" fill="#3b82f6" />
        </svg>
      );
    case 'swirl':
      return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="#f8fafc" />
          <path d="M13 18 C15 13 21 11 26 13 C31 15 32 21 30 26 C28 31 22 32 17 30 C13 28 11 23 13 18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 21 C18 18 21 17 24 18 C27 19 27 22 26 24 C25 26 22 27 20 26" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'plaid':
      return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="#f8fafc" />
          <rect x="13" y="13" width="16" height="16" rx="4" stroke="#10b981" strokeWidth="2" fill="none" />
          <circle cx="21" cy="21" r="4" fill="#8b5cf6" />
          <line x1="13" y1="21" x2="29" y2="21" stroke="#f97316" strokeWidth="1.5" />
          <line x1="21" y1="13" x2="21" y2="29" stroke="#f97316" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
};

export const RecentJobsSection: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setSavedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="job10-recent-jobs-section" id="recent-jobs" aria-label="Recent Jobs Available">
      <div className="job10-section-container">
        {/* Section Header */}
        <div className="job10-recent-jobs-header">
          <div className="job10-recent-jobs-header-left">
            <h2 className="job10-recent-jobs-title">Recent Jobs Available</h2>
            <p className="job10-recent-jobs-subtitle">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet...
            </p>
          </div>
          <a href="/campaign/get-started?audience=jobseeker#categories" className="job10-recent-jobs-view-all">
            View all
          </a>
        </div>

        {/* Jobs List */}
        <div className="job10-recent-jobs-list">
          {RECENT_JOBS.map((job) => {
            const isSaved = !!savedJobs[job.id];
            return (
              <div key={job.id} className="job10-recent-job-card">
                {/* Top Row: Time Ago Tag on left, Bookmark on right */}
                <div className="job10-job-card-top-row">
                  <span className="job10-job-time-badge">{job.timeAgo}</span>
                  <button
                    type="button"
                    className={`job10-job-bookmark-btn ${isSaved ? 'is-bookmarked' : ''}`}
                    onClick={() => toggleBookmark(job.id)}
                    aria-label={`Bookmark ${job.title}`}
                  >
                    <Bookmark size={17} className="job10-bookmark-icon" />
                  </button>
                </div>

                {/* Main Row: Logo, Title & Company */}
                <div className="job10-job-card-main-row">
                  <div className="job10-job-logo-wrap">
                    <CompanyLogo type={job.logoType} />
                  </div>
                  <div className="job10-job-info-wrap">
                    <h3 className="job10-job-title">{job.title}</h3>
                    <p className="job10-job-company">{job.company}</p>
                  </div>
                </div>

                {/* Bottom Row: Metadata Tags and Action Button */}
                <div className="job10-job-card-bottom-row">
                  <div className="job10-job-meta-group">
                    <div className="job10-job-meta-item">
                      <Briefcase size={15} className="job10-job-meta-icon" />
                      <span>{job.category}</span>
                    </div>

                    <div className="job10-job-meta-item">
                      <Clock size={15} className="job10-job-meta-icon" />
                      <span>{job.type}</span>
                    </div>

                    <div className="job10-job-meta-item">
                      <DollarSign size={15} className="job10-job-meta-icon" />
                      <span>{job.salary}</span>
                    </div>

                    <div className="job10-job-meta-item">
                      <MapPin size={15} className="job10-job-meta-icon" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <a
                    href={`/campaign/get-started?audience=jobseeker&role=${encodeURIComponent(job.title)}`}
                    className="job10-job-details-btn"
                  >
                    <span>Job Details</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
