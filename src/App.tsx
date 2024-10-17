import React from 'react';
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
        <h1 className="text-3xl font-bold text-white">
          Hello world!
        </h1>
      </div>
    </div>
  );
}
