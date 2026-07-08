
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Product: [
      { label: 'Home',            to: '/' },
      { label: 'Take Assessment', to: '/test' },
      { label: 'About Us',        to: '/about' },
    ],
    Account: [
      { label: 'Login',   to: '/login' },
      { label: 'Sign Up', to: '/signup' },
    ],
  };

  return (
    <footer className="relative border-t border-border/50 bg-background mt-auto overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-px grad-aurora opacity-30" />

      {/* Ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-24 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'hsl(var(--primary) / 0.07)' }} />

      <div className="container py-10 sm:py-12 md:py-16 relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand column — spans 2 cols on mobile */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group w-fit">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg grad-primary shadow-glow-violet flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="font-bold text-base sm:text-lg text-foreground">
                English<span className="text-gradient">Ace</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
              The most accurate AI-powered English placement test. Get instant CEFR evaluation and personalised insights.
            </p>
            <div className="flex items-center gap-2 mt-1">
              {[
                { icon: Github,   label: 'GitHub' },
                { icon: Twitter,  label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} aria-label={label}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg glass border border-foreground/8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/15 transition-all duration-200">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                {category}
              </h3>
              <ul className="flex flex-col gap-2">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-0.5 inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground/40">
            © {currentYear} EnglishAce. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground/30">
            <span>Built with</span>
            <span className="text-gradient mx-1">♥</span>
            <span>for English learners worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
