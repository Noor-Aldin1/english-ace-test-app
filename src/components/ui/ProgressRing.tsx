import React, { useEffect, useRef } from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
  animate?: boolean;
  glowColor?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 160,
  strokeWidth = 8,
  color = 'url(#ringGradient)',
  trackColor = 'hsl(240 5% 14%)',
  children,
  animate = true,
  glowColor = 'hsl(258 90% 68% / 0.4)',
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const uniqueId = React.useId().replace(/:/g, '');

  useEffect(() => {
    if (!animate || !circleRef.current) return;

    const circle = circleRef.current;
    circle.style.strokeDashoffset = String(circumference);

    const timer = setTimeout(() => {
      circle.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
      circle.style.strokeDashoffset = String(offset);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage, circumference, offset, animate]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`ringGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(258, 90%, 68%)" />
            <stop offset="50%" stopColor="hsl(218, 90%, 62%)" />
            <stop offset="100%" stopColor="hsl(168, 76%, 48%)" />
          </linearGradient>
          <filter id={`glow-${uniqueId}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#ringGradient-${uniqueId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          filter={`url(#glow-${uniqueId})`}
        />
      </svg>

      {/* Center content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
