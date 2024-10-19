import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { useTranslation } from 'react-i18next';
import { FlagBR, FlagES, FlagUS } from '../../../assets/icons';
import Logo from '../Logo';

interface Props {
  simple?: boolean;
}

export default function Header({ simple }: Props) {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearInterval(intervalId);
  }, []);

  const texts: string[] = t('global.header.texts', { returnObjects: true });
  const menu: string[] = t('global.header.menu', { returnObjects: true });
  const subtitle: string = t('global.header.subtitle');

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setLanguageMenuOpen(false);
    setMenuOpen(false);
  };

  const flags: { [key: string]: string } = {
    es: FlagES,
    en: FlagUS,
    pt: FlagBR,
  };

  return (
    <div>
      <div className="min-w-full text-center sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black">
        <p className="text-white p-2 font-light text-ellipsis">
          {subtitle}{' '}
          <TextTransition className="text-orange-200 font-bold" inline springConfig={presets.slow}>
            {texts[index % texts.length]}
          </TextTransition>
        </p>
      </div>
      <div className="min-w-full bg-[#282828] relative">
        <div className="container mx-auto flex justify-between items-center pt-4 pb-6 px-2">
          <Logo />
          {simple ? null : (
            <React.Fragment>
              <nav className="hidden md:flex space-x-6">
                {menu.map((item: string, idx: number) => (
                  <a key={idx} href="#" className="mt-2.5 text-gray-300 hover:text-white">
                    {item}
                  </a>
                ))}
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                      className="mt-1 inline-flex justify-center w-full rounded-md border border-orange-200 shadow-sm px-4 py-2 bg-[#252525] text-sm font-medium text-gray-300 hover:bg-stone-600 focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <img src={flags[language]} alt={language} className="h-5 w-5 mr-2" />
                      <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {languageMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={() => handleLanguageChange('es')} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <img src={FlagES} alt="Español" className="h-5 w-5 mr-2" />
                          Español
                        </button>
                        <button onClick={() => handleLanguageChange('en')} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <img src={FlagUS} alt="English" className="h-5 w-5 mr-2" />
                          English
                        </button>
                        <button onClick={() => handleLanguageChange('pt')} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <img src={FlagBR} alt="Português" className="h-5 w-5 mr-2" />
                          Português
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
              <button
                className="md:hidden text-gray-300 hover:text-white transition duration-150"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </React.Fragment>
          )}
        </div>
        {simple ? null : (
          <React.Fragment>
            {menuOpen && (
              <nav className="md:hidden bg-[#252525] text-white transition duration-150">
                <div className="flex justify-center gap-4 p-2">
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className={`flex items-center ${language === 'es' ? 'grayscale-0' : 'grayscale'}`}
                    aria-label="Español"
                  >
                    <img src={FlagES} alt="Español" className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`flex items-center ${language === 'en' ? 'grayscale-0' : 'grayscale'}`}
                    aria-label="English"
                  >
                    <img src={FlagUS} alt="English" className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pt')}
                    className={`flex items-center ${language === 'pt' ? 'grayscale-0' : 'grayscale'}`}
                    aria-label="Português"
                  >
                    <img src={FlagBR} alt="Português" className="h-8 w-8" />
                  </button>
                </div>
                {menu.map((item: string, idx: number) => (
                  <a key={idx} href="#" className="block px-4 py-2 text-sm hover:bg-gray-600">
                    {item}
                  </a>
                ))}
              </nav>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
