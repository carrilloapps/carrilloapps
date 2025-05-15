# Translation and Localization Guide

This document provides guidelines for translating and localizing content in the CarrilloApps project.

## Overview

The CarrilloApps website supports multiple languages to serve a global audience. Currently, the site is available in:

- English (en-US) - Primary language
- Spanish (es-ES) - Secondary language

This guide outlines the process for managing translations and ensuring a consistent experience across languages.

## File Structure

Translations are stored in JSON files under the `/public/locales` directory:

```
/public/locales/
  /en-US/
    common.json
    blog.json
    services.json
    contact.json
  /es-ES/
    common.json
    blog.json
    services.json
    contact.json
```

## Translation Keys

Translation keys should:

1. Be descriptive and follow a hierarchical structure
2. Use camelCase notation
3. Group related content together

Example:
```json
{
  "header": {
    "home": "Home",
    "about": "About Me",
    "services": "Services",
    "blog": "Blog",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "© 2025 José Carrillo. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  }
}
```

## Adding New Translations

When adding new content:

1. First add the content to the primary language file (en-US)
2. Then add corresponding translations to all other language files
3. Use a placeholder like `[NEEDS TRANSLATION]` for content that hasn't been translated yet

## Using Translations in Components

Translations are accessed using the `useTranslation` hook:

```tsx
import { useTranslation } from 'next-i18next';

export function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('header.home')}</h1>
      <p>{t('welcomeMessage')}</p>
    </div>
  );
}
```

## Date, Time and Number Formatting

Always use localized formatting for:

1. **Dates**: Use the `format` function from `date-fns` with proper locale
2. **Numbers**: Use `Intl.NumberFormat` with appropriate locale
3. **Currency**: Use `Intl.NumberFormat` with currency option

Example:
```tsx
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

// Select locale based on current language
const locales = { 'en-US': enUS, 'es-ES': es };
const currentLocale = locales[router.locale || 'en-US'];

// Format date
const formattedDate = format(new Date(), 'PPP', { locale: currentLocale });

// Format number
const formattedNumber = new Intl.NumberFormat(router.locale || 'en-US').format(1000);

// Format currency
const formattedCurrency = new Intl.NumberFormat(router.locale || 'en-US', {
  style: 'currency',
  currency: 'USD'
}).format(19.99);
```

## Right-to-Left (RTL) Support

While the current languages are left-to-right (LTR), the site is designed to support RTL languages when needed:

1. Use CSS logical properties when appropriate (`margin-inline-start` instead of `margin-left`)
2. Use CSS flexbox and grid which adapt well to RTL layouts
3. Use `dir` attribute on HTML elements when language direction changes

## Translation Quality Guidelines

1. **Accuracy**: Translations should accurately convey the meaning of the source text
2. **Cultural Appropriateness**: Consider cultural context in translations
3. **Consistency**: Use consistent terminology throughout the site
4. **Natural Flow**: Translations should read naturally in the target language
5. **Technical Accuracy**: Special attention to technical terms

## Adding a New Language

To add support for a new language:

1. Create a new directory under `/public/locales` with the appropriate language code
2. Copy all JSON files from the English version
3. Translate all strings in these files
4. Update the language selector component to include the new language
5. Add language metadata to the supported languages configuration

## Translation Management

1. **Review Process**: All translations should be reviewed by a native speaker
2. **Updates**: When source content changes, all language versions should be updated
3. **Flagging**: Use a system to flag outdated translations that need review

## SEO Considerations

1. Each language version has properly localized metadata (title, description)
2. Implement hreflang tags for language alternatives
3. Ensure URLs follow a consistent pattern for language versions

## Testing Translations

1. Visual inspection of all pages in each language
2. Check for text overflow or layout issues caused by text length differences
3. Verify that date, time, and number formats are correct
4. Test search functionality with localized content

## Resources for Translators

1. **Glossary**: Maintain a glossary of technical terms and their translations
2. **Style Guide**: Provide a style guide for each language
3. **Context Information**: Provide screenshots or descriptions to clarify context for translators

## Contact for Translation Issues

For questions or issues related to translations, please contact José Carrillo at junior@carrillo.app.
