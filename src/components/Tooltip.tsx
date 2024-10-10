import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  if (!content) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-900'}`}
             style={{
               bottom: 'calc(100% + 5px)',
               left: '50%',
               transform: 'translateX(-50%)',
               whiteSpace: 'nowrap'
             }}>
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;