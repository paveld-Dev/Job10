'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import { FileText, X, AlertCircle, ArrowRight, UploadCloud, CheckCircle2 } from 'lucide-react';
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
    title: 'Find jobs that match your skills.',
    body: 'Upload your resume to discover opportunities tailored to your experience.',
    uploadCtaText: 'Upload & Find Matches →',
    skipCtaText: 'Browse Jobs Without Resume',
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

  // Focus trap and accessibility management
  useEffect(() => {
    if (!isOpen) return;

    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move initial focus to dialog container to avoid default ring on close button
    if (modalRef.current) {
      modalRef.current.focus();
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

    // If no file is selected yet, prompt the file picker directly!
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    if (isUploading) return;

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
        tabIndex={-1}
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
          <X size={17} aria-hidden="true" />
        </button>

        {/* Modal Top Row: Graphic Avatar + Content */}
        <div className="job10-modal-header-row">
          <div className="job10-modal-icon-avatar" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>

          <div className="job10-modal-header-text">
            <span className="job10-modal-badge">Optional</span>
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
              {/* Elegant upload cloud icon bubble */}
              <div className="job10-modal-cloud-bubble" aria-hidden="true">
                <UploadCloud size={24} />
              </div>

              <div className="job10-modal-drop-title">
                Drag &amp; drop your resume here
              </div>

              <div className="job10-modal-browse-sub">
                or <span className="job10-modal-browse-highlight">browse files</span> from your computer
              </div>

              <div className="job10-modal-meta-text">
                PDF or DOCX &nbsp;•&nbsp; Max 5 MB
              </div>
            </div>
          ) : (
            <div className="job10-resume-selected-box job10-modal-selected-box">
              <div className="job10-modal-file-icon-wrap" aria-hidden="true">
                <FileText size={22} className="job10-resume-file-icon" />
              </div>

              <div className="job10-resume-file-details">
                <div className="job10-resume-file-header">
                  <span className="job10-resume-filename" title={selectedFile.name}>
                    {selectedFile.name}
                  </span>
                  <span className="job10-resume-filesize">
                    ({(selectedFile.size / 1024).toFixed(0)} KB)
                  </span>
                </div>

                <div className="job10-resume-status-line">
                  {isUploading ? (
                    <span className="job10-resume-status-badge is-uploading">
                      Uploading {uploadProgress}%
                    </span>
                  ) : (
                    <span className="job10-resume-status-badge is-ready">
                      <CheckCircle2 size={13} aria-hidden="true" />
                      Ready to match
                    </span>
                  )}
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
                    Change
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
              <AlertCircle size={15} className="job10-error-icon" />
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
            disabled={isUploading}
            onClick={handleUploadSubmit}
          >
            <span>
              {isUploading
                ? 'Uploading...'
                : selectedFile
                ? 'Find Matches Now'
                : config.uploadCtaText}
            </span>
            {!isUploading && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
};

