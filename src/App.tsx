import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';

import TopBar from './components/TopBar';
import PresentationCard from './components/PresentationCard';

export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar simple />
      <div className="p-10 flex flex-col justify-center items-center">
        <PresentationCard
          name="José Carrillo"
          subtitle="Senior Software Engineering"
          imageUrl="https://avatars.githubusercontent.com/u/16759783?v=4"
          links={{
            github: 'https://github.com/carrilloapps',
            xTwitter: 'https://x.com/carrilloapps',
            instagram: 'https://instagram.com/carrillo.apps',
            facebook: 'https://facebook.com/carrillo.apps',
            tiktok: 'https://tiktok.com/@carrillo.apps',
            linkedin: 'https://www.linkedin.com/in/carrilloapps',
          }}
        />

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[520px]">
          <h1 className="text-2xl font-bold text-white text-start">
            Comunidad
          </h1>
          <div className="mt-2 min-w-[100%]">
            <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
                <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
                <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
                <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[520px]">
          <h1 className="text-2xl font-bold text-white text-start">
            Skills
          </h1>
          <div className="mt-2 min-w-[100%]">
            <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
                <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
                <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
                <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[520px]">
          <h1 className="text-2xl font-bold text-white text-start">
            Recursos
          </h1>
          <div className="mt-2 min-w-[100%]">
            <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
                <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
                <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
                <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[520px]">
          <h1 className="text-2xl font-bold text-white text-start">
            Newsletter
          </h1>
          <div className="mt-2 min-w-[100%]">
            <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
                <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
                <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
                <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
              </div>
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[520px]">
          <h1 className="text-2xl font-bold text-white text-start">
            Colaboro con
          </h1>
          <div className="mt-2 min-w-[100%]">
            <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faYoutube} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de YouTube</div>
                <div className="text-xs text-gray-400 text-ellipsis">Contenido nuevo cada semana y directos</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faRss} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Artículos de Blog</div>
                <div className="text-xs text-gray-400 text-ellipsis">Recursos, guias, tutoriales y contenidos diarios</div>
              </div>
            </a>

            <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="/cv.pdf">
              <FontAwesomeIcon icon={faTwitch} size="xl" className="text-white" />
              <div className="text-start">
                <div className="text-sm md:text-lg font-bold text-white">Canal de Twitch</div>
                <div className="text-xs text-gray-400 text-ellipsis">Hackatones semanales, aprende en vivo</div>
              </div>
            </a>
          </div>
        </div>

        <div className="my-10 flex flex-col text-center items-center text-neutral-300 max-w-[400px]">
          <div className="flex items-center gap-0.5">
            <span className="ml-3 text-3xl font-semibold text-white">carrillo</span>
            <div className="flex flex-row items-center text-orange-200 gap-0.5">
              <FontAwesomeIcon icon={faCircle} className="h-2 pt-2 w-auto" />
              <span className="text-3xl font-semibold">app</span>
            </div>
          </div>
          <div className="hover:text-orange-200 mt-4">&copy; 2021 - {(new Date()).getFullYear()} <span className="text-orange-200">carrillo.app by José Carrillo</span> v3</div>
          <div>BUILDING SOFTWARE WITH ♥ FROM COLOMBIA BY A VENEZUELAN FOR THE WORLD.</div>
        </div>
      </div>
    </div>
  );
}
