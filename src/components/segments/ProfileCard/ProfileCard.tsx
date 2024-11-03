import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faInstagram, faTiktok, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {faDownload, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import NextStream from "../NextStream";

export default function ProfileCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg mb-10 w-120 text-center flex flex-col items-center text-gray-100 max-w-[520px]"
         role="region" aria-labelledby="profile-title">
      <div className="mb-5 flex flex-row gap-4 align-center min-w-[100%]">
        <img src={t('profile.photoUrl')} alt={`Foto de ${t('profile.name')}`}
             className="border-4 border-blue-400 rounded-full w-24 h-24 bg-indigo-50" loading="lazy"/>
        <div className="flex flex-col items-start">
          <h1 id="profile-title" className="text-3xl font-bold font-montserrat text-white">{t('profile.name')}</h1>
          <p className="mt-1 text-sm font-light text-blue-400">{t('profile.subtitle')}</p>
          <div className="items-start mt-3 flex flex-row justify-center space-x-3 md:space-x-6">
            <a href={t('profile.socialNetworks.github')} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="h-5 w-auto"/>
            </a>
            <a href={t('profile.socialNetworks.xTwitter')} target="_blank" rel="noopener noreferrer"
               aria-label="X Twitter">
              <FontAwesomeIcon icon={faXTwitter} className="h-5 w-auto"/>
            </a>
            <a href={t('profile.socialNetworks.instagram')} target="_blank" rel="noopener noreferrer"
               aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-auto"/>
            </a>
            <a href={t('profile.socialNetworks.facebook')} target="_blank" rel="noopener noreferrer"
               aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} className="h-5 w-auto"/>
            </a>
            <a href={t('profile.socialNetworks.tiktok')} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FontAwesomeIcon icon={faTiktok} className="h-5 w-auto"/>
            </a>
            <a href={t('profile.socialNetworks.linkedin')} target="_blank" rel="noopener noreferrer"
               aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-auto"/>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 text-sm justify-between items-stretch">
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-blue-400">9+</strong> {t('profile.yearsOfExperience')}
        </div>
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-blue-400">100+</strong> {t('profile.projects')}
        </div>
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-blue-400">10K+</strong> {t('profile.followers')}
        </div>
      </div>
      <NextStream/>
      <div
        className="mt-5 max-w-[100%] text-left text-ellipsis"
        dangerouslySetInnerHTML={{__html: t('profile.aboutMeDescription')}}/>
      <div className="mt-5 min-w-[100%]">
        <a
          className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-blue-800 hover:bg-blue-800 transition duration-150 rounded-xl"
          href={`${t('profile.website.url')}/cv.pdf`} title={`Descargar CV de ${t('profile.name')}`}
          aria-label="Descargar CV">
          <FontAwesomeIcon icon={faDownload} size="xl"/>
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">{t('profile.buttons.downloadCV.cta')}</div>
            <div className="text-xs text-gray-400 text-ellipsis">{t('profile.buttons.downloadCV.description')}</div>
          </div>
        </a>
      </div>
      <a
        className="mt-5 min-w-[100%] flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl"
        href={t('profile.website.url')} title={t('profile.visitMe')} aria-label={t('profile.visitMe')}>
        <FontAwesomeIcon icon={faGlobe} size="xl" className="text-white"/>
        <div className="text-start">
          <div className="text-sm md:text-lg font-bold text-white">{t('profile.website.cta')}</div>
          <div className="text-xs text-gray-400 text-ellipsis">{t('profile.website.description')}</div>
        </div>
      </a>
    </div>
  );
}
