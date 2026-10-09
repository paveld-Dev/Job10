'use client';

import React from 'react';
import { Monitor, Code2, HeartPulse, BarChart3, Megaphone, Users, ArrowRight } from 'lucide-react';

interface CategoryBrowseProps {
  categories?: { label: string; href: string }[];
}

interface CategoryCardItem {
  id: string;
  title: string;
  count: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  highlight?: boolean;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'technology',
    title: 'Technology',
    count: '12,450 jobs available',
    icon: Monitor,
    href: '/campaign/get-started?audience=jobseeker&category=technology',
    highlight: true,
  },
  {
    id: 'engineering',
    title: 'Engineering',
    count: '8,230 jobs available',
    icon: Code2,
    href: '/campaign/get-started?audience=jobseeker&category=engineering',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    count: '6,780 jobs available',
    icon: HeartPulse,
    href: '/campaign/get-started?audience=jobseeker&category=healthcare',
  },
  {
    id: 'finance',
    title: 'Finance',
    count: '5,340 jobs available',
    icon: BarChart3,
    href: '/campaign/get-started?audience=jobseeker&category=finance',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    count: '4,910 jobs available',
    icon: Megaphone,
    href: '/campaign/get-started?audience=jobseeker&category=marketing',
  },
  {
    id: 'human-resource',
    title: 'Human Resource',
    count: '3,120 jobs available',
    icon: Users,
    href: '/campaign/get-started?audience=jobseeker&category=human-resource',
  },
];

export const CategoryBrowse: React.FC<CategoryBrowseProps> = () => {
  return (
    <section className="job10-explore-section" id="categories" aria-label="Explore Opportunities">
      <div className="container-fluid">
        {/* Top: 2-column layout (Text left, 6 cards right) */}
        <div className="job10-explore-layout">
          {/* Left Column: Heading + Subtitle */}
          <div className="job10-explore-header-col">
            <h2 className="job10-explore-title">
              Explore Your Career
              <br />
              Path And Discover{' '}
              <span className="job10-explore-title-highlight">Opportunities</span>
            </h2>

            <p className="job10-explore-desc">
              Whether you&apos;re looking to take the next step in your career or build a high-performing team, Job10 makes it simple and fast.
            </p>

            {/* Custom Interactive Talent Matching Showcase Collage (Created with real components) */}
            <div className="job10-explore-collage" aria-label="Talent matching showcase">
              {/* Decorative Soft Backdrop Blocks */}
              <div className="job10-collage-backdrop-purple" aria-hidden="true" />
              <div className="job10-collage-backdrop-blue" aria-hidden="true" />

              {/* Main Card: Professional Woman with Laptop */}
              <div className="job10-collage-card job10-collage-card--woman">
                <img
                  src="/images/explore-woman.jpg"
                  alt="Professional woman collaborating with laptop"
                  className="job10-collage-card-img"
                  loading="lazy"
                />
              </div>

              {/* Floating Top-Right Badge: 'Get matched with top companies' + celebratory burst */}
              <div className="job10-collage-badge-wrap">
                <div className="job10-collage-badge">
                  <div className="job10-collage-badge-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="9" r="4.5" stroke="#2563EB" strokeWidth="2.2" />
                      <path d="M3 23C3 19.134 6.134 16 10 16C13.866 16 17 19.134 17 23" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="19.5" cy="10" r="3.2" stroke="#2563EB" strokeWidth="2" strokeDasharray="1 0" />
                      <path d="M17.5 17.5C19.5 17.8 21.5 19 22.5 21" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="job10-collage-badge-text">
                    <span className="job10-collage-badge-title">Get matched</span>
                    <span className="job10-collage-badge-sub">with top companies</span>
                  </div>
                </div>
                {/* Celebratory burst rays */}
                <div className="job10-collage-burst" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="13" y1="2" x2="13" y2="7" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="21" y1="5" x2="17.5" y2="9.5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="24" y1="13" x2="19" y2="13" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Bottom Right Card: Smiling Professional Man */}
              <div className="job10-collage-card job10-collage-card--man">
                <img
                  src="/images/explore-man.jpg"
                  alt="Professional engineer smiling in office"
                  className="job10-collage-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 6 Category Cards Grid */}
          <div className="job10-category-cards-grid">
            {CATEGORY_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <a
                  key={card.id}
                  href={card.href}
                  className={`job10-cat-card ${card.highlight ? 'is-highlighted' : ''}`}
                >
                  <div className="job10-cat-card-icon-wrap" aria-hidden="true">
                    <IconComponent size={22} className="job10-cat-card-icon" />
                  </div>
                  <div className="job10-cat-card-body">
                    <h3 className="job10-cat-card-title">{card.title}</h3>
                    <div className="job10-cat-card-footer">
                      <span className="job10-cat-card-count">{card.count}</span>
                      <ArrowRight size={14} className="job10-cat-card-arrow" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom of Explore Section: Trusted by Leading Companies Banner */}
        <div className="job10-trusted-companies-box" aria-label="Trusted by leading companies">
          <p className="job10-trusted-label">Trusted by leading companies</p>
          <div className="job10-trusted-logos-row">
            {/* Google */}
            <div className="job10-company-logo job10-company-logo--google" title="Google">
              <svg width="96" height="32" viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="24" fontWeight="600" fill="#475569" letterSpacing="-0.5px">Google</text>
              </svg>
            </div>

            {/* Microsoft */}
            <div className="job10-company-logo job10-company-logo--microsoft" title="Microsoft">
              <svg width="124" height="26" viewBox="0 0 124 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="4" width="7" height="7" fill="#475569" />
                <rect x="9" y="4" width="7" height="7" fill="#475569" />
                <rect x="0" y="13" width="7" height="7" fill="#475569" />
                <rect x="9" y="13" width="7" height="7" fill="#475569" />
                <text x="22" y="18" fontFamily="Segoe UI, Inter, sans-serif" fontSize="16" fontWeight="600" fill="#475569" letterSpacing="-0.2px">Microsoft</text>
              </svg>
            </div>

            {/* Amazon */}
            <div className="job10-company-logo job10-company-logo--amazon" title="Amazon">
              <svg width="105" height="28" viewBox="0 0 105 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#475569" letterSpacing="-0.6px">amazon</text>
                <path d="M12 24C32 28 62 27 78 21" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M74 19L80 21L76 25" fill="#475569" />
              </svg>
            </div>

            {/* Meta */}
            <div className="job10-company-logo job10-company-logo--meta" title="Meta">
              <svg width="98" height="26" viewBox="0 0 98 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 16C5 13 4 8 8 6C11 4 14 8 16 12C18 8 21 4 24 6C28 8 27 13 25 16C23 18 20 18 18 14C16 11 15 11 14 14C12 18 9 18 7 16Z" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="32" y="18" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#475569" letterSpacing="-0.3px">Meta</text>
              </svg>
            </div>

            {/* Deloitte */}
            <div className="job10-company-logo job10-company-logo--deloitte" title="Deloitte">
              <svg width="96" height="26" viewBox="0 0 96 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#475569" letterSpacing="-0.2px">Deloitte<tspan fill="#10b981">.</tspan></text>
              </svg>
            </div>

            {/* IBM */}
            <div className="job10-company-logo job10-company-logo--ibm" title="IBM">
              <svg width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="19" fontFamily="Courier New, monospace" fontSize="22" fontWeight="900" fill="#475569" letterSpacing="2px">IBM</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
