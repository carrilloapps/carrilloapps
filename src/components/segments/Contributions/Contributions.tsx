import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGolang, faReact, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Contributions() {
  const { t } = useTranslation();
  
  return (
    <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
      <h1 className="text-2xl font-bold text-white text-start">
        Colaboro con
      </h1>
      <div className="mt-2 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://github.com/GolangVE">
          <FontAwesomeIcon icon={faGolang} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Golang Venezuela</div>
            <div className="text-xs text-gray-400 text-ellipsis">Miembro fundado de la comunidad</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.facebook.com/groups/reactlatino">
          <FontAwesomeIcon icon={faReact} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">React.js &amp; React Native</div>
            <div className="text-xs text-gray-400 text-ellipsis">Comunidad en español para LATAM</div>
          </div>
        </a>

        <a className="mt-4 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center bg-neutral-800 hover:bg-neutral-700 transition duration-150 rounded-xl" href="https://www.facebook.com/groups/plataforma.node.js.es">
          <FontAwesomeIcon icon={faNodeJs} size="xl" className="text-white" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Node.js en Español</div>
            <div className="text-xs text-gray-400 text-ellipsis">Comunidad hispana de Node.js</div>
          </div>
        </a>
      </div>
    </div>
  );
}
