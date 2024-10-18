import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Community() {
  const { t } = useTranslation();

  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        {t('global.community')}
      </h1>
      <div className="mt-2 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.youtube.com/channel/uciwxfli0q78rqlmogbyve-g">
          <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">{t('global.youtube.title')}</div>
            <div className="text-xs text-gray-400 text-ellipsis">{t('global.youtube.description')}</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://carrillo.app/blog">
          <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">{t('global.blog.title')}</div>
            <div className="text-xs text-gray-400 text-ellipsis">{t('global.blog.description')}</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.twitch.tv/carrilloapps">
          <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">{t('global.twitch.title')}</div>
            <div className="text-xs text-gray-400 text-ellipsis">{t('global.twitch.description')}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
