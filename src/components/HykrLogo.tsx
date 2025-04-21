
import React from 'react';

interface HykrLogoProps {
  className?: string;
}

export const HykrLogo: React.FC<HykrLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
      >
        <circle cx="25" cy="25" r="23" fill="#20B2AA" />
        <path
          d="M15 18L25 10L35 18L35 32L25 40L15 32L15 18Z"
          fill="#FFFFFF"
          stroke="#4CAF50"
          strokeWidth="2"
        />
        <path
          d="M25 10L25 40"
          stroke="#4CAF50"
          strokeWidth="2"
        />
        <path
          d="M15 18L35 32"
          stroke="#4CAF50"
          strokeWidth="2"
        />
        <path
          d="M35 18L15 32"
          stroke="#4CAF50"
          strokeWidth="2"
        />
      </svg>
      <span className="ml-2 text-2xl font-bold text-hykr-teal">Hykr</span>
    </div>
  );
};
