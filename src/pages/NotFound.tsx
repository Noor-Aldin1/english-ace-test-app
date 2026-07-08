
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.07) 0%, transparent 70%)' }} />

      <Link to="/" className="flex items-center gap-2 mb-12 sm:mb-16 group">
        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl grad-primary shadow-glow-violet flex items-center justify-center group-hover:scale-105 transition-transform">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <span className="font-black text-lg sm:text-xl text-foreground tracking-tight">
          English<span className="text-gradient">Ace</span>
        </span>
      </Link>

      <div className="relative mb-6 sm:mb-8 animate-scale-in">
        <div className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter select-none"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.08))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl sm:rounded-3xl glass border border-foreground/8 flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.15)] animate-float">
            <span className="text-3xl sm:text-4xl">🔍</span>
          </div>
        </div>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3 sm:mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
          This page seems to have gone missing. Let's get you back on track.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '180ms' }}>
        <Link to="/" id="not-found-home-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl grad-primary text-white font-semibold shadow-glow-violet hover:opacity-90 transition-all shimmer group text-sm sm:text-base">
          <Home className="h-4 w-4" /> Go Home
        </Link>
        <button onClick={() => window.history.back()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl glass border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20 font-medium text-sm transition-all duration-200">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
