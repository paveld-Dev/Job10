'use client';

import React, { useState, useEffect, useRef } from 'react';
import { defaultCampaignConfig } from '@/config/campaign.config';
import type { CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { useCampaignAudience } from '@/hooks/useCampaignAudience';
import { CampaignHeader } from '@/components/layout/CampaignHeader';
import { CampaignFooter } from '@/components/layout/CampaignFooter';
import { CampaignHero } from '@/components/sections/CampaignHero';
import { CategoryBrowse } from '@/components/sections/CategoryBrowse';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ResumePromptModal } from '@/components/ui/ResumePromptModal';

const RESUME_MODAL_DISMISSED_KEY = 'job10_resume_prompt_dismissed';

interface CampaignPageProps {
  customConfig?: Partial<CampaignConfig>;
}

export function CampaignPageView({ customConfig }: CampaignPageProps) {
  const config = { ...defaultCampaignConfig, ...customConfig };
  const { audience, setAudience } = useCampaignAudience('jobseeker');
  const [jobseekerMode, setJobseekerMode] = useState<JobseekerMode>('without-resume');
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);

  // Resume entry prompt modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInteractedRef = useRef(false);
  const memoryDismissedRef = useRef(false);

  useEffect(() => {
    // Only for jobseeker audience, when feature flag enabled
    if (audience !== 'jobseeker') return;
    if (config.resumePrompt && !config.resumePrompt.enabled) return;

    // Check localStorage (with try/catch fallback to in-memory)
    let isDismissed = memoryDismissedRef.current;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        isDismissed = isDismissed || window.localStorage.getItem(RESUME_MODAL_DISMISSED_KEY) === 'true';
      }
    } catch {
      // In-memory fallback
      isDismissed = memoryDismissedRef.current;
    }

    if (isDismissed) return;

    const timer = setTimeout(() => {
      // Do not open if user has already started interacting with the page
      if (userInteractedRef.current) return;
      setIsModalOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [audience, config.resumePrompt]);

  const handleDismissModal = () => {
    setIsModalOpen(false);
    memoryDismissedRef.current = true;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(RESUME_MODAL_DISMISSED_KEY, 'true');
      }
    } catch {
      // In-memory fallback
    }
  };

  const handleUserInteracted = () => {
    userInteractedRef.current = true;
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return (
          <CampaignHero
            key="hero"
            audience={audience}
            onAudienceChange={setAudience}
            config={config}
            jobseekerMode={jobseekerMode}
            onJobseekerModeChange={setJobseekerMode}
            selectedResumeFile={selectedResumeFile}
            onSelectedResumeFileChange={setSelectedResumeFile}
            onUserInteracted={handleUserInteracted}
            onResumePromptOpen={() => setIsModalOpen(true)}
          />
        );
      case 'categories':
        return (
          <CategoryBrowse
            key="categories"
            categories={config.browseCategories}
          />
        );
      case 'how-it-works':
        return <HowItWorks key="how-it-works" />;
      case 'benefits':
        return (
          <BenefitsSection
            key="benefits"
            audience={audience}
            features={config.features}
          />
        );
      case 'final-cta':
        return <FinalCTA key="final-cta" config={config.finalCta} />;
      case 'footer':
        return <CampaignFooter key="footer" config={config.footer} />;
      default:
        return null;
    }
  };

  const enabledSections = [...config.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="job10-campaign-wrapper">
      <CampaignHeader
        config={config.navigation}
        currentAudience={audience}
        onAudienceSelect={setAudience}
      />

      <main id="main-content">{enabledSections.map((sec) => renderSection(sec.id))}</main>

      {/* Optional skippable entry modal for jobseekers */}
      <ResumePromptModal
        isOpen={isModalOpen}
        onClose={handleDismissModal}
        onSkip={handleDismissModal}
        selectedFile={selectedResumeFile}
        onFileSelect={setSelectedResumeFile}
        uploadTargetHref={config.searchPanel.jobseeker.resumeUploadHref}
        config={config.resumePrompt}
        allowedExtensions={config.searchPanel.jobseeker.allowedFileExtensions}
        maxSizeBytes={config.searchPanel.jobseeker.maxResumeSizeBytes}
      />
    </div>
  );
}

export default CampaignPageView;
