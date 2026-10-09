'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Job10Logo } from './Job10Logo';
import { useCampaignAudience } from '@/hooks/useCampaignAudience';
import { useAuthSession } from '@/hooks/useAuthSession';
import { defaultCampaignConfig } from '@/config/campaign.config';
import type { AudienceType, CampaignConfig, NavItem, NavigationLinkItem } from '@/config/campaign.types';
import { ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';

interface CampaignHeaderProps {
  config?: CampaignConfig['navigation'];
  currentAudience?: AudienceType;
  onAudienceSelect?: (audience: AudienceType) => void;
  // Optional legacy props
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  config = defaultCampaignConfig.navigation,
  currentAudience,
  onAudienceSelect,
}) => {
  const { audience: hookAudience, setAudience } = useCampaignAudience('jobseeker');
  const audience = currentAudience || hookAudience;
  const { session, isAuthenticated, signOut } = useAuthSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Preserve UTM and campaign params on every href
  const preserveUtm = useCallback((targetHref: string) => {
    if (typeof window === 'undefined') return targetHref;
    if (targetHref.startsWith('#')) return targetHref;
    try {
      const currentUrl = new URL(window.location.href);
      const url = new URL(targetHref, window.location.origin);
      const utmKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'campaignId',
      ];
      utmKeys.forEach((key) => {
        const val = currentUrl.searchParams.get(key);
        if (val && !url.searchParams.has(key)) {
          url.searchParams.set(key, val);
        }
      });
      return targetHref.startsWith('http')
        ? url.toString()
        : `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return targetHref;
    }
  }, []);

  // Scroll detection (shrink from 72px to 64px after 8px scroll)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track hash for active anchor highlighting
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close mobile sheet on route change / popstate
  useEffect(() => {
    const handlePopState = () => {
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Handle Escape key and focus trapping for mobile sheet
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle click outside user dropdown
  useEffect(() => {
    if (!userDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userDropdownOpen]);

  // Filter links: show only if route or anchor exists (max 4 in exact order)
  // 1. Find Jobs, 2. For Employers, 3. How it works, 4. Resources (if exists)
  const navLinks: NavigationLinkItem[] = (config.navLinks || []).filter(
    (item: NavigationLinkItem) => item.routeExists
  );

  // Audience-aware CTA calculations
  const isRecruiter = audience === 'recruiter';
  const primaryCtaText = isRecruiter ? 'Post a Job' : 'Sign up free';
  const primaryCtaBaseHref = isRecruiter
    ? config.auth?.ctaRecruiter.href || '/campaign/get-started?audience=recruiter#action-panel'
    : config.auth?.signupJobseeker.href || '/campaign/get-started?audience=jobseeker#action-panel';
  const primaryCtaHref = preserveUtm(primaryCtaBaseHref);

  // Login href with UTM
  const loginHref = preserveUtm(config.auth?.login.href || '/login');

  // Dashboard href based on user role when authenticated
  const dashboardHref = preserveUtm(
    session?.role === 'recruiter'
      ? config.auth?.dashboardRecruiter.href || '/dashboard/recruiter'
      : config.auth?.dashboardJobseeker.href || '/dashboard/jobseeker'
  );

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);

    if (href.includes('audience=jobseeker')) {
      if (onAudienceSelect) onAudienceSelect('jobseeker');
      setAudience('jobseeker');
    } else if (href.includes('audience=recruiter')) {
      if (onAudienceSelect) onAudienceSelect('recruiter');
      setAudience('recruiter');
    } else if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setCurrentHash(href);
      }
    }
  };

  const isLinkActive = (item: { id: string; href: string; isAnchor?: boolean }) => {
    if (item.isAnchor) {
      return currentHash === item.href;
    }
    if (currentHash === '#how-it-works') {
      return false;
    }
    if (item.id === 'find-jobs') {
      return audience === 'jobseeker';
    }
    if (item.id === 'for-employers') {
      return audience === 'recruiter';
    }
    return false;
  };

  return (
    <>
      {/* Skip to Content accessible landmark link */}
      <a href="#main-content" className="job10-skip-link">
        {config.skipLinkText || 'Skip to content'}
      </a>

      <header
        className={`job10-header ${isScrolled ? 'is-scrolled' : 'is-top'}`}
        role="banner"
      >
        <div className="container-fluid job10-header-container">
          <div className="job10-header-inner">
            {/* Left: Job10 logo */}
            <div className="job10-header-logo-wrap">
              <Job10Logo />
            </div>

            {/* Center-left: Max 4 links shown in order if route exists */}
            <nav className="job10-header-nav" aria-label="Main">
              <ul className="job10-header-nav-list">
                {navLinks.map((item: NavigationLinkItem) => {
                  const active = isLinkActive(item);
                  return (
                    <li key={item.id} className="job10-header-nav-item">
                      <a
                        href={preserveUtm(item.href)}
                        className={`job10-header-nav-link ${active ? 'is-active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={(e) => handleLinkClick(item.href, e)}
                      >
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Actions (Desktop) */}
            <div className="job10-header-actions-desktop">
              {isAuthenticated && session ? (
                /* Authenticated User: Dashboard button + Avatar dropdown */
                <div className="job10-auth-user-section" ref={userMenuRef}>
                  <a href={dashboardHref} className="job10-btn-dashboard">
                    <LayoutDashboard size={16} aria-hidden="true" />
                    <span>Dashboard</span>
                  </a>

                  <div className="job10-user-menu-wrap">
                    <button
                      type="button"
                      className="job10-avatar-btn"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      aria-expanded={userDropdownOpen}
                      aria-haspopup="true"
                      aria-label={`User menu for ${session.name}`}
                    >
                      <span className="job10-avatar-initials">{session.initials}</span>
                    </button>

                    {userDropdownOpen && (
                      <div className="job10-user-dropdown" role="menu" aria-label="User account">
                        <div className="job10-user-dropdown-header">
                          <p className="job10-dropdown-name">{session.name}</p>
                          <p className="job10-dropdown-email">{session.email}</p>
                          <span className="job10-dropdown-role-badge">
                            {session.role === 'recruiter' ? 'Employer' : 'Jobseeker'}
                          </span>
                        </div>
                        <div className="job10-dropdown-divider" />
                        <a
                          href={dashboardHref}
                          className="job10-dropdown-item"
                          role="menuitem"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={15} />
                          <span>Dashboard</span>
                        </a>
                        <button
                          type="button"
                          className="job10-dropdown-item job10-dropdown-item--signout"
                          role="menuitem"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                        >
                          <LogOut size={15} />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Unauthenticated Visitor: Log in link + ONE primary CTA */
                <div className="job10-visitor-actions">
                  <a href={loginHref} className="job10-login-link">
                    {config.auth?.login.label || 'Log in'}
                  </a>

                  <a href={primaryCtaHref} className="job10-primary-cta-btn">
                    <span>{primaryCtaText}</span>
                    <ArrowRight size={16} className="job10-cta-arrow" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Bar Controls (≤ 900px): Compact CTA + Hamburger */}
            <div className="job10-header-actions-mobile">
              {isAuthenticated ? (
                <a href={dashboardHref} className="job10-mobile-compact-cta">
                  <span>Dashboard</span>
                </a>
              ) : (
                <a href={primaryCtaHref} className="job10-mobile-compact-cta">
                  <span>{primaryCtaText}</span>
                </a>
              )}

              <button
                ref={hamburgerRef}
                type="button"
                className="job10-hamburger-btn"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-sheet"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Width Sheet (≤ 900px) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-sheet"
            ref={sheetRef}
            className="job10-mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="job10-mobile-sheet-content">
              <ul className="job10-mobile-links-list">
                {navLinks.map((item: NavigationLinkItem) => {
                  const active = isLinkActive(item);
                  return (
                    <li key={item.id} className="job10-mobile-link-item">
                      <a
                        href={preserveUtm(item.href)}
                        className={`job10-mobile-nav-row ${active ? 'is-active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={(e) => handleLinkClick(item.href, e)}
                      >
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}

                {/* Secondary row: Log in or Account */}
                {isAuthenticated && session ? (
                  <>
                    <li className="job10-mobile-link-item">
                      <a
                        href={dashboardHref}
                        className="job10-mobile-nav-row"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="job10-mobile-user-row">
                          <span className="job10-avatar-initials job10-avatar-initials--sm">{session.initials}</span>
                          <span>{session.name} (Dashboard)</span>
                        </span>
                      </a>
                    </li>
                    <li className="job10-mobile-link-item">
                      <button
                        type="button"
                        className="job10-mobile-nav-row job10-mobile-signout-btn"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          signOut();
                        }}
                      >
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="job10-mobile-link-item">
                    <a
                      href={loginHref}
                      className="job10-mobile-nav-row job10-mobile-login-row"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{config.auth?.login.label || 'Log in'}</span>
                    </a>
                  </li>
                )}
              </ul>

              {/* Full-width primary CTA at bottom */}
              <div className="job10-mobile-sheet-cta-wrap">
                <a
                  href={isAuthenticated ? dashboardHref : primaryCtaHref}
                  className="job10-mobile-sheet-primary-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{isAuthenticated ? 'Go to Dashboard' : primaryCtaText}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
