import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitch, faGooglePlay, faGithub, faAppStore, faGolang, faReact, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faRss, faCircle, faNewspaper, faHeart, faCode, faUsers } from '@fortawesome/free-solid-svg-icons';

import TopBar from './components/TopBar';
import PresentationCard from './components/PresentationCard';

export default function App() {

  const technologies = [
    // Lenguajes de Programación
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/typescript/typescript-plain.svg", alt: "TypeScript" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/go/go-original-wordmark.svg", alt: "Go" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/python/python-original.svg", alt: "Python" },
    { imageUrl: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg", alt: "Kotlin" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", alt: "Java" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/bash/bash-original.svg", alt: "Bash" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/php/php-original.svg", alt: "PHP" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/rust/rust-original.svg", alt: "Rust" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/swift/swift-original.svg", alt: "Swift" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/ruby/ruby-original.svg", alt: "Ruby" },

    // Frameworks
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/nestjs/nestjs-original.svg", alt: "nestjs" },
    { imageUrl: "https://www.chartjs.org/media/logo-title.svg", alt: "chartjs" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/d3js/d3js-original.svg", alt: "d3js" },
    { imageUrl: "https://cdn.worldvectorlogo.com/logos/django.svg", alt: "django" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg", alt: "express" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/electron/electron-original.svg", alt: "electron" },
    { imageUrl: "https://raw.githubusercontent.com/prplx/svg-logos/5585531d45d294869c4eaab4d7cf2e9c167710a9/svg/materialize.svg", alt: "materialize" },
    { imageUrl: "https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg", alt: "mocha" },
    { imageUrl: "https://raw.githubusercontent.com/simple-icons/simple-icons/6e46ec1fc23b60c8fd0d2f2ff46db82e16dbd75f/icons/cypress.svg", alt: "cypress" },
    { imageUrl: "https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg", alt: "jest" },
    { imageUrl: "https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg", alt: "kafka" },

    // Bases de Datos
    { imageUrl: "https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg", alt: "mariadb" },
    { imageUrl: "https://www.vectorlogo.zone/logos/apache_cassandra/apache_cassandra-icon.svg", alt: "cassandra" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg", alt: "mongodb" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg", alt: "mysql" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/postgresql/postgresql-plain.svg", alt: "postgresql" },
    { imageUrl: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", alt: "firebase" },
    { imageUrl: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg", alt: "elasticsearch" },

    // Otros
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg", alt: "docker" },
    { imageUrl: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", alt: "git" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg", alt: "html5" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg", alt: "css3" },
    { imageUrl: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg", alt: "jenkins" },
    { imageUrl: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg", alt: "kubernetes" },
    { imageUrl: "https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg", alt: "heroku" },
    { imageUrl: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", alt: "gcp" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/windows11/windows11-original.svg", alt: "windows" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", alt: "linux" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/apple/apple-original.svg", alt: "macos" },
    { imageUrl: "https://api.iconify.design/logos-hugo.svg", alt: "hugo" },
    { imageUrl: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg", alt: "figma" },
    { imageUrl: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg", alt: "grafana" },
    { imageUrl: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg", alt: "graphql" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/androidstudio/androidstudio-original.svg", alt: "Android Studio" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/xcode/xcode-original.svg", alt: "XCode" },
    { imageUrl: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "aws" },
    { imageUrl: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg", alt: "azure" }
  ];

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

        <div className="container max-w-[520px]">

        <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
            <h1 className="text-2xl font-bold text-white text-start">
              Portafolio
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

          <div className="mb-5 flex flex-col gap-4 align-center min-w-[100%]">
            <h1 className="text-2xl font-bold text-white text-start">
              Skills &amp; Features
            </h1>
            <div className="mt-2 min-w-[100%] grid grid-cols-4 md:grid-cols-8 gap-4">
              {technologies.map((it, i) => (
                <div key={i} className="flex justify-center items-center bg-white p-2 rounded-xl">
                  <img src={it.imageUrl} alt={it.alt} className="h-auto w-[100%] transition duration-300" />
                </div>
              ))}
            </div>
          </div>

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
        </div>

        <div className="my-10 flex flex-col text-center items-center text-neutral-300 max-w-[400px]">
          <div className="flex items-center gap-0.5">
            <span className="ml-3 text-3xl font-semibold text-white">carrillo</span>
            <div className="flex flex-row items-center text-orange-200 gap-0.5">
              <FontAwesomeIcon icon={faCircle} className="h-2 pt-2 w-auto" />
              <span className="text-3xl font-semibold">app</span>
            </div>
          </div>
          <a href="/legal" className="hover:text-orange-200 mt-4">&copy; 2021 - {(new Date()).getFullYear()} <span className="text-orange-200">carrillo.app by José Carrillo</span> v3</a>
          <div className="mt-2 text-xs max-w-[300px]">BUILDING SOFTWARE WITH <FontAwesomeIcon icon={faHeart} className="text-red-600 h-3 w-auto" /> FROM COLOMBIA BY A VENEZUELAN FOR THE WORLD <FontAwesomeIcon icon={faCode} className="text-white h-3 w-auto" /> AND <FontAwesomeIcon icon={faUsers} className="text-white h-3 w-auto" />.</div>
        </div>
      </div>
    </div >
  );
}
