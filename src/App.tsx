import React from 'react';

import Portfolio from './components/segments/Portfolio';
import Community from './components/segments/Community';
import SkillsAndFeatures from './components/segments/SkillsAndFeatures';
import Contributions from './components/segments/Contributions';
import Newsletter from './components/segments/Newsletter';
import Footer from './components/structure/Footer';
import Header from './components/structure/Header';
import ProfileCard from './components/segments/ProfileCard';
import './i18n';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-10 flex flex-col justify-center items-center">
        <ProfileCard />
        <div className="container max-w-[520px]">
          <Portfolio />
          <Community />
          <SkillsAndFeatures />
          <Contributions />
          <Newsletter />
        </div>
        <Footer />
      </div>
    </div >
  );
}
