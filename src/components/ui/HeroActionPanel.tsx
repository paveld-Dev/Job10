'use client';

import React, { useState, useRef } from 'react';
import type { AudienceType, CampaignConfig, JobseekerMode } from '@/config/campaign.types';
import { Search, LayoutGrid, MapPin, User, Users, UploadCloud, FileText, X, AlertCircle, ChevronDown } from 'lucide-react';

interface HeroActionPanelProps {
  audience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  config: CampaignConfig['searchPanel'];
  jobseekerMode?: JobseekerMode;
  onJobseekerModeChange?: (mode: JobseekerMode) => void;
  onSearchSubmitted?: () => void;
  selectedResumeFile?: File | null;
  onSelectedResumeFileChange?: (file: File | null) => void;
  onUserInteracted?: () => void;
}

export const HeroActionPanel: React.FC<HeroActionPanelProps> = ({
  audience,
  onAudienceChange,
  config,
  jobseekerMode = 'without-resume',
  onJobseekerModeChange,
  onSearchSubmitted,
  selectedResumeFile,
  onSelectedResumeFileChange,
  onUserInteracted,
}) => {
  const isJobseeker = audience === 'jobseeker';
  const isResumeMode = isJobseeker && jobseekerMode === 'with-resume';
  const currentConfig = isJobseeker ? config.jobseeker : config.recruiter;

  // Search input state preserved across switches
  const [roleInput, setRoleInput] = useState('');
  const [category, setCategory] = useState(config.jobseeker.inputs.categoryOptions[0]);
  const [locationInput, setLocationInput] = useState('');

  // Internal resume state synced with external prop if provided
  const [internalSelectedFile, setInternalSelectedFile] = useState<File | null>(null);
  const selectedFile = selectedResumeFile !== undefined ? selectedResumeFile : internalSelectedFile;
  const setSelectedFile = (file: File | null) => {
    if (onSelectedResumeFileChange) {
      onSelectedResumeFileChange(file);
    } else {
      setInternalSelectedFile(file);
    }
  };

  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for tablist
  const handleKeyDownTab = (e: React.KeyboardEvent<HTMLButtonElement>, targetAudience: AudienceType) => {
    if (onUserInteracted) onUserInteracted();
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextAudience: AudienceType = targetAudience === 'jobseeker' ? 'recruiter' : 'jobseeker';
      onAudienceChange(nextAudience);
      const nextBtn = tabListRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${nextAudience}"]`);
      nextBtn?.focus();
    }
  };

  const validateFile = (file: File): string | null => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const allowed = config.jobseeker.allowedFileExtensions;
    if (!allowed.includes(ext)) {
      return `Invalid format (${ext}). Please select a PDF or DOCX document.`;
    }
    if (file.size > config.jobseeker.maxResumeSizeBytes) {
      const mb = (config.jobseeker.maxResumeSizeBytes / (1024 * 1024)).toFixed(0);
      return `File exceeds ${mb}MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
    }
    return null;
  };

  const handleFileSelection = (file: File) => {
    if (onUserInteracted) onUserInteracted();
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      setFileError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedFile(null);
    setFileError(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmitted) onSearchSubmitted();

    const currentUrlParams = new URLSearchParams(window.location.search);
    const targetUrl = new URL(
      isJobseeker ? config.jobseeker.searchHref : config.recruiter.targetHref,
      window.location.origin
    );

    // Copy existing campaign/UTM params to preserve attribution
    currentUrlParams.forEach((val, key) => {
      targetUrl.searchParams.set(key, val);
    });

    targetUrl.searchParams.set('audience', audience);
    if (roleInput.trim()) targetUrl.searchParams.set('role', roleInput.trim());
    if (category && category !== 'Category') targetUrl.searchParams.set('category', category);
    if (locationInput.trim()) targetUrl.searchParams.set('location', locationInput.trim());

    window.location.href = targetUrl.toString();
  };

  const handleResumeUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || isUploading) return;

    const error = validateFile(selectedFile);
    if (error) {
      setFileError(error);
      return;
    }

    setIsUploading(true);
    setFileError(null);
    setUploadProgress(15);

    // Simulate real upload sequence with progress before handing off
    const p1 = setTimeout(() => setUploadProgress(45), 250);
    const p2 = setTimeout(() => setUploadProgress(85), 600);
    const p3 = setTimeout(() => {
      setUploadProgress(100);
      if (onSearchSubmitted) onSearchSubmitted();

      const currentUrlParams = new URLSearchParams(window.location.search);
      const targetUrl = new URL(config.jobseeker.resumeUploadHref, window.location.origin);

      currentUrlParams.forEach((val, key) => {
        targetUrl.searchParams.set(key, val);
      });

      targetUrl.searchParams.set('audience', 'jobseeker');
      targetUrl.searchParams.set('hasResume', 'true');
      targetUrl.searchParams.set('resumeName', selectedFile.name);
      if (roleInput.trim()) targetUrl.searchParams.set('role', roleInput.trim());
      if (category && category !== 'Category') targetUrl.searchParams.set('category', category);
      if (locationInput.trim()) targetUrl.searchParams.set('location', locationInput.trim());

      window.location.href = targetUrl.toString();
    }, 950);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
    };
  };

  return (
    <div className="job10-panel-container" id="action-panel">
      <div className="job10-action-panel-shell">
        {/* Clean top tab bar matching reference design */}
        <div className="job10-tab-header" role="tablist" ref={tabListRef} aria-label="Audience options">
          <button
            type="button"
            role="tab"
            data-tab="jobseeker"
            id="tab-jobseeker"
            aria-controls="panel-content"
            aria-selected={isJobseeker}
            className={`job10-tab-item ${isJobseeker ? 'active' : ''}`}
            onClick={() => onAudienceChange('jobseeker')}
            onKeyDown={(e) => handleKeyDownTab(e, 'jobseeker')}
          >
            <User size={18} className="job10-tab-icon" aria-hidden="true" />
            <span className="job10-tab-label">Find a Job</span>
            {isJobseeker && <span className="job10-tab-underline" />}
          </button>

          <button
            type="button"
            role="tab"
            data-tab="recruiter"
            id="tab-recruiter"
            aria-controls="panel-content"
            aria-selected={!isJobseeker}
            className={`job10-tab-item ${!isJobseeker ? 'active' : ''}`}
            onClick={() => onAudienceChange('recruiter')}
            onKeyDown={(e) => handleKeyDownTab(e, 'recruiter')}
          >
            <Users size={18} className="job10-tab-icon" aria-hidden="true" />
            <span className="job10-tab-label">Find Talent</span>
            {!isJobseeker && <span className="job10-tab-underline" />}
          </button>
        </div>

        {/* Live region for accessibility updates */}
        <div className="sr-only" aria-live="polite">
          {isResumeMode
            ? selectedFile
              ? `Resume selected: ${selectedFile.name}`
              : 'Resume upload mode active. Drop PDF or DOCX file.'
            : 'Job search mode active.'}
        </div>

        {/* White input row: swaps only internal contents to guarantee zero layout jump */}
        <div id="panel-content" className="job10-panel-form-wrapper">
          {isResumeMode ? (
            /* RESUME MODE (swapped inside white input row) */
            <form className="job10-panel-form job10-panel-form--resume" onSubmit={handleResumeUploadSubmit}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc"
                className="job10-visually-hidden"
                id="resume-file-input"
              />

              <div className="job10-resume-zone-wrapper">
                {!selectedFile ? (
                  <div
                    className={`job10-resume-dropzone ${isDragging ? 'dragging' : ''} ${fileError ? 'has-error' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    aria-label="Drop PDF or DOCX here, or browse"
                  >
                    <UploadCloud size={20} className="job10-resume-zone-icon" aria-hidden="true" />
                    <div className="job10-resume-zone-text">
                      <span className="job10-zone-main">Drop PDF or DOCX here, or <u>browse</u></span>
                      <span className="job10-zone-sub">(Max 5 MB)</span>
                    </div>
                  </div>
                ) : (
                  <div className="job10-resume-selected-box">
                    <FileText size={20} className="job10-resume-file-icon" aria-hidden="true" />
                    <div className="job10-resume-file-details">
                      <div className="job10-resume-file-header">
                        <span className="job10-resume-filename" title={selectedFile.name}>
                          {selectedFile.name}
                        </span>
                        <span className="job10-resume-filesize">
                          ({(selectedFile.size / 1024).toFixed(0)} KB)
                        </span>
                        <span className="job10-resume-status-badge">
                          {isUploading ? `Uploading ${uploadProgress}%` : 'Not uploaded yet'}
                        </span>
                      </div>

                      {isUploading && (
                        <div className="job10-upload-progress-bar" role="progressbar" aria-valuenow={uploadProgress} aria-valuemin={0} aria-valuemax={100}>
                          <div
                            className="job10-upload-progress-fill"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {!isUploading && (
                      <div className="job10-resume-file-actions">
                        <button
                          type="button"
                          className="job10-resume-action-replace"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          className="job10-resume-action-remove"
                          onClick={handleRemoveFile}
                          aria-label="Remove selected resume"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Error Banner with Retry */}
                {fileError && (
                  <div className="job10-resume-error-bar" role="alert">
                    <AlertCircle size={14} className="job10-error-icon" />
                    <span className="job10-error-text">{fileError}</span>
                    <button
                      type="button"
                      className="job10-retry-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>

              {/* Action column with CTA and quiet toggle back link */}
              <div className="job10-resume-cta-col">
                <button
                  type="submit"
                  className="job10-btn-submit"
                  disabled={!selectedFile || isUploading}
                >
                  <span>{isUploading ? 'Uploading...' : config.jobseeker.resumeCtaText}</span>
                </button>
                <button
                  type="button"
                  className="job10-back-to-search-link"
                  onClick={() => onJobseekerModeChange && onJobseekerModeChange('without-resume')}
                >
                  Search jobs instead
                </button>
              </div>
            </form>
          ) : (
            /* SEARCH MODE (Default: Find a Job / Find Talent) */
            <form className="job10-panel-form" onSubmit={handleSearchSubmit}>
              <div className="job10-input-group">
                <label htmlFor="role-input" className="sr-only">
                  {isJobseeker ? 'Job title, skill or keyword' : 'Job role, skill or keyword'}
                </label>
                <Search size={18} className="job10-input-icon" aria-hidden="true" />
                <input
                  id="role-input"
                  type="text"
                  className="job10-input"
                  placeholder={isJobseeker ? 'Job title, skill or keyword' : 'Job role, skill or keyword'}
                  value={roleInput}
                  onFocus={() => onUserInteracted && onUserInteracted()}
                  onChange={(e) => {
                    if (onUserInteracted) onUserInteracted();
                    setRoleInput(e.target.value);
                  }}
                />
              </div>

              <div className="job10-input-group">
                <label htmlFor="category-select" className="sr-only">Category</label>
                <LayoutGrid size={18} className="job10-input-icon" aria-hidden="true" />
                <select
                  id="category-select"
                  className="job10-input job10-select"
                  value={category}
                  onFocus={() => onUserInteracted && onUserInteracted()}
                  onChange={(e) => {
                    if (onUserInteracted) onUserInteracted();
                    setCategory(e.target.value);
                  }}
                >
                  {currentConfig.inputs.categoryOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="job10-select-arrow" aria-hidden="true" />
              </div>

              <div className="job10-input-group">
                <label htmlFor="location-input" className="sr-only">Location</label>
                <MapPin size={18} className="job10-input-icon" aria-hidden="true" />
                <input
                  id="location-input"
                  type="text"
                  className="job10-input"
                  placeholder="Location"
                  value={locationInput}
                  onFocus={() => onUserInteracted && onUserInteracted()}
                  onChange={(e) => {
                    if (onUserInteracted) onUserInteracted();
                    setLocationInput(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="job10-btn-submit">
                <span>{isJobseeker ? config.jobseeker.searchCtaText : config.recruiter.ctaText}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
