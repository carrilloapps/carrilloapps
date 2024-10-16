import React from 'react';
import TopBar from './components/TopBar';
import PresentationCard from './components/PresentationCard';

export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar simple />
      <div className="p-10 flex flex-col justify-center items-center">
      <PresentationCard
          greeting="José Carrillo"
          subtitle="Senior Software Engineering"
          imageUrl="https://avatars.githubusercontent.com/u/16759783?v=4"
          links={{
            instagram: 'https://www.instagram.com/fluxstudio.ve',
            facebook: 'https://www.facebook.com/fluxstudio.ve',
            whatsapp: 'https://wa.me/+584127786458',
          }}
        />
      <h1 className="text-3xl font-bold text-white">
        Hello world!
      </h1>
      </div>
    </div>
  );
}
