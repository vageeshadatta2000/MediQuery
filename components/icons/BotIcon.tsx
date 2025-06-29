
import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3H6.5A2.5 2.5 0 004 5.5v13A2.5 2.5 0 006.5 21H18a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0018 3h-1.5M8 3V1.5A1.5 1.5 0 019.5 0h5A1.5 1.5 0 0116 1.5V3M8 3h8"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6" />
  </svg>
);

export default BotIcon;
