import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        glass-card rounded-2xl
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${glow ? 'border-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
