export interface ResumeValidationOptions {
  allowedExtensions: string[];
  maxSizeBytes: number;
}

export function validateResumeFile(
  file: File,
  options: ResumeValidationOptions = {
    allowedExtensions: ['.pdf', '.docx', '.doc'],
    maxSizeBytes: 5 * 1024 * 1024,
  }
): string | null {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!options.allowedExtensions.includes(ext)) {
    return `Invalid format (${ext}). Please select a PDF or DOCX document.`;
  }
  if (file.size > options.maxSizeBytes) {
    const mb = (options.maxSizeBytes / (1024 * 1024)).toFixed(0);
    return `File exceeds ${mb}MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
  }
  return null;
}

export interface ResumeSubmitPayload {
  file: File;
  targetHref: string;
  audience?: string;
  role?: string;
  category?: string;
  location?: string;
}

export function submitResumeHandoff({
  file,
  targetHref,
  audience = 'jobseeker',
  role,
  category,
  location,
}: ResumeSubmitPayload): void {
  const currentUrlParams = new URLSearchParams(window.location.search);
  const targetUrl = new URL(targetHref, window.location.origin);

  // Preserve UTM and existing parameters
  currentUrlParams.forEach((val, key) => {
    targetUrl.searchParams.set(key, val);
  });

  targetUrl.searchParams.set('audience', audience);
  targetUrl.searchParams.set('hasResume', 'true');
  targetUrl.searchParams.set('resumeName', file.name);
  if (role && role.trim()) targetUrl.searchParams.set('role', role.trim());
  if (category && category !== 'Category') targetUrl.searchParams.set('category', category);
  if (location && location.trim()) targetUrl.searchParams.set('location', location.trim());

  window.location.href = targetUrl.toString();
}
