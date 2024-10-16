import React, {useEffect} from 'react';
import TextTransition, { presets } from 'react-text-transition';

interface Props {
  simple?: boolean;
}

const TEXTS = [
  'React Native & Expo',
  'React.js & Next.js',
  'Vue.js & Nuxt.js',
  'Node.js & Deno',
  'Golang & Rust',
  'Python & Django',
  'Java & Kotlin',
  'Swift & Objective-C',
  'PostgreSQL & MySQL',
  'Redis & MongoDB',
  'Docker & Kubernetes',
  'AWS & GCP',
  'Tailwind CSS & Styled Components',
  'Jest & Testing Library',
  'Git & GitHub',
  'Agile & Scrum',
  'TDD & CI/CD',
  'GraphQL & REST',
  'OAuth2 & JWT',
  'Firebase & Twilio',
  'Stripe & PayPal',
  'PWA & AMP',
  'SEO & Analytics',
  'Performance & Security',
  'Responsive & Dark Mode',
  'Internationalization & Localization',
  'WebSockets & WebRTC',
  'Open Source & Community',
  'Open Banking & Open Finance',
]

export default function TopBar({ simple }: Props) {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="min-w-full text-center sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black">
      <p className="text-white p-2 font-light">
        Experiencia desarrollando en <TextTransition className="text-orange-200 font-bold" inline springConfig={presets.slow}>{TEXTS[index % TEXTS.length]}</TextTransition>
      </p>
    </div>
  );
}

