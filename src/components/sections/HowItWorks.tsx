'use client';

import React from 'react';
import { ArrowRight, Search, Bookmark, Send, FileText, Briefcase, Users } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="job10-hiw-section" id="how-it-works" aria-label="How It Works">
      <div className="container-fluid">
        {/* Main Card Container */}
        <div className="job10-hiw-card">
          <div className="job10-hiw-layout">
            
            {/* Left Column: Heading, Subtitle, CTA */}
            <div className="job10-hiw-content-col">
              <h2 className="job10-hiw-title">
                A simpler,
                <br />
                faster way to
                <br />
                <span className="job10-hiw-title-highlight">get hired.</span>
              </h2>

              <p className="job10-hiw-desc">
                From search to shortlist, Job10 helps you find the right opportunities and take the next step in just a few clicks.
              </p>

              <a href="/campaign/get-started?audience=jobseeker" className="job10-hiw-cta-btn">
                <span className="job10-hiw-cta-circle" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
                <span>Get Started</span>
              </a>
            </div>

            {/* Center Column: Interactive Visual Showcase with Photos and Floating Badges */}
            <div className="job10-hiw-visual-col" aria-hidden="true">
              {/* Soft decorative backdrop shapes */}
              <div className="job10-hiw-backdrop-purple" />
              <div className="job10-hiw-backdrop-blue" />

              {/* Decorative SVG dashed flight paths */}
              <svg className="job10-hiw-flight-paths" viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Arc looping towards top right paper plane and briefcase */}
                <path
                  d="M170 70 C220 50 290 55 330 95 C355 120 360 160 355 185"
                  stroke="#3b82f6"
                  strokeWidth="1.8"
                  strokeDasharray="5 5"
                />
                {/* Arc near bottom left badge */}
                <path
                  d="M30 310 C70 295 110 320 140 330"
                  stroke="#3b82f6"
                  strokeWidth="1.8"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* Top Floating Badge: 'Find roles that fit you' */}
              <div className="job10-hiw-badge job10-hiw-badge--top">
                <div className="job10-hiw-badge-icon job10-hiw-badge-icon--blue">
                  <FileText size={18} />
                </div>
                <div className="job10-hiw-badge-text">
                  <span>Find roles</span>
                  <span>that fit you</span>
                </div>
                {/* Accent tick rays */}
                <div className="job10-hiw-burst-rays">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="8" y1="2" x2="6" y2="7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                    <line x1="14" y1="3" x2="11" y2="7.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Floating Paper Plane Icon */}
              <div className="job10-hiw-floating-plane">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#2563eb" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
                </svg>
              </div>

              {/* Main Photo Card: Professional Woman with Laptop */}
              <div className="job10-hiw-photo-card job10-hiw-photo-card--woman">
                <img
                  src="/images/explore-woman.jpg"
                  alt=""
                  className="job10-hiw-photo-img"
                  loading="lazy"
                />
              </div>

              {/* Floating Briefcase Icon Card */}
              <div className="job10-hiw-floating-briefcase">
                <Briefcase size={18} color="#2563eb" />
              </div>

              {/* Bottom Floating Badge: 'Join top companies' */}
              <div className="job10-hiw-badge job10-hiw-badge--bottom">
                <div className="job10-hiw-badge-icon job10-hiw-badge-icon--purple">
                  <Users size={18} />
                </div>
                <div className="job10-hiw-badge-text">
                  <span>Join top</span>
                  <span>companies</span>
                </div>
              </div>

              {/* Secondary Photo Card: Smiling Engineer Man */}
              <div className="job10-hiw-photo-card job10-hiw-photo-card--man">
                <img
                  src="/images/explore-man.jpg"
                  alt=""
                  className="job10-hiw-photo-img"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
