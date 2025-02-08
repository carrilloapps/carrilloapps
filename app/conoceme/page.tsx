import { Button } from "@/components/ui/button"
import Image from "next/image"
import {SharedMetadata} from "@/app/shared-metadata";
import { Metadata } from "next";
import { LibraryBig, HandHelping, GitGraphIcon } from "lucide-react";

export const metadata: Metadata = {
  ...SharedMetadata,
  title: 'Conóceme - José Carrillo',
  description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  keywords: ['José Carrillo', 'banking', 'fintech', 'ecommerce'],
  alternates: {
    ...SharedMetadata.alternates,
    canonical: "/conoceme",
    languages: {
      'es-CO': '/conoceme',
      'en-US': '/en/about',
    },
  },
  openGraph: {
    ...SharedMetadata.openGraph,
    type: 'profile',
    url: '/conoceme',
    title: 'Junior Carrillo, desarrollador fullstack senior',
    description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  },
  twitter: {
    ...SharedMetadata.twitter,
    title: 'Junior Carrillo, desarrollador fullstack senior',
    description: 'Conoce sobre lo que hago y como puedo ayudarte a convertirte en un experto del banking, fintech y ecommerce.',
  }
}

export default function AboutPage() {
  const metrics = [
    {
      icon: <HandHelping size={48} />,
      value: '+10',
      description: 'Años de experiencia',
    },
    {
      icon: <GitGraphIcon size={48} />,
      value: '~3.000',
      description: "Commit's al año",
    },
    {
      icon: <LibraryBig size={48} />,
      value: '+450',
      description: "Repo's soportados",
    },
  ];


  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center rounded-2xl">
          <div className="flex-shrink-0">
            <Image
              src="https://avatars.githubusercontent.com/u/16759783?v=4"
              alt="José Carrillo"
              className="rounded-full object-cover"
              width={300}
              height={300}
            />
          </div>

          <div className="md:ml-8 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold">Hola, soy Junior Carrillo</h1>
            <p className="mt-4">
              Tengo 28 años y desde muy temprana edad entendí lo fácil que me resultaba el
              entendimiento de los sistemas, telecomunicaciones y electrónica. Vivo en Medellín
              (Colombia) desde 2019 y en los últimos años he trabajado desde Developer hasta
              mi actual cargo de Developer Lead.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Descargar CV
            </button>
          </div>
        </div>

        <div className="pt-12 pb-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-blue-600 mb-6">
                    {metric.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">{metric.value}</h3>
                  <p className="text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

