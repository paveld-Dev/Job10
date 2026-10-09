import React from 'react';
import Image from 'next/image';

interface Job10LogoProps {
  className?: string;
  size?: number;
  height?: number;
  variant?: 'navy' | 'white';
}

export const Job10Logo: React.FC<Job10LogoProps> = ({
  className = '',
  height = 36,
  size,
  variant = 'navy',
}) => {
  const h = height || (size ? Math.round(size * 1.0) : 36);
  // Aspect ratio of job10-logo.png (845 x 221) is 3.8235
  const w = Math.round(h * 3.8235);

  return (
    <div
      className={`job10-logo-group ${className}`}
      style={{
        height: h,
        display: 'inline-flex',
        alignItems: 'center',
        filter: variant === 'white' ? 'brightness(0) invert(1)' : undefined,
      }}
    >
      <Image
        src="/images/job10-logo.png"
        alt="Job10"
        width={w}
        height={h}
        priority
        style={{
          height: h,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
