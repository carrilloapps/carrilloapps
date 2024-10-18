import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faGithub, faAppStore } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        {t('global.portfolio')}
      </h1>
      <div className="mt-2 min-w-[100%] grid grid-cols-3 gap-3">
        <a className="flex flex-col p-5 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://play.google.com/store/apps/dev?id=8943017062797876162">
          <FontAwesomeIcon icon={faGooglePlay} className="text-white h-10 w-auto" />
          <div className="mt-4 text-center">
            <div className="text-sm md:text-lg font-bold text-white">Play Store</div>
            <div className="hidden md:flex text-xs text-gray-400 text-ellipsis">Página de desarrollador en Google Play</div>
          </div>
        </a>

        <a className="flex flex-col p-5 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://play.google.com/store/apps/dev?id=8943017062797876162">
          <FontAwesomeIcon icon={faAppStore} className="text-white h-10 w-auto" />
          <div className="mt-4 text-center">
            <div className="text-sm md:text-lg font-bold text-white">App Store</div>
            <div className="hidden md:flex text-xs text-gray-400 text-ellipsis">Página de desarrollador en App Store</div>
          </div>
        </a>

        <a className="flex flex-col p-5 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://github.com/carrilloapps">
          <FontAwesomeIcon icon={faGithub} className="text-white h-10 w-auto" />
          <div className="mt-4 text-center">
            <div className="text-sm md:text-lg font-bold text-white">GitHub</div>
            <div className="hidden md:flex text-xs text-gray-400 text-ellipsis">Perfil con README y repos de GitHub</div>
          </div>
        </a>
      </div>
    </div>
  );
}
