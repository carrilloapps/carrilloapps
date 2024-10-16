import React from 'react';

interface Props {
  imageUrl: string;
  greeting: string;
  subtitle: string;
  links?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export default function PresentationCard({ imageUrl, greeting, subtitle, links }: Props) {
  return (
    <div className="rounded-lg mb-10 w-120 text-center flex flex-col items-center text-white">
      <div className="border border-gray-700 rounded-full mb-5">
        <img src={imageUrl} alt="Avatar" className="rounded-full w-48 h-48 bg-indigo-50" />
      </div>
      <h1 className="text-3xl font-bold font-montserrat">{greeting}</h1>
      <p className="mt-2 mb-4 text-sm font-light text-orange-200">{subtitle}</p>
      {links ? (
        <div className="flex justify-center space-x-3">
          {links.instagram ? (
            <a href={links.instagram} target="_blank" rel="noreferrer">
              <div>*</div>
            </a>
          ) : null}
          {links.facebook ? (
            <a href={links.facebook} target="_blank" rel="noreferrer">
              <div>*</div>
            </a>
          ) : null}
          {links.whatsapp ? (
            <a href={links.whatsapp} target="_blank" rel="noreferrer">
              <div>*</div>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

