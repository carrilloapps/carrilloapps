import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

export default function Newsletter() {
  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        Newsletter
      </h1>
      <div className="mt-2 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://carrillo.app/blog">
          <FontAwesomeIcon icon={faNewspaper} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Resumen de Noticias</div>
            <div className="text-xs text-gray-400 text-ellipsis">El resumen del mejor contenido de la semana</div>
          </div>
        </a>

      </div>
    </div>
  );
}
