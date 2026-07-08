import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  triggerOnMount?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1800,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  triggerOnMount = true,
}) => {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggerOnMount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [triggerOnMount, started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const startValue = 0;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const value = startValue + (target - startValue) * eased;

      setCurrent(parseFloat(value.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{current.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

export default AnimatedCounter;
