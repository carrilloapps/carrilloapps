import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import technologies from './technologies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function SkillsAndFeatures() {
  const { t } = useTranslation();
  const [visibleRows, setVisibleRows] = useState(4);
  const totalRows = Math.ceil(technologies.length / 4);

  const handleToggleRows = () => {
    setVisibleRows(visibleRows < totalRows ? totalRows : 4);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 min-w-full">
      <h1 className="text-2xl font-bold text-white text-start">{t('global.skills')}</h1>
      <div className="mt-2 grid grid-cols-6 sm:grid-cols-4 md:grid-cols-8 gap-4 transition-opacity duration-500">
        {technologies.slice(0, visibleRows * 4).map((it, i) => (
          <div key={i} className="flex justify-center items-center bg-white p-2 rounded-xl transform transition-transform duration-300 hover:scale-105">
            <img src={it.imageUrl} alt={it.alt} width={20} height={20} className="h-auto w-full transition duration-300" />
          </div>
        ))}
      </div>
      <div 
        onClick={handleToggleRows} 
        className="mt-4 flex items-center justify-center cursor-pointer transition duration-350 text-stone-400 hover:text-orange-200"
      >
        <span>{visibleRows < totalRows ? t('global.loadMore') : t('global.viewLess')}</span>
        <FontAwesomeIcon icon={visibleRows < totalRows ? faArrowDown : faArrowUp} className="ml-2" />
      </div>
    </div>
  );
}
