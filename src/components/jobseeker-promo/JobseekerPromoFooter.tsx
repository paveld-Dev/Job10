'use client';

import React from 'react';
import Image from 'next/image';

export const JobseekerPromoFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-simple">
          <a
            className="footer-simple-brand"
            href="https://job10-delta.vercel.app/"
            aria-label="Job10 Home"
          >
            <Image
              src="/images/job10-logo.png"
              alt="Job10 — Get an interview within 10 minutes!"
              width={180}
              height={63}
            />
          </a>
          <p className="footer-simple-description">
            Job10 is an intelligent talent matching platform connecting top
            <br className="footer-desktop-break" /> companies with world-class professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
