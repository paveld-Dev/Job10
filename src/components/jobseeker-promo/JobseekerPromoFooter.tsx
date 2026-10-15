'use client';

import React from 'react';
import Image from 'next/image';

export const JobseekerPromoFooter: React.FC = () => {
  return (
    <footer className="bg-[#f7f9fc] border-t border-[#edf0f5] rounded-b-[24px] md:rounded-b-[32px] py-9 md:py-12 shadow-[0_12px_22px_rgba(15,23,42,0.07)]">
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5.5 md:gap-12 flex-nowrap">
          <a
            className="inline-flex shrink-0 items-center no-underline"
            href="https://job10-delta.vercel.app/"
            aria-label="Job10 Home"
          >
            <Image
              src="/images/job10-logo.png"
              alt="Job10 — Get an interview within 10 minutes!"
              width={180}
              height={63}
              className="w-[150px] md:w-[180px] h-auto max-h-none block"
            />
          </a>
          <p className="max-w-[440px] md:max-w-[520px] m-0 text-[#566985] text-sm md:text-base leading-[1.6] font-normal text-center md:text-right">
            Job10 is an intelligent talent matching platform connecting top
            <br className="hidden md:inline" /> companies with world-class professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
