import React from 'react';
import { useTranslation } from 'react-i18next';


export default function Donate() {
  const { t } = useTranslation();

  return (
    <div className="mb-5 flex flex-col gap-4 align-center justify-center min-w-[100%] bg-yellow-400 text-stone-800 h-20 rounded-xl">
      <p className="text-2xl font-bold text-center">
        {t('global.loadMore')}
      </p>
    </div>
  );
}
