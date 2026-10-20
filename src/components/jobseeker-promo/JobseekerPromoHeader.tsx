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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <div className="header-left">
            <a href="#" className="header-logo" aria-label="Job10 Home">
              <Image
                src="/images/job10-logo.png"
                alt="Job10"
                width={170}
                height={60}
                priority
              />
            </a>
          </div>
          <div className="header-right">
            <a
              href="https://job10-delta.vercel.app/?audience=jobseeker"
              className="btn btn-primary"
              style={{ height: '50px', padding: '0 28px', fontSize: '18px' }}
              id="header-cta-btn"
            >
              <span>Explore Jobs</span>
              <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
