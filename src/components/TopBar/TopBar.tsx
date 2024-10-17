import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCode } from '@fortawesome/free-solid-svg-icons';

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
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="min-w-full text-center sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black">
        <p className="text-white p-2 font-light text-ellipsis">
          Experiencia desarrollando en <TextTransition className="text-orange-200 font-bold" inline springConfig={presets.slow}>{TEXTS[index % TEXTS.length]}</TextTransition>
        </p>
      </div>
      <div className="min-w-full bg-[#282828]">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">

          {/* Logo */}
          <div className="flex items-center gap-0.5">
            <span className="ml-3 text-3xl font-semibold text-white">carrillo</span>
            <div className="flex flex-row items-center text-orange-200 gap-0.5">
              <FontAwesomeIcon icon={faCircle} className="h-2 pt-2 w-auto" />
              <span className="text-3xl font-semibold">app</span>
            </div>
          </div>

          {simple ? null : (
            <React.Fragment>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white">Inicio</a>
                <a href="#" className="text-gray-300 hover:text-white">Servicios</a>
                <a href="#" className="text-gray-300 hover:text-white">Sobre mi</a>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
                <a href="#" className="text-gray-300 hover:text-white">Contacto</a>
              </nav>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-gray-300 hover:text-white transition duration-150" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </React.Fragment>
          )}
        </div>

        {simple ? null : (
          <React.Fragment>
            {/* Mobile Navigation */}
            {menuOpen && (
              <nav className="md:hidden bg-[#252525] text-white transition duration-150">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">Inicio</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">Servicios</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">Sobre mi</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">Blog</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">Contacto</a>
              </nav>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
