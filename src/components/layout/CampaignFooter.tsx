import React from 'react';
import { Job10Logo } from './Job10Logo';
import type { CampaignConfig } from '@/config/campaign.types';

interface CampaignFooterProps {
  config: CampaignConfig['footer'];
}

export const CampaignFooter: React.FC<CampaignFooterProps> = ({ config }) => {
  return (
    <footer className="job10-footer">
      <div className="container-fluid">
        <div className="job10-footer-inner">
          <Job10Logo size={32} variant="navy" />

          <ul className="job10-footer-links">
            {config.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="job10-footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="job10-footer-copy">{config.copyright}</div>
        </div>
      </div>
    </footer>
  );
};
