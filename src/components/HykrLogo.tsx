
import React from 'react';

interface HykrLogoProps {
  className?: string;
}

export const HykrLogo: React.FC<HykrLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="ml-0 text-2xl font-bold tracking-tight" style={{ color: "#007cff" }}>Hykr</span>
    </div>
  );
};
