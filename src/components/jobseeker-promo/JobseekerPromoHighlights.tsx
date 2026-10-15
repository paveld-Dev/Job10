'use client';

import React from 'react';

export const JobseekerPromoHighlights: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white" id="benefits">
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        <div className="text-center max-w-none mx-auto mb-10 md:mb-12 lg:mb-14">
          <h2 className="text-[clamp(34px,3.5vw,46px)] font-extrabold leading-[1.14] tracking-[-0.035em] text-[#0b1a3c] m-0">
            Why Choose Job10
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Card 1: Faster matches */}
          <div className="group bg-[#f8fafc] hover:bg-white rounded-[20px] p-9 sm:p-11 text-center transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-transparent hover:border-slate-200">
            <div className="w-[60px] h-[60px] rounded-full bg-[#eff2ff] text-[#2b3bff] inline-flex items-center justify-center mb-5.5 transition-transform duration-200 group-hover:scale-108 mx-auto">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
            </div>
            <div className="text-[clamp(14px,1.4vw,18px)] font-extrabold text-[#0b1a3c] mb-2 tracking-[-0.035em] whitespace-nowrap">
              Less searching. Faster matches.
            </div>
            <p className="text-lg leading-[1.65] text-slate-500 m-0">
              Get matched with relevant job opportunities.
            </p>
          </div>

          {/* Card 2: AI matching */}
          <div className="group bg-[#f8fafc] hover:bg-white rounded-[20px] p-9 sm:p-11 text-center transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-transparent hover:border-slate-200">
            <div className="w-[60px] h-[60px] rounded-full bg-[#eff2ff] text-[#2b3bff] inline-flex items-center justify-center mb-5.5 transition-transform duration-200 group-hover:scale-108 mx-auto">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm14-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2zM8 4h2v2H8V4zm5 0h2v2h-2V4zm-5 14h2v2H8v-2zm5 0h2v2h-2v-2zM7 7h10v10H7V7zm2 2v6h6V9H9z" />
              </svg>
            </div>
            <div className="text-[clamp(14px,1.4vw,18px)] font-extrabold text-[#0b1a3c] mb-2 tracking-[-0.035em] whitespace-nowrap">
              AI-powered job matching.
            </div>
            <p className="text-lg leading-[1.65] text-slate-500 m-0">
              Job10 AI analyzes your resume to find roles that fit your profile.
            </p>
          </div>

          {/* Card 3: Verified openings */}
          <div className="group bg-[#f8fafc] hover:bg-white rounded-[20px] p-9 sm:p-11 text-center transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-transparent hover:border-slate-200">
            <div className="w-[60px] h-[60px] rounded-full bg-[#eff2ff] text-[#2b3bff] inline-flex items-center justify-center mb-5.5 transition-transform duration-200 group-hover:scale-108 mx-auto">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className="text-[clamp(14px,1.4vw,18px)] font-extrabold text-[#0b1a3c] mb-2 tracking-[-0.035em] whitespace-nowrap">
              Real companies. Genuine openings.
            </div>
            <p className="text-lg leading-[1.65] text-slate-500 m-0">
              Discover opportunities from verified hiring companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
