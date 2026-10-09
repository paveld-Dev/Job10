'use client';

import React, { useState, useEffect, useRef } from 'react';
import { defaultCampaignConfig } from '@/config/campaign.config';
import type { CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { useCampaignAudience } from '@/hooks/useCampaignAudience';
import { CampaignHeader } from '@/components/layout/CampaignHeader';
import { CampaignFooter } from '@/components/layout/CampaignFooter';
import { CampaignHero } from '@/components/sections/CampaignHero';
import { CategoryBrowse } from '@/components/sections/CategoryBrowse';
import { RecentJobsSection } from '@/components/sections/RecentJobsSection';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ResumePromptModal } from '@/components/ui/ResumePromptModal';

interface CampaignPageProps {
  customConfig?: Partial<CampaignConfig>;
}

export function CampaignPageView({ customConfig }: CampaignPageProps) {
  const config = { ...defaultCampaignConfig, ...customConfig };
  const { audience, setAudience } = useCampaignAudience('jobseeker');
  const [jobseekerMode, setJobseekerMode] = useState<JobseekerMode>('without-resume');
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);

  // Resume entry prompt modal state — shows on every reload
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // Only for jobseeker audience, when feature flag enabled
    if (audience !== 'jobseeker') return;
    if (config.resumePrompt && !config.resumePrompt.enabled) return;

    // Show popup asking for resume on every reload after brief delay
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [audience, config.resumePrompt]);

  const handleDismissModal = () => {
    setIsModalOpen(false);
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
      case 'recent-jobs':
        return <RecentJobsSection key="recent-jobs" />;
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
