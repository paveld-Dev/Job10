'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const JobseekerPromoHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`sticky top-0 left-0 w-full z-50 h-[84px] flex items-center bg-white/95 backdrop-blur-md border-b border-slate-200/85 transition-all duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        <div className="flex items-center justify-between w-full gap-5 sm:gap-6">
          <div className="flex items-center shrink-0">
            <a href="#" className="inline-flex items-center" aria-label="Job10 Home">
              <Image
                src="/images/job10-logo.png"
                alt="Job10"
                width={170}
                height={60}
                priority
                className="w-[145px] sm:w-[170px] max-w-[32vw] sm:max-w-none h-auto block"
              />
            </a>
          </div>

          <div className="flex items-center justify-end shrink-0 gap-3 sm:gap-5">
            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              id="header-cta-btn"
              className="group inline-flex items-center justify-center gap-2.5 font-bold text-sm sm:text-lg text-white bg-[#2b3bff] hover:bg-[#1e2ecc] rounded-full px-4 sm:px-7 h-[50px] shadow-[0_4px_14px_rgba(43,59,255,0.22)] hover:shadow-[0_6px_18px_rgba(43,59,255,0.32)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              <span>Explore Jobs</span>
              <span className="inline-flex items-center justify-center transition-transform duration-150 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
