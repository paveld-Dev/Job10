'use client';

import React from 'react';

export const JobseekerPromoFinalCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white" id="cta">
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        <div
          className="relative bg-[#1d2de8] bg-[url('/images/cta-card-bg.jpg')] bg-cover bg-[position:right_bottom] bg-no-repeat rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(43,59,255,0.28)] min-h-[350px] flex items-center max-[600px]:bg-[length:auto_240px] max-[600px]:items-start max-[600px]:min-h-0 before:content-[''] before:absolute before:inset-0 before:pointer-events-none max-[600px]:before:bg-[linear-gradient(to_bottom,#1d2de8_0%,#1d2de8_calc(100%-240px),transparent_calc(100%-190px))]"
        >
          <div className="relative z-10 w-full py-12 px-9 sm:py-16 sm:px-16 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] items-center max-[600px]:text-center max-[600px]:pt-8 max-[600px]:px-6 max-[600px]:pb-[264px]">
            <div className="max-w-[580px] max-[600px]:max-w-full max-[600px]:mx-auto">
              <h2 className="text-[clamp(26px,7vw,32px)] sm:text-[clamp(30px,3.4vw,42px)] font-extrabold leading-[1.22] text-white tracking-[-0.025em] mb-4 sm:mb-4.5">
                Your next opportunity could be one click away.
              </h2>
              <p className="text-base sm:text-[19px] leading-[1.65] text-[#e0e7ff] mb-6 sm:mb-8 max-w-[500px]">
                Join thousands of professionals finding matched roles and advancing their careers faster today.
              </p>
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                id="final-cta-btn"
                className="inline-flex items-center justify-center gap-2.5 font-bold text-lg text-[#0b1a3c] bg-white hover:bg-[#f8fafc] rounded-full px-8.5 h-[54px] shadow-[0_6px_20px_rgba(11,26,60,0.22)] hover:shadow-[0_8px_24px_rgba(11,26,60,0.32)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
                Find My Match &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
