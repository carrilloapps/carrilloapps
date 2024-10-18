import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';

export default function Community() {
  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        Comunidad
      </h1>
      <div className="mt-2 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.youtube.com/channel/uciwxfli0q78rqlmogbyve-g">
          <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
            <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://carrillo.app/blog">
          <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
            <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.twitch.tv/carrilloapps">
          <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
            <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
          </div>
        </a>
      </div>
    </div>
  );
}
