"use client";

import dynamic from 'next/dynamic';
import { SpinnerLoading } from './unified-loading';

// Heavy components that should be lazy loaded
export const DynamicDisqusComments = dynamic(
  () => import('./disqus-comments').then(mod => ({ default: mod.DisqusComments })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <SpinnerLoading />
      </div>
    ),
    ssr: false
  }
);

export const DynamicProjectDialog = dynamic(
  () => import('./project-dialog').then(mod => ({ default: mod.ProjectDialog })),
  {
    loading: () => null,
    ssr: false
  }
);

export const DynamicCookieConsent = dynamic(
  () => import('./cookie-consent').then(mod => ({ default: mod.CookieConsent })),
  {
    loading: () => null,
    ssr: false
  }
);

export const DynamicNewsletterForm = dynamic(
  () => import('./newsletter-form').then(mod => ({ default: mod.NewsletterForm })),
  {
    loading: () => (
      <div className="h-12 bg-zinc-800 rounded animate-pulse"></div>
    ),
    ssr: false
  }
);
