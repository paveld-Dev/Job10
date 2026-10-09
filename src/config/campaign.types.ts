export type AudienceType = 'jobseeker' | 'recruiter';
export type JobseekerMode = 'with-resume' | 'without-resume';

export interface CampaignSectionConfig {
  id: string;
  component: string;
  enabled: boolean;
  order: number;
  variant?: string;
}

export interface NavigationLinkItem {
  id: string;
  label: string;
  href: string;
  isAnchor?: boolean;
  routeExists: boolean;
}

export interface NavigationAuthConfig {
  login: {
    label: string;
    href: string;
    routeExists: boolean;
  };
  signupJobseeker: {
    label: string;
    href: string;
    routeExists: boolean;
  };
  ctaRecruiter: {
    label: string;
    href: string;
    routeExists: boolean;
  };
  dashboardJobseeker: {
    label: string;
    href: string;
    routeExists: boolean;
  };
  dashboardRecruiter: {
    label: string;
    href: string;
    routeExists: boolean;
  };
  signOutLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  highlight?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface AudienceCardData {
  audience: AudienceType;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface StepperSummaryConfig {
  supportingLine: string;
  jobseekerSearch: string[];
  jobseekerResume: string[];
  recruiter: string[];
}

export interface CampaignConfig {
  campaignId: string;
  campaignName: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  heroDescription: string;
  sections: CampaignSectionConfig[];
  navigation: {
    brandName: string;
    brandTagline: string;
    logoAriaLabel?: string;
    skipLinkText?: string;
    navLinks?: NavigationLinkItem[];
    auth?: NavigationAuthConfig;
    navItems: NavItem[];
    cta: {
      label: string;
      href: string;
    };
  };
  searchPanel: {
    jobseeker: {
      tabLabel: string;
      searchCtaText: string;
      resumeCtaText: string;
      searchHref: string;
      resumeUploadHref: string;
      maxResumeSizeBytes: number;
      allowedFileExtensions: string[];
      inputs: {
        rolePlaceholder: string;
        categoryOptions: string[];
        locationPlaceholder: string;
      };
    };
    recruiter: {
      tabLabel: string;
      ctaText: string;
      targetHref: string;
      inputs: {
        rolePlaceholder: string;
        categoryOptions: string[];
        locationPlaceholder: string;
      };
    };
  };
  audienceCards: AudienceCardData[];
  heroStepper: StepperSummaryConfig;
  browseCategories: {
    label: string;
    href: string;
  }[];
  steps: {
    headline: string;
    subheadline: string;
    jobseekerWithResume: StepItem[];
    jobseekerWithoutResume: StepItem[];
    recruiter: StepItem[];
  };
  features: {
    headline: string;
    subheadline: string;
    jobseeker: FeatureItem[];
    recruiter: FeatureItem[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
    jobseekerCta: {
      label: string;
      href: string;
    };
    recruiterCta: {
      label: string;
      href: string;
    };
    trustBadge: string;
  };
  resumePrompt?: {
    enabled: boolean;
    title: string;
    body: string;
    uploadCtaText: string;
    skipCtaText: string;
  };
  whyChoose?: WhyChooseConfig;
  heroVisual?: {
    tenRing?: {
      enabled: boolean;
    };
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: 'file-sparkle' | 'users' | 'zap' | 'briefcase' | 'chart' | 'shield';
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface WhyChooseConfig {
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  items: WhyChooseItem[];
}
