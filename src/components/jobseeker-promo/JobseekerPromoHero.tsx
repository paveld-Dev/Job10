'use client';

import React from 'react';
import Image from 'next/image';

export const JobseekerPromoHero: React.FC = () => {
  return (
    <section className="relative bg-white pt-12 md:pt-16 lg:pt-[76px] pb-14 md:pb-20 lg:pb-[88px] overflow-hidden border-b border-slate-200" id="hero">
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-7 md:gap-10 lg:gap-15 text-center lg:text-left">
          {/* Left Column: Live Content */}
          <div className="relative z-10 flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2.5 bg-[#2b3bff]/[0.06] backdrop-blur-md text-[#2b3bff] text-base sm:text-lg font-bold tracking-[0.02em] px-5 py-2 rounded-full border border-[#2b3bff]/[0.24] shadow-[0_2px_10px_rgba(43,59,255,0.08)] hover:bg-[#2b3bff]/10 hover:border-[#2b3bff]/40 transition-all duration-200">
              <span className="inline-flex items-center justify-center text-[#2b3bff] text-lg leading-none drop-shadow-[0_0_4px_rgba(43,59,255,0.35)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </span>
              AI-POWERED JOB MATCHING
            </div>

            <h1 className="text-[clamp(40px,4.8vw,64px)] font-extrabold leading-[1.14] tracking-[-0.03em] text-[#0b1a3c] my-5 sm:my-6">
              Get an interview<br />
              <span className="whitespace-nowrap">
                in <span className="text-[#2b3bff] inline-block">10 minutes.</span>
              </span>
            </h1>

            <p className="text-lg sm:text-[clamp(18px,1.4vw,20px)] leading-[1.65] text-slate-500 max-w-[580px] mb-9 mx-auto lg:mx-0">
              Skip the endless applications. Job10 matches your skills and experience with opportunities at verified companies, helping you get noticed by the right employers faster.
            </p>

            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-4.5 mb-10 w-full">
              <a
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                id="hero-primary-cta"
                className="group inline-flex items-center justify-center gap-2.5 font-bold text-lg text-white bg-[#2b3bff] hover:bg-[#1e2ecc] rounded-full px-8 h-[54px] w-full sm:w-[218px] shadow-[0_4px_14px_rgba(43,59,255,0.22)] hover:shadow-[0_6px_18px_rgba(43,59,255,0.32)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              >
                <span>Explore Jobs</span>
                <span className="inline-flex items-center justify-center text-[1.15em] transition-transform duration-150 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-5.5 border-t border-slate-100 w-full">
              <div className="flex items-center">
                <Image
                  src="/images/explore-man.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="w-[38px] h-[38px] rounded-full border-[2.5px] border-white bg-slate-300 object-cover block"
                />
                <Image
                  src="/images/explore-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="w-[38px] h-[38px] rounded-full border-[2.5px] border-white bg-slate-300 -ml-2.5 object-cover block"
                />
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Candidate"
                  width={38}
                  height={38}
                  className="w-[38px] h-[38px] rounded-full border-[2.5px] border-white bg-slate-300 -ml-2.5 object-cover block"
                />
              </div>
              <div className="text-base sm:text-lg leading-normal text-slate-500 font-medium text-left">
                Matched <strong className="text-[#0b1a3c]">15,000+ candidates</strong> with<br />top tier tech teams &middot; ★ 4.9/5
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Soft Seamless Fade */}
          <div className="relative flex justify-center lg:justify-end items-end mt-6 lg:mt-0">
            <Image
              src="/images/hero-woman-asset.jpg"
              alt="Professional woman discovering career opportunities"
              width={500}
              height={460}
              priority
              className="w-full max-w-[500px] h-auto block drop-shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
              id="hero-faded-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
