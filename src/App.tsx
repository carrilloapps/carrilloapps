import React from "react";

import "./i18n";

const Portfolio = React.lazy(() => import("./components/segments/Portfolio"));
const Community = React.lazy(() => import("./components/segments/Community"));
const SkillsAndFeatures = React.lazy(
  () => import("./components/segments/SkillsAndFeatures"),
);
const Contributions = React.lazy(
  () => import("./components/segments/Contributions"),
);
const Newsletter = React.lazy(() => import("./components/segments/Newsletter"));
const Footer = React.lazy(() => import("./components/structure/Footer"));
const Header = React.lazy(() => import("./components/structure/Header"));
const ProfileCard = React.lazy(
  () => import("./components/segments/ProfileCard"),
);

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
    </div>
  );
}
