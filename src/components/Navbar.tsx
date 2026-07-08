
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, LogOut, User, Menu, X, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    ...(isAuthenticated ? [{ to: '/test', label: 'Assessment' }] : []),
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-navbar shadow-[0_1px_20px_hsl(0_0%_0%/0.15)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0" aria-label="EnglishAce Home">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg grad-primary shadow-glow-violet group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-foreground">
              English<span className="text-gradient">Ace</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive(to)
                    ? 'text-foreground bg-foreground/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute inset-x-3 bottom-1 h-[1.5px] rounded-full grad-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-foreground/8">
                  <div className="h-5 w-5 rounded-full grad-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {user?.name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <span className="text-sm text-foreground/80 font-medium max-w-[100px] lg:max-w-[140px] truncate">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-foreground/5 transition-all duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-foreground/5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="relative overflow-hidden px-3 lg:px-4 py-2 text-sm font-semibold text-white rounded-lg grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer group"
                >
                  Get Started
                  <ChevronRight className="inline h-3.5 w-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute top-16 left-0 right-0 glass-card border-t border-foreground/5 p-4 flex flex-col gap-1 animate-slide-down mx-0"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive(to)
                    ? 'text-foreground bg-foreground/8 border border-foreground/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-foreground/5 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-sm text-left text-muted-foreground hover:text-foreground rounded-xl hover:bg-foreground/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-3 text-sm font-medium text-center text-foreground/70 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-3 text-sm font-semibold text-center text-white rounded-xl grad-primary shadow-glow-violet"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
