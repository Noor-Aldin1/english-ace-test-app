import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`
        relative flex items-center justify-center w-9 h-9 rounded-xl
        glass border transition-all duration-200
        hover:border-foreground/20 hover:bg-foreground/5
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-violet-500
        ${className}
      `}
    >
      {/* Sun icon — visible in dark mode */}
      <Sun
        className={`absolute h-4 w-4 text-amber-400 transition-all duration-300 ${
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
        }`}
      />
      {/* Moon icon — visible in light mode */}
      <Moon
        className={`absolute h-4 w-4 text-violet-600 transition-all duration-300 ${
          isDark ? 'opacity-0 scale-75 -rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
