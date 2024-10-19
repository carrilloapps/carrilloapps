import React from "react";

import Portfolio from "./components/segments/Portfolio";
import Community from "./components/segments/Community";
import SkillsAndFeatures from "./components/segments/SkillsAndFeatures";
import Contributions from "./components/segments/Contributions";
import Newsletter from "./components/segments/Newsletter";
import Footer from "./components/structure/Footer";
import Header from "./components/structure/Header";
import ProfileCard from "./components/segments/ProfileCard";
import "./i18n";
import RecentJobs from "./components/segments/RecentJobs";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-10 pt-10 grid grid-flow-row-reverse grid-cols-1 md:grid-cols-12 gap-4 md:flex-row">
        <div className="flex flex-col col-span-7">
          <RecentJobs />
        </div>
        <div className="flex flex-col justify-center items-center col-span-5">
          <ProfileCard />
          <div className="max-w-[500px]">
            <Portfolio />
            <Community />
            <SkillsAndFeatures />
            <Contributions />
            <Newsletter />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
