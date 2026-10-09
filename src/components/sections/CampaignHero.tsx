'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import type { AudienceType, CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import {
  Briefcase,
  FileText,
  Users,
  Send,
  Search,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

interface CampaignHeroProps {
  audience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  config: CampaignConfig;
  jobseekerMode?: JobseekerMode;
  onJobseekerModeChange?: (mode: JobseekerMode) => void;
  selectedResumeFile?: File | null;
  onSelectedResumeFileChange?: (file: File | null) => void;
  onUserInteracted?: () => void;
  onResumePromptOpen?: () => void;
}

export const CampaignHero: React.FC<CampaignHeroProps> = ({
  audience,
  onAudienceChange,
  config,
  onUserInteracted,
  onResumePromptOpen,
}) => {
  const isJobseeker = audience === 'jobseeker';

  // Search Form inputs
  const [roleInput, setRoleInput] = useState('');
  const [category, setCategory] = useState(
    config.searchPanel?.jobseeker?.inputs?.categoryOptions?.[0] || 'Category'
  );
  const [locationInput, setLocationInput] = useState('');

  // Preserve UTM and query parameters
  const getPreservedUrl = useCallback((targetPath: string): URL => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    try {
      const targetUrl = new URL(targetPath, base);
      if (typeof window !== 'undefined') {
        const currentUrl = new URL(window.location.href);
        const utmKeys = [
          'utm_source',
          'utm_medium',
          'utm_campaign',
          'utm_term',
          'utm_content',
          'campaignId',
        ];
        utmKeys.forEach((key) => {
          const val = currentUrl.searchParams.get(key);
          if (val && !targetUrl.searchParams.has(key)) {
            targetUrl.searchParams.set(key, val);
          }
        });
      }
      return targetUrl;
    } catch {
      return new URL(targetPath, 'http://localhost:3000');
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUserInteracted) onUserInteracted();

    const targetUrl = getPreservedUrl(config.searchPanel.jobseeker.searchHref);
    targetUrl.searchParams.set('audience', 'jobseeker');
    if (roleInput.trim()) targetUrl.searchParams.set('role', roleInput.trim());
    if (category && category !== 'Category') targetUrl.searchParams.set('category', category);
    if (locationInput.trim()) targetUrl.searchParams.set('location', locationInput.trim());

    window.location.href = targetUrl.toString();
  };

  const handleRecruiterSubmit = () => {
    if (onUserInteracted) onUserInteracted();

    const targetUrl = getPreservedUrl(config.searchPanel.recruiter.targetHref);
    targetUrl.searchParams.set('audience', 'recruiter');
    window.location.href = targetUrl.toString();
  };

  const handleAudienceSelect = (targetAudience: AudienceType) => {
    if (onUserInteracted) onUserInteracted();
    onAudienceChange(targetAudience);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('audience', targetAudience);
      window.history.pushState(null, '', url.toString());
    }
  };

  return (
    <section className="job10-hero-visual-section" id="hero" aria-label="Hero Overview">
      {/* Background layer with the two colleagues (left businesswoman, right businessman) */}
      <div className="job10-hero-visual-bg" aria-hidden="true">
        <Image
          src="/images/hero-clean-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="job10-hero-visual-bg-img"
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
        />
        {/* Soft center wash so interactive text remains crisp and highly legible */}
        <div className="job10-hero-visual-center-wash" />
      </div>

      {/* Floating badges & decorative connector lines matching reference image */}
      <div className="job10-hero-floating-decorations" aria-hidden="true">
        {/* Left connector curved line */}
        <svg className="job10-hero-decor-line job10-decor-line--left" viewBox="0 0 280 160" fill="none">
          <path
            d="M 260 140 C 180 130 110 90 40 40"
            stroke="#c7d2fe"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <circle cx="40" cy="40" r="4.5" fill="#3b82f6" />
          <circle cx="150" cy="110" r="4" fill="#6366f1" />
        </svg>

        {/* Top-left Briefcase Badge */}
        <div className="job10-floating-badge job10-floating-badge--briefcase">
          <div className="job10-badge-inner">
            <Briefcase size={22} className="job10-badge-icon" />
          </div>
        </div>

        {/* Mid-left Document Badge */}
        <div className="job10-floating-badge job10-floating-badge--document">
          <div className="job10-badge-inner">
            <FileText size={22} className="job10-badge-icon" />
          </div>
        </div>

        {/* Right connector curved line */}
        <svg className="job10-hero-decor-line job10-decor-line--right" viewBox="0 0 280 160" fill="none">
          <path
            d="M 20 140 C 100 130 170 90 240 40"
            stroke="#c7d2fe"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <circle cx="240" cy="40" r="4.5" fill="#6366f1" />
          <circle cx="130" cy="110" r="4" fill="#3b82f6" />
        </svg>

        {/* Top-right Team/Users Badge */}
        <div className="job10-floating-badge job10-floating-badge--team">
          <div className="job10-badge-inner">
            <Users size={22} className="job10-badge-icon" />
          </div>
        </div>

        {/* Mid-right Send/Paper Airplane Badge */}
        <div className="job10-floating-badge job10-floating-badge--send">
          <div className="job10-badge-inner">
            <Send size={22} className="job10-badge-icon" />
          </div>
        </div>
      </div>

      <div className="job10-hero-visual-content">
        {/* 1. Eyebrow: — A SIMPLER WAY TO GET HIRED — */}
        <div className="job10-hero-eyebrow-container">
          <span className="job10-hero-eyebrow-line" aria-hidden="true" />
          <span className="job10-hero-eyebrow-text">A SIMPLER WAY TO GET HIRED</span>
          <span className="job10-hero-eyebrow-line" aria-hidden="true" />
        </div>

        {/* 2. Headline with Clock Dial '10' and gradient 'minutes.' */}
        <h1 className="job10-hero-visual-h1">
          <span className="job10-h1-row">Your next opportunity</span>
          <span className="job10-h1-row job10-h1-row--dial">
            starts in{' '}
            <span className="job10-hero-clock-dial-wrap" aria-label="10 minutes">
              <svg
                className="job10-hero-clock-dial-svg"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-clock-dial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                {/* Dial base circle */}
                <circle cx="36" cy="36" r="32" stroke="#e0f2fe" strokeWidth="2.5" />
                {/* Dial gradient arc */}
                <circle
                  cx="36"
                  cy="36"
                  r="32"
                  stroke="url(#hero-clock-dial-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="201"
                  strokeDashoffset="45"
                  transform="rotate(-90 36 36)"
                />
                {/* 12 Hour Ticks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 36 + 25 * Math.sin(angle);
                  const y1 = 36 - 25 * Math.cos(angle);
                  const x2 = 36 + 29 * Math.sin(angle);
                  const y2 = 36 - 29 * Math.cos(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <span className="job10-clock-dial-num">10</span>
            </span>
            <span className="job10-h1-gradient-text">minutes.</span>
          </span>
        </h1>

        {/* 3. Subtext matching exact reference */}
        <p className="job10-hero-visual-subtext">
          Find the right opportunities, get matched with top companies and take the next step — all in one place.
        </p>

        {/* 4. Audience Toggle / CTA Pill Buttons */}
        <div className="job10-hero-cta-group" role="tablist" aria-label="Audience options">
          <button
            type="button"
            role="tab"
            id="hero-toggle-jobseeker"
            aria-selected={isJobseeker}
            aria-controls="hero-search-area"
            className={`job10-hero-pill-btn ${isJobseeker ? 'is-active-pill' : 'is-outline-pill'}`}
            onClick={() => handleAudienceSelect('jobseeker')}
          >
            <span>I'm Looking for a Job</span>
            <ArrowRight size={16} className="job10-pill-btn-arrow" />
          </button>

          <button
            type="button"
            role="tab"
            id="hero-toggle-recruiter"
            aria-selected={!isJobseeker}
            aria-controls="hero-search-area"
            className={`job10-hero-pill-btn ${!isJobseeker ? 'is-active-pill' : 'is-outline-pill'}`}
            onClick={() => handleAudienceSelect('recruiter')}
          >
            <span>I'm Hiring</span>
            <ArrowRight size={16} className="job10-pill-btn-arrow" />
          </button>
        </div>

        {/* 5. Search Section (added right below the buttons) */}
        <div className="job10-hero-search-container" id="hero-search-area">
          {isJobseeker ? (
            <div className="job10-hero-search-box-wrap">
              <form className="job10-hero-search-pill" onSubmit={handleSearchSubmit}>
                {/* Field 1: Job title */}
                <div className="job10-search-field job10-search-field--role">
                  <label htmlFor="hero-role-field" className="sr-only">
                    Job title, skill or keyword
                  </label>
                  <input
                    id="hero-role-field"
                    type="text"
                    className="job10-search-input"
                    placeholder="Job title, skill or keyword"
                    value={roleInput}
                    onChange={(e) => {
                      setRoleInput(e.target.value);
                      if (onUserInteracted) onUserInteracted();
                    }}
                  />
                </div>

                <div className="job10-search-divider" aria-hidden="true" />

                {/* Field 2: Category */}
                <div className="job10-search-field job10-search-field--category">
                  <label htmlFor="hero-category-field" className="sr-only">
                    Category
                  </label>
                  <select
                    id="hero-category-field"
                    className="job10-search-select"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (onUserInteracted) onUserInteracted();
                    }}
                  >
                    {config.searchPanel.jobseeker.inputs.categoryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="job10-search-divider" aria-hidden="true" />

                {/* Field 3: Location */}
                <div className="job10-search-field job10-search-field--location">
                  <label htmlFor="hero-location-field" className="sr-only">
                    Location
                  </label>
                  <input
                    id="hero-location-field"
                    type="text"
                    className="job10-search-input"
                    placeholder="Location"
                    value={locationInput}
                    onChange={(e) => {
                      setLocationInput(e.target.value);
                      if (onUserInteracted) onUserInteracted();
                    }}
                  />
                </div>

                {/* Search Button */}
                <button type="submit" className="job10-search-btn">
                  <span>Search Jobs →</span>
                </button>
              </form>

              {/* Quiet resume link */}
              <div className="job10-hero-resume-row">
                <button
                  type="button"
                  className="job10-hero-resume-link"
                  onClick={() => {
                    if (onUserInteracted) onUserInteracted();
                    if (onResumePromptOpen) onResumePromptOpen();
                  }}
                >
                  <FileText size={15} className="job10-resume-icon" aria-hidden="true" />
                  <span>Optional: upload your resume for AI matches</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="job10-hero-talent-card">
              <p className="job10-talent-text">
                Post a job and see matched candidates in one place.
              </p>
              <button
                type="button"
                className="job10-talent-btn"
                onClick={handleRecruiterSubmit}
              >
                <span>Go to Recruiter Dashboard →</span>
              </button>
            </div>
          )}
        </div>

        {/* 6. The 3-Step Process Card (exact design from image) */}
        <div className="job10-hero-steps-card" aria-label="How it works overview">
          {isJobseeker ? (
            <div className="job10-steps-card-grid">
              {/* Step 1 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--blue">
                  <Search size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 1</span>
                <h3 className="job10-step-title">Search Opportunities</h3>
                <p className="job10-step-desc">
                  Explore thousands of verified jobs across industries, locations and work types that match your skills and goals.
                </p>
              </div>

              <div className="job10-step-divider-dashed" aria-hidden="true" />

              {/* Step 2 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--purple">
                  <Bookmark size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 2</span>
                <h3 className="job10-step-title">Explore & Shortlist</h3>
                <p className="job10-step-desc">
                  View detailed job information, compare roles and save the ones that interest you.
                </p>
              </div>

              <div className="job10-step-divider-dashed" aria-hidden="true" />

              {/* Step 3 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--teal">
                  <Send size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 3</span>
                <h3 className="job10-step-title">Apply & Track</h3>
                <p className="job10-step-desc">
                  Apply in minutes and track your progress all in one place.
                </p>
              </div>
            </div>
          ) : (
            <div className="job10-steps-card-grid">
              {/* Recruiter Step 1 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--blue">
                  <Briefcase size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 1</span>
                <h3 className="job10-step-title">Post Requirements</h3>
                <p className="job10-step-desc">
                  Specify your role requirements and team culture in minutes.
                </p>
              </div>

              <div className="job10-step-divider-dashed" aria-hidden="true" />

              {/* Recruiter Step 2 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--purple">
                  <Users size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 2</span>
                <h3 className="job10-step-title">Review Matches</h3>
                <p className="job10-step-desc">
                  Instant access to verified candidates with relevant skills.
                </p>
              </div>

              <div className="job10-step-divider-dashed" aria-hidden="true" />

              {/* Recruiter Step 3 */}
              <div className="job10-step-col">
                <div className="job10-step-icon-wrap job10-step-icon--teal">
                  <Send size={22} className="job10-step-icon" />
                </div>
                <span className="job10-step-tag">STEP 3</span>
                <h3 className="job10-step-title">Hire Directly</h3>
                <p className="job10-step-desc">
                  Connect, schedule interviews, and make offers quickly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
