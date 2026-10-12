'use client';

import React from 'react';

interface TenRingProps {
  children?: React.ReactNode;
}

export const TenRing: React.FC<TenRingProps> = ({ children }) => {

  return (
    <span className="job10-ten-wrapper">
      <svg
        className="job10-ten-ring-svg"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Clock Tick Marks at 12, 3, 6, 9 o'clock (1px, slate-300, 40% opacity) */}
        <line x1="24" y1="2" x2="24" y2="4.5" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
        <line x1="43.5" y1="24" x2="46" y2="24" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
        <line x1="24" y1="43.5" x2="24" y2="46" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
        <line x1="2" y1="24" x2="4.5" y2="24" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />

        {/* Circle stroke 2px with solid primary blue, animated 85% arc from 12 o'clock */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#2B3BFF"
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          className="job10-ten-ring-circle"
        />
      </svg>
      {children}
    </span>
  );
};
