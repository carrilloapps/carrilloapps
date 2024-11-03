import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Logo() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="ml-3 text-3xl font-semibold text-white">carrillo</span>
      <div className="flex flex-row items-center text-blue-400 gap-0.5">
        <FontAwesomeIcon icon={faCircle} className="h-2 pt-2 w-auto" />
        <span className="text-3xl font-semibold">app</span>
      </div>
    </div>
  );
}
