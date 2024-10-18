import React from 'react';

export default function SkillsAndFeatures() {
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
  );
}
