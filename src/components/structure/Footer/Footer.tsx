import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHeart, faCode, faUsers } from '@fortawesome/free-solid-svg-icons';

import Logo from '../Logo';

export default function Footer() {
  return (
    <div className="my-10 flex flex-col text-center items-center text-neutral-300 max-w-[400px]">
      <Logo />
      <a href="/legal" className="hover:text-orange-200 mt-4">&copy; 2021 - {(new Date()).getFullYear()} <span className="text-orange-200">carrillo.app by José Carrillo</span> v3</a>
      <div className="mt-2 text-xs max-w-[300px]">BUILDING SOFTWARE WITH <FontAwesomeIcon icon={faHeart} className="text-red-600 h-3 w-auto" /> FROM COLOMBIA BY A VENEZUELAN FOR THE WORLD <FontAwesomeIcon icon={faCode} className="text-white h-3 w-auto" /> AND <FontAwesomeIcon icon={faUsers} className="text-white h-3 w-auto" />.</div>
    </div>
  );
}