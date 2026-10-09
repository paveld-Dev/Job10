'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import { FileText, X, AlertCircle, ArrowRight } from 'lucide-react';
import { validateResumeFile, submitResumeHandoff } from '@/lib/resumeUpload';

interface ResumePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  uploadTargetHref?: string;
  config?: {
    title: string;
    body: string;
    uploadCtaText: string;
    skipCtaText: string;
  };
  allowedExtensions?: string[];
  maxSizeBytes?: number;
}

export const ResumePromptModal: React.FC<ResumePromptModalProps> = ({
  isOpen,
  onClose,
  onSkip,
  selectedFile,
  onFileSelect,
  uploadTargetHref = '/onboarding/jobseeker',
  config = {
    title: 'Want job matches picked for you?',
    body: 'Optional: upload your resume to discover opportunities matched to your skills.',
    uploadCtaText: 'Upload & Find Matches →',
    skipCtaText: 'Skip, browse jobs',
  },
  allowedExtensions = ['.pdf', '.docx', '.doc'],
  maxSizeBytes = 5 * 1024 * 1024,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descId = useId();

  // Focus trap and previous focus restoration
  useEffect(() => {
    if (!isOpen) return;

    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into dialog on open
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

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

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusedElementRef.current) {
        previousFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    const error = validateResumeFile(file, {
      allowedExtensions,
      maxSizeBytes,
    });
    if (error) {
      setFileError(error);
      onFileSelect(null);
    } else {
      setFileError(null);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setFileError(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || isUploading) return;

    const error = validateResumeFile(selectedFile, {
      allowedExtensions,
      maxSizeBytes,
    });
    if (error) {
      setFileError(error);
      return;
    }

    setIsUploading(true);
    setFileError(null);
    setUploadProgress(20);

    const t1 = setTimeout(() => setUploadProgress(55), 250);
    const t2 = setTimeout(() => setUploadProgress(90), 600);
    const t3 = setTimeout(() => {
      setUploadProgress(100);
      submitResumeHandoff({
        file: selectedFile,
        targetHref: uploadTargetHref,
        audience: 'jobseeker',
      });
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div
      className="job10-modal-overlay"
      onClick={onClose}
      aria-hidden="false"
    >
      <div
        className="job10-resume-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button */}
        <button
          type="button"
          className="job10-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Modal Top Row: Graphic Avatar + Content */}
        <div className="job10-modal-header-row">
          <div className="job10-modal-icon-avatar" aria-hidden="true">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="job10-modal-doc-svg"
            >
              <rect width="36" height="36" rx="18" fill="transparent" />
              {/* Document Outline */}
              <path
                d="M10 7C10 5.89543 10.8954 5 12 5H21L26 10V29C26 30.1046 25.1046 31 24 31H12C10.8954 31 10 30.1046 10 29V7Z"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 5V10H26"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Horizontal Document lines */}
              <path
                d="M14 16H22M14 20H18"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Upload circle badge */}
              <circle cx="23" cy="24" r="5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.8" />
              <path
                d="M23 26V22M21 24L23 22L25 24"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="job10-modal-header-text">
            <div className="job10-modal-badge">Optional</div>
            <h2 id={titleId} className="job10-modal-title">
              {config.title}
            </h2>
            <p id={descId} className="job10-modal-desc">
              {config.body}
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={allowedExtensions.join(',')}
          className="sr-only"
          id="modal-resume-file-input"
        />

        {/* Drop Zone or Selected File */}
        <div className="job10-modal-upload-zone">
          {!selectedFile ? (
            <div
              className={`job10-modal-dropzone-box ${isDragging ? 'dragging' : ''} ${
                fileError ? 'has-error' : ''
              }`}
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
              aria-label="Drag and drop your resume here, or browse files"
            >
              {/* Distinctive stylized upload cloud */}
              <div className="job10-modal-cloud-icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M14 34C10.6863 34 8 31.3137 8 28C8 24.9367 10.3 22.4137 13.3 22.05C14.1 16.35 19 12 25 12C31.5 12 36.8 17.1 37 23.6C39.8 24.3 42 26.9 42 30C42 33.3 39.3 36 36 36M24 24V38M24 24L18 30M24 24L30 30"
                    stroke="url(#modalCloudGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="modalCloudGrad" x1="8" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38BDF8" />
                      <stop offset="0.5" stopColor="#2563EB" />
                      <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="job10-modal-drop-title">
                Drag &amp; drop your resume here
              </div>

              <div className="job10-modal-browse-row">
                <span className="job10-modal-or-text">or</span>
                <span className="job10-modal-browse-pill">Browse files</span>
              </div>

              <div className="job10-modal-meta-text">
                PDF or DOCX &nbsp;•&nbsp; Max 5 MB
              </div>
            </div>
          ) : (
            <div className="job10-resume-selected-box job10-modal-selected-box">
              <FileText size={22} className="job10-resume-file-icon" aria-hidden="true" />
              <div className="job10-resume-file-details">
                <div className="job10-resume-file-header">
                  <span className="job10-resume-filename" title={selectedFile.name}>
                    {selectedFile.name}
                  </span>
                  <span className="job10-resume-filesize">
                    ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </span>
                  <span className="job10-resume-status-badge">
                    {isUploading ? `Uploading ${uploadProgress}%` : 'Selected'}
                  </span>
                </div>

                {isUploading && (
                  <div
                    className="job10-upload-progress-bar"
                    role="progressbar"
                    aria-valuenow={uploadProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
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
                    onClick={handleRemove}
                    aria-label="Remove selected resume"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Error Message with Retry */}
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

        {/* Modal Actions */}
        <div className="job10-modal-actions">
          <button
            type="button"
            className="job10-modal-btn job10-modal-btn--secondary"
            onClick={onSkip}
          >
            {config.skipCtaText}
          </button>

          <button
            type="button"
            className="job10-modal-btn job10-modal-btn--primary"
            disabled={!selectedFile || isUploading}
            onClick={handleUploadSubmit}
          >
            <span>{isUploading ? 'Uploading...' : config.uploadCtaText}</span>
            {!isUploading && <ArrowRight size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
};
