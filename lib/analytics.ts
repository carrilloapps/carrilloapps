/**
 * Analytics Tracking Utilities
 * 
 * Helper functions for tracking events in Google Analytics 4 and Microsoft Clarity.
 * 
 * @see https://developers.google.com/analytics/devguides/collection/ga4/events
 * @see https://docs.microsoft.com/en-us/clarity/
 */

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

/**
 * Track button click events
 */
export function trackButtonClick(
  buttonName: string,
  location: string,
  additionalParams?: Record<string, string | number | boolean>
) {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: location,
    ...additionalParams,
  });
}

/**
 * Track navigation events
 */
export function trackNavigation(
  linkName: string,
  destination: string,
  location: "header" | "footer" | "sidebar" | "content"
) {
  trackEvent("navigation_click", {
    link_name: linkName,
    link_destination: destination,
    link_location: location,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(
  linkName: string,
  url: string,
  category: "social" | "resource" | "portfolio" | "other"
) {
  trackEvent("outbound_link_click", {
    link_name: linkName,
    link_url: url,
    link_category: category,
    transport_type: "beacon",
  });
}

/**
 * Track form interactions
 */
export function trackFormStart(formName: string) {
  trackEvent("form_start", {
    form_name: formName,
  });
}

export function trackFormSubmit(
  formName: string,
  success: boolean,
  errorMessage?: string
) {
  trackEvent("form_submit", {
    form_name: formName,
    form_status: success ? "success" : "error",
    ...(errorMessage && { error_message: errorMessage }),
  });
}

export function trackFormFieldInteraction(
  formName: string,
  fieldName: string
) {
  trackEvent("form_field_interaction", {
    form_name: formName,
    field_name: fieldName,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(
  fileName: string,
  fileType: string,
  fileUrl: string
) {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
    file_url: fileUrl,
  });
}

/**
 * Track search events
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent("search", {
    search_term: searchTerm,
    ...(resultsCount !== undefined && { results_count: resultsCount }),
  });
}

/**
 * Track video interactions
 */
export function trackVideoPlay(videoTitle: string, videoUrl: string) {
  trackEvent("video_play", {
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

export function trackVideoComplete(videoTitle: string, videoUrl: string) {
  trackEvent("video_complete", {
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  trackEvent("scroll_depth", {
    scroll_percentage: percentage,
  });
}

/**
 * Track engagement time (custom metric)
 */
export function trackEngagement(
  contentType: string,
  contentName: string,
  timeSpent: number
) {
  trackEvent("content_engagement", {
    content_type: contentType,
    content_name: contentName,
    time_spent_seconds: timeSpent,
  });
}

/**
 * Track CTA (Call-to-Action) clicks
 */
export function trackCTAClick(
  ctaName: string,
  ctaType: "primary" | "secondary" | "tertiary",
  ctaLocation: string
) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_type: ctaType,
    cta_location: ctaLocation,
  });
}

/**
 * Track social media interactions
 */
export function trackSocialClick(
  platform: string,
  action: "profile_visit" | "share" | "follow",
  url: string
) {
  trackEvent("social_interaction", {
    social_platform: platform,
    social_action: action,
    social_url: url,
  });
}

/**
 * Track errors or exceptions
 */
export function trackError(
  errorMessage: string,
  errorLocation: string,
  fatal: boolean = false
) {
  trackEvent("exception", {
    description: errorMessage,
    error_location: errorLocation,
    fatal: fatal,
  });
}

/**
 * Track page section views (for long pages)
 */
export function trackSectionView(sectionName: string, sectionId: string) {
  trackEvent("section_view", {
    section_name: sectionName,
    section_id: sectionId,
  });
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSignup(
  email: string,
  source: string,
  success: boolean
) {
  trackEvent("newsletter_signup", {
    email_domain: email.split("@")[1] || "unknown",
    signup_source: source,
    signup_status: success ? "success" : "failed",
  });
}

/**
 * Track project/portfolio interactions
 */
export function trackProjectView(
  projectName: string,
  projectCategory: string
) {
  trackEvent("project_view", {
    project_name: projectName,
    project_category: projectCategory,
  });
}

export function trackProjectLinkClick(
  projectName: string,
  linkType: "github" | "gitlab" | "demo" | "case_study"
) {
  trackEvent("project_link_click", {
    project_name: projectName,
    link_type: linkType,
  });
}

/**
 * Track blog interactions
 */
export function trackBlogPostView(
  postTitle: string,
  postCategory: string,
  readingTime?: number
) {
  trackEvent("blog_post_view", {
    post_title: postTitle,
    post_category: postCategory,
    ...(readingTime && { estimated_reading_time: readingTime }),
  });
}

export function trackBlogPostShare(
  postTitle: string,
  sharePlatform: string
) {
  trackEvent("blog_post_share", {
    post_title: postTitle,
    share_platform: sharePlatform,
  });
}

/**
 * Microsoft Clarity custom tags (if needed)
 */
export function clarityTag(key: string, value: string) {
  if (typeof window !== "undefined") {
    const w = window as Window & { clarity?: (...args: unknown[]) => void };
    if (w.clarity) {
      w.clarity("set", key, value);
    }
  }
}

/**
 * Microsoft Clarity identify user (for session tracking)
 */
export function clarityIdentify(userId: string, sessionId?: string) {
  if (typeof window !== "undefined") {
    const w = window as Window & { clarity?: (...args: unknown[]) => void };
    if (w.clarity) {
      w.clarity("identify", userId, sessionId);
    }
  }
}
