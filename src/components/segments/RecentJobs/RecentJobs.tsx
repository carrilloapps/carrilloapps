import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RecentJobs() {
  const { t } = useTranslation();

  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        {t('global.recentJobs')}
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-2 min-w-[100%]">
        {[1,2,3].map((index) => (
          <a key={index} className="flex flex-row gap-x-5 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.youtube.com/channel/uciwxfli0q78rqlmogbyve-g">
          <div className="text-start">
            <img src="https://placehold.co/300x250" alt="" className="rounded-t-xl w-[100%] h-auto" />
            <div className="px-3 py-2">
            <div className="text-sm md:text-lg font-bold text-white">Sky Airline</div>
            <div className="text-xs text-gray-400 text-ellipsis">Desarrollo de aplicacion movil</div>
            </div>
          </div>
        </a>
        ))}
      </div>
      <div className="flex items-center justify-center cursor-pointer transition duration-350 text-stone-400 hover:text-orange-200">
        <span>{t('global.loadMore')}</span>
        <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
      </div>
    </div>
  );
}
