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

// Featured Projects - Heavy component with API calls and animations
export const DynamicFeaturedProjects = dynamic(
  () => import('./featured-projects').then(mod => ({ default: mod.FeaturedProjects })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <SpinnerLoading />
      </div>
    ),
    ssr: false
  }
);

// Featured Repositories - Heavy component with API calls
export const DynamicFeaturedRepositories = dynamic(
  () => import('./featured-repositories').then(mod => ({ default: mod.FeaturedRepositories })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <SpinnerLoading />
      </div>
    ),
    ssr: false
  }
);

// Compact Contact Section - Heavy form with validation and animations
export const DynamicCompactContactSection = dynamic(
  () => import('./compact-contact-section').then(mod => ({ default: mod.CompactContactSection })),
  {
    loading: () => (
      <div className="h-96 bg-zinc-900/50 rounded-lg animate-pulse"></div>
    ),
    ssr: false
  }
);

// Tabs Component - Heavy Radix UI primitive
export const DynamicTabs = dynamic(
  () => import('./ui/tabs').then(mod => ({ 
    default: mod.Tabs 
  })),
  {
    loading: () => <div className="h-48 bg-zinc-900/50 rounded-lg animate-pulse"></div>,
    ssr: false
  }
);

export const DynamicTabsContent = dynamic(
  () => import('./ui/tabs').then(mod => ({ default: mod.TabsContent })),
  { ssr: false }
);

export const DynamicTabsList = dynamic(
  () => import('./ui/tabs').then(mod => ({ default: mod.TabsList })),
  { ssr: false }
);

export const DynamicTabsTrigger = dynamic(
  () => import('./ui/tabs').then(mod => ({ default: mod.TabsTrigger })),
  { ssr: false }
);

// Dialog Components - Heavy modals
export const DynamicDialog = dynamic(
  () => import('./ui/dialog').then(mod => ({ default: mod.Dialog })),
  { ssr: false }
);

export const DynamicDialogContent = dynamic(
  () => import('./ui/dialog').then(mod => ({ default: mod.DialogContent })),
  { ssr: false }
);

export const DynamicDialogDescription = dynamic(
  () => import('./ui/dialog').then(mod => ({ default: mod.DialogDescription })),
  { ssr: false }
);

export const DynamicDialogHeader = dynamic(
  () => import('./ui/dialog').then(mod => ({ default: mod.DialogHeader })),
  { ssr: false }
);

export const DynamicDialogTitle = dynamic(
  () => import('./ui/dialog').then(mod => ({ default: mod.DialogTitle })),
  { ssr: false }
);
