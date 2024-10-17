import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faInstagram, faTiktok, faFacebookF, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface Props {
  imageUrl: string;
  name: string;
  subtitle: string;
  links?: {
    github?: string;
    xTwitter?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
  };
}

export default function PresentationCard({ imageUrl, name, subtitle, links }: Props) {
  return (
    <div className="rounded-lg mb-10 w-120 text-center flex flex-col items-center text-gray-100 max-w-[520px]">
      <div className="mb-5 flex flex-row gap-4 align-center min-w-[100%]">
        <img src={imageUrl} alt="Avatar" className="border-4 border-orange-200 rounded-full w-24 h-24 bg-indigo-50" />
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold font-montserrat text-white">{name}</h1>
          <p className="mt-1 text-sm font-light text-orange-200">{subtitle}</p>
          {links ? (
            <div className="items-start mt-3 flex flex-row justify-center space-x-3 md:space-x-6">
              {links.github ? (
                <a href={links.github} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="h-5 w-auto" />
                </a>
              ) : null}
              {links.xTwitter ? (
                <a href={links.xTwitter} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} className="h-5 w-auto" />
                </a>
              ) : null}
              {links.instagram ? (
                <a href={links.instagram} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-auto" />
                </a>
              ) : null}
              {links.facebook ? (
                <a href={links.facebook} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} className="h-5 w-auto" />
                </a>
              ) : null}
              {links.tiktok ? (
                <a href={links.tiktok} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faTiktok} className="h-5 w-auto" />
                </a>
              ) : null}
              {links.linkedin ? (
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-auto" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row gap-5 text-sm justify-between items-stretch">
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-orange-200">9+</strong> años de experiencia
        </div>
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-orange-200">100+</strong> proyectos realizados
        </div>
        <div className="flex flex-col md:flex-row md:gap-1">
          <strong className="text-orange-200">10K+</strong> seguidores totales
        </div>
      </div>
      <div className="mt-5 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-red-400 hover:bg-red-400 transition duration-150 rounded-xl" href="#">
          <FontAwesomeIcon icon={faYoutube} size="xl" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Próxima transmisión en vivo</div>
            <div className="text-xs text-orange-200 text-ellipsis">Sábado 2 de noviembre del 2024, a las 13:00 hora de Colombia</div>
          </div>
        </a>
      </div>
      <div className="mt-5 max-w-[100%] text-left text-ellipsis">
        <p>Soy ingeniero de software y actualmente trabajo como <strong>Freelancer
          Full-Stack Developer</strong> para iOS y Android con <strong>React Native</strong>.
          Además, <em>creo contenido formativo sobre programación</em> en redes sociales y hago Streams
          en mi canal de YouTube cada semana.</p>
      </div>
      <div className="mt-5 min-w-[100%]">
        <a className="flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-pink-700 hover:bg-pink-700 transition duration-150 rounded-xl" href="/cv.pdf">
          <FontAwesomeIcon icon={faDownload} size="xl" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Descargar CV</div>
            <div className="text-xs text-gray-400 text-ellipsis">Curriculum Vitae actualizado</div>
          </div>
        </a>

        <a className="mt-5 flex flex-row gap-x-5 p-2 px-5 pb-4 items-center border-2 border-teal-700 hover:bg-teal-800 transition duration-150 rounded-xl" href="/cv.pdf">
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
          <div className="text-start">
            <div className="text-sm md:text-lg font-bold text-white">Aquí puedes contactarme</div>
            <div className="text-xs text-gray-400 text-ellipsis">Click aquí o escribeme a junior@carrillo.app</div>
          </div>
        </a>
      </div>
    </div>
  );
}

