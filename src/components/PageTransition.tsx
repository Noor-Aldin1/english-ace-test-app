import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDuration: '0.4s' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
