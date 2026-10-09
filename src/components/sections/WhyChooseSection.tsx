'use client';

import React from 'react';
import type { WhyChooseConfig } from '@/config/campaign.types';

interface WhyChooseSectionProps {
  config?: WhyChooseConfig;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ config }) => {
  const headlinePrefix = config?.headlinePrefix ?? 'Everything you need';
  const headlineHighlight = config?.headlineHighlight ?? 'to move forward.';
  const subheadline =
    config?.subheadline ??
    'A faster, smarter and simpler way to connect talent with opportunities — all in one place.';

  return (
    <section className="job10-why-section" id="why-choose" aria-label="Why Choose Job10">
      <div className="container-fluid">
        <div className="job10-why-wrapper">
          {/* Top Row: 3 Feature Items */}
          <div className="job10-why-row job10-why-row--top">
            {/* 1. Smarter Job Matches */}
            <div className="job10-why-item job10-why-item--top-left">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* File with Sparkle */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="4" width="20" height="26" rx="4" fill="#2563EB" />
                    <rect x="9" y="10" width="12" height="2.5" rx="1.25" fill="#FFFFFF" />
                    <rect x="9" y="15" width="12" height="2.5" rx="1.25" fill="#FFFFFF" />
                    <rect x="9" y="20" width="7" height="2.5" rx="1.25" fill="#FFFFFF" />
                    <path d="M26 4L27.2 7.2L30.4 8.4L27.2 9.6L26 12.8L24.8 9.6L21.6 8.4L24.8 7.2L26 4Z" fill="#A855F7" />
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--top-left" width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 35C35 35 55 10 80 10" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="80" cy="10" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Smarter Job Matches</h3>
                <p className="job10-why-item-desc">
                  Find roles that fit your skills, experience and goals.
                </p>
              </div>
            </div>

            {/* 2. Access Top Talent */}
            <div className="job10-why-item job10-why-item--top-center">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* Team of Users with Plus */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="12" r="5" fill="#2563EB" />
                    <path d="M5 26C5 21.5817 8.58172 18 13 18C17.4183 18 21 21.5817 21 26H5Z" fill="#2563EB" />
                    <circle cx="22" cy="11" r="3.5" fill="#60A5FA" />
                    <path d="M20 18C21.6 18 23 18.6 24 19.5C26 21 27 23.3 27 26H23C23 22.8 21.8 20 20 18Z" fill="#60A5FA" />
                    <circle cx="27" cy="8" r="4.5" fill="#A855F7" />
                    <path d="M27 6V10M25 8H29" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--top-center" width="70" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M15 10C35 10 50 30 55 45" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="15" cy="10" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Access Top Talent</h3>
                <p className="job10-why-item-desc">
                  Connect with qualified candidates faster.
                </p>
              </div>
            </div>

            {/* 3. Save Time */}
            <div className="job10-why-item job10-why-item--top-right">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* Purple Lightning Bolt */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4L7 19H17L15 30L27 15H17L19 4Z" fill="url(#why-bolt-grad)" />
                    <defs>
                      <linearGradient id="why-bolt-grad" x1="7" y1="4" x2="27" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#A855F7" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--top-right" width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 15C30 35 60 30 85 30" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="15" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Save Time</h3>
                <p className="job10-why-item-desc">
                  AI-powered matching reduces manual effort.
                </p>
              </div>
            </div>
          </div>

          {/* Center Hub: Headline & Subheadline */}
          <div className="job10-why-center-hub">
            <h2 className="job10-why-main-title">
              {headlinePrefix}{' '}
              <span className="job10-why-title-gradient">{headlineHighlight}</span>
            </h2>

            <p className="job10-why-subtitle">{subheadline}</p>
          </div>

          {/* Bottom Row: 3 Feature Items */}
          <div className="job10-why-row job10-why-row--bottom">
            {/* 4. Wide Range of Opportunities */}
            <div className="job10-why-item job10-why-item--bottom-left">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* Briefcase with Checkmark */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="10" width="24" height="17" rx="3.5" fill="#2563EB" />
                    <path d="M11 10V7C11 5.34315 12.3431 4 14 4H18C19.6569 4 21 5.34315 21 7V10" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="26" cy="22" r="5" fill="#A855F7" />
                    <path d="M23.5 22L25 23.5L28.5 20.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--bottom-left" width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 25C35 25 55 10 80 10" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="80" cy="10" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Wide Range of Opportunities</h3>
                <p className="job10-why-item-desc">
                  Explore jobs across industries and locations.
                </p>
              </div>
            </div>

            {/* 5. Grow Your Career */}
            <div className="job10-why-item job10-why-item--bottom-center">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* Growing Bar Chart */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="19" width="5.5" height="10" rx="2" fill="#2563EB" />
                    <rect x="14" y="13" width="5.5" height="16" rx="2" fill="#4F46E5" />
                    <rect x="22" y="7" width="5.5" height="22" rx="2" fill="#7C3AED" />
                    <circle cx="24.75" cy="5" r="2.5" fill="#A855F7" />
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--bottom-center" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 10C30 10 50 25 70 25" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="10" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Grow Your Career</h3>
                <p className="job10-why-item-desc">
                  Get insights, apply faster and track your progress.
                </p>
              </div>
            </div>

            {/* 6. Trusted by Employers */}
            <div className="job10-why-item job10-why-item--bottom-right">
              <div className="job10-why-icon-bubble-wrap">
                <div className="job10-why-icon-card" aria-hidden="true">
                  {/* Shield with Checkmark */}
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 4L7 8V16C7 23 11.5 28.5 17 30C22.5 28.5 27 23 27 16V8L17 4Z" fill="#2563EB" />
                    <path d="M12.5 16.5L15.5 19.5L21.5 13.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Connecting Curve */}
                <svg className="job10-why-curve job10-why-curve--bottom-right" width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 10C35 10 60 25 85 25" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="10" r="3" fill="#6366F1" />
                </svg>
              </div>
              <div className="job10-why-text-col">
                <h3 className="job10-why-item-title">Trusted by Employers</h3>
                <p className="job10-why-item-desc">
                  Join a platform used by leading companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
