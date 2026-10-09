import type { CampaignConfig } from './campaign.types';

export const defaultCampaignConfig: CampaignConfig = {
  campaignId: 'get-started',
  campaignName: 'Your Next Opportunity Starts in 10 Minutes',
  eyebrow: 'FASTER MATCHES. BRIGHTER OPPORTUNITIES.',
  headlinePrefix: 'Your next',
  headlineHighlight: '10 minutes.',
  heroDescription:
    'Find opportunities that match your skills or discover talent that fits your team. Your next move starts with Job10.',
  
  heroVisual: {
    tenRing: {
      enabled: true,
    },
  },
  
  sections: [
    { id: 'hero', component: 'CampaignHero', enabled: true, order: 1, variant: 'photographic' },
    { id: 'categories', component: 'CategoryBrowse', enabled: true, order: 2 },
    { id: 'recent-jobs', component: 'RecentJobsSection', enabled: true, order: 3 },
    { id: 'benefits', component: 'BenefitsSection', enabled: true, order: 4 },
    { id: 'how-it-works', component: 'HowItWorks', enabled: true, order: 5 },
    { id: 'final-cta', component: 'FinalCTA', enabled: true, order: 6 },
    { id: 'footer', component: 'CampaignFooter', enabled: true, order: 7 },
  ],

  navigation: {
    brandName: 'Job10',
    brandTagline: 'TALENT MATCHES FASTER',
    logoAriaLabel: 'Job10 home',
    skipLinkText: 'Skip to content',
    navLinks: [
      {
        id: 'how-it-works',
        label: 'How it works',
        href: '#how-it-works',
        isAnchor: true,
        routeExists: true,
      },
    ],
    auth: {
      login: {
        label: 'Log in',
        href: '/login',
        routeExists: false, // Gap: no /login route exists in the workspace
      },
      signupJobseeker: {
        label: 'Sign up free',
        href: '/campaign/get-started?audience=jobseeker#action-panel',
        routeExists: true,
      },
      ctaRecruiter: {
        label: 'Post a Job',
        href: '/campaign/get-started?audience=recruiter#action-panel',
        routeExists: true,
      },
      dashboardJobseeker: {
        label: 'Dashboard',
        href: '/dashboard/jobseeker',
        routeExists: false, // Gap: no /dashboard/jobseeker route exists in the workspace
      },
      dashboardRecruiter: {
        label: 'Dashboard',
        href: '/dashboard/recruiter',
        routeExists: false, // Gap: no /dashboard/recruiter route exists in the workspace
      },
      signOutLabel: 'Sign out',
    },
    navItems: [
      { label: 'Find Jobs', href: '/campaign/get-started?audience=jobseeker' },
      { label: 'For Employers', href: '/campaign/get-started?audience=recruiter' },
      { label: 'How it works', href: '#how-it-works' },
    ],
    cta: {
      label: 'Sign up free',
      href: '/campaign/get-started?audience=jobseeker#action-panel',
    },
  },

  searchPanel: {
    jobseeker: {
      tabLabel: 'Find a Job',
      searchCtaText: 'Search Jobs →',
      resumeCtaText: 'Upload & Find Matches →',
      // Note: No separate public /jobs or /search route exists in the workspace.
      // Handoffs route through the existing onboarding flow as the designated entry point.
      searchHref: '/onboarding/jobseeker',
      resumeUploadHref: '/onboarding/jobseeker',
      maxResumeSizeBytes: 5 * 1024 * 1024, // 5 MB default limit
      allowedFileExtensions: ['.pdf', '.docx', '.doc'],
      inputs: {
        rolePlaceholder: 'Job title or skill',
        categoryOptions: [
          'Category',
          'Technology & Engineering',
          'Product & Design',
          'Sales & Marketing',
          'Data & Analytics',
        ],
        locationPlaceholder: 'Location',
      },
    },
    recruiter: {
      tabLabel: 'Find Talent',
      ctaText: 'Get Started →',
      targetHref: '/onboarding/recruiter',
      inputs: {
        rolePlaceholder: 'Job role or position',
        categoryOptions: [
          'Category',
          'Full Stack Developers',
          'Product Designers',
          'Engineering Leads',
          'AI / Data Specialists',
        ],
        locationPlaceholder: 'Location',
      },
    },
  },

  audienceCards: [
    {
      audience: 'jobseeker',
      title: 'For Jobseekers',
      description: 'Optional: upload your resume to discover opportunities matched to your skills.',
      ctaText: 'Find My Match →',
      ctaHref: '/onboarding/jobseeker?step=resume',
    },
    {
      audience: 'recruiter',
      title: 'For Recruiters',
      description: 'Find top candidates and build your dream team with AI matching.',
      ctaText: 'Find Talent →',
      ctaHref: '/onboarding/recruiter?step=requirements',
    },
  ],

  heroStepper: {
    supportingLine: 'Get started in minutes, your way.',
    jobseekerSearch: ['Search by Role', 'Explore Jobs', 'View Job Details'],
    jobseekerResume: ['Upload Resume', 'AI Matching', 'Explore Matched Jobs'],
    recruiter: ['Add Job Requirements', 'AI Candidate Matching', 'Explore Talent'],
  },

  browseCategories: [
    { label: 'Technology & Engineering', href: '/onboarding/jobseeker?category=technology-engineering' },
    { label: 'Product & Design', href: '/onboarding/jobseeker?category=product-design' },
    { label: 'Sales & Marketing', href: '/onboarding/jobseeker?category=sales-marketing' },
    { label: 'Data & Analytics', href: '/onboarding/jobseeker?category=data-analytics' },
    { label: 'Operations & People', href: '/onboarding/jobseeker?category=operations-people' },
  ],

  steps: {
    headline: 'Three simple steps. One smarter start.',
    subheadline:
      'A streamlined matching workflow designed to connect qualified professionals with hiring teams.',
    jobseekerWithResume: [
      {
        number: '01',
        title: 'Upload Resume',
        description: 'Upload your PDF or Word document to parse your background and technical skills.',
        tag: 'Step 1',
      },
      {
        number: '02',
        title: 'AI Matching',
        description: 'Role requirements are mapped against your verified experience and preferences.',
        tag: 'Step 2',
        highlight: true,
      },
      {
        number: '03',
        title: 'Explore Matched Jobs',
        description: 'Review curated positions and connect directly with hiring teams.',
        tag: 'Step 3',
      },
    ],
    jobseekerWithoutResume: [
      {
        number: '01',
        title: 'Search by Role',
        description: 'Filter opportunities immediately by role title, technical skill, or preferred location.',
        tag: 'Step 1',
      },
      {
        number: '02',
        title: 'Explore Jobs',
        description: 'Browse available listings, requirements, team details, and location flexibility.',
        tag: 'Step 2',
        highlight: true,
      },
      {
        number: '03',
        title: 'View Job Details',
        description: 'Inspect full role expectations and apply directly when ready.',
        tag: 'Step 3',
      },
    ],
    recruiter: [
      {
        number: '01',
        title: 'Add Job Requirements',
        description: 'Define your role scope, required skills, and team criteria.',
        tag: 'Step 1',
      },
      {
        number: '02',
        title: 'AI Candidate Matching',
        description: 'Identify relevant candidate profiles aligned with your tech stack and requirements.',
        tag: 'Step 2',
        highlight: true,
      },
      {
        number: '03',
        title: 'Explore Talent',
        description: 'Connect directly with pre-screened talent ready for initial conversations.',
        tag: 'Step 3',
      },
    ],
  },

  features: {
    headline: 'Better matches. Less effort.',
    subheadline:
      'Job10 connects qualified professionals with employers through focused skill matching.',
    jobseeker: [
      {
        title: 'Skill-Based Role Matching',
        description: 'Matches roles according to demonstrated expertise, technical stack, and career focus.',
      },
      {
        title: 'Direct Application Workflow',
        description: 'Connect directly with hiring managers without unnecessary intermediary screens.',
      },
      {
        title: 'Clear Role Details & Expectations',
        description: 'View upfront compensation ranges, tech stack requirements, and team structure.',
      },
    ],
    recruiter: [
      {
        title: 'Qualified Candidate Sourcing',
        description: 'Filter candidates matching specific role competencies and required qualifications.',
      },
      {
        title: 'Efficient Review Workflow',
        description: 'Structured candidate summaries enable fast, objective candidate evaluations.',
      },
      {
        title: 'Direct Candidate Communication',
        description: 'Engage qualified talent directly to schedule introductory conversations.',
      },
    ],
  },

  finalCta: {
    headline: 'A better match starts with your next click.',
    subheadline:
      'Discover opportunities tailored to your background or connect with qualified professionals.',
    jobseekerCta: {
      label: 'Find My Match →',
      href: '/campaign/get-started?audience=jobseeker#action-panel',
    },
    recruiterCta: {
      label: 'Find Talent →',
      href: '/campaign/get-started?audience=recruiter#action-panel',
    },
    trustBadge: 'Takes only minutes • Free for jobseekers • No credit card required',
  },

  resumePrompt: {
    enabled: true,
    title: 'Find jobs that match your skills.',
    body: 'Upload your resume to discover opportunities tailored to your experience.',
    uploadCtaText: 'Upload & Find Matches →',
    skipCtaText: 'Browse Jobs Without Resume',
  },

  whyChoose: {
    eyebrow: 'WHY CHOOSE JOB10',
    headlinePrefix: 'Everything you need',
    headlineHighlight: 'to move forward.',
    subheadline:
      'A faster, smarter and simpler way to connect talent with opportunities — all in one place.',
    items: [
      {
        id: 'smarter-matches',
        title: 'Smarter Job Matches',
        description: 'Find roles that fit your skills, experience and goals.',
        iconName: 'file-sparkle',
        position: 'top-left',
      },
      {
        id: 'top-talent',
        title: 'Access Top Talent',
        description: 'Connect with qualified candidates faster.',
        iconName: 'users',
        position: 'top-center',
      },
      {
        id: 'save-time',
        title: 'Save Time',
        description: 'AI-powered matching reduces manual effort.',
        iconName: 'zap',
        position: 'top-right',
      },
      {
        id: 'wide-range',
        title: 'Wide Range of Opportunities',
        description: 'Explore jobs across industries and locations.',
        iconName: 'briefcase',
        position: 'bottom-left',
      },
      {
        id: 'grow-career',
        title: 'Grow Your Career',
        description: 'Get insights, apply faster and track your progress.',
        iconName: 'chart',
        position: 'bottom-center',
      },
      {
        id: 'trusted-employers',
        title: 'Trusted by Employers',
        description: 'Join a platform used by leading companies.',
        iconName: 'shield',
        position: 'bottom-right',
      },
    ],
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Job10 Technologies Inc. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Security', href: '/legal/security' },
      { label: 'Contact Support', href: 'mailto:support@job10.com' },
    ],
  },
};
