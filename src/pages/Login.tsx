
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, LogIn, Eye, EyeOff, ArrowRight, User } from 'lucide-react';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateName = (val: string) => {
    if (!val.trim()) return 'Name is required';
    if (val.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateName(name);
    if (err) { setNameError(err); return; }
    if (!password) return;
    setIsSubmitting(true);
    try {
      const success = await login(name.trim(), password);
      if (success) navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl border text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none transition-all duration-200 bg-background/60 backdrop-blur-sm focus:border-primary/50 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)] border-border';

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-10 xl:p-16">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, hsl(var(--primary) / 0.12) 0%, hsl(218 90% 62% / 0.06) 50%, transparent 100%)' }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-orb"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-orb-delayed"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-md stagger">
          <Link to="/" className="flex items-center gap-2.5 mb-10 group w-fit">
            <div className="h-9 w-9 rounded-xl grad-primary shadow-glow-violet flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl text-foreground tracking-tight">
              English<span className="text-gradient">Ace</span>
            </span>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-black text-foreground tracking-tighter mb-4 animate-slide-up leading-tight">
            Welcome back to<br />
            <span className="text-gradient">your journey</span>
          </h2>
          <p className="text-muted-foreground text-base mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '60ms' }}>
            Continue where you left off. Your progress, results, and profile are waiting.
          </p>

          <div className="glass-card rounded-2xl p-5 border border-foreground/5 animate-float" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full grad-teal flex items-center justify-center text-white font-bold shrink-0">S</div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed italic">
                  "EnglishAce gave me the exact feedback I needed. Got my B2 on the first try!"
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">— Sara M., ESL Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 md:p-12">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-8 w-8 rounded-lg grad-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">English<span className="text-gradient">Ace</span></span>
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl grad-primary shadow-glow-violet mb-4">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">Sign in</h1>
            <p className="text-muted-foreground text-sm">Enter your name and password to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name field */}
            <div className="space-y-1.5">
              <label htmlFor="login-name" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                <input
                  id="login-name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (nameError) setNameError(''); }}
                  onBlur={() => setNameError(validateName(name))}
                  placeholder="Your registered name"
                  required
                  autoComplete="name"
                  className={`${inputBase} pl-11 ${nameError ? 'border-destructive/60 focus:border-destructive/80 focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.1)]' : ''}`}
                />
              </div>
              {nameError && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                  {nameError}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isSubmitting || !name || !password}
              className="relative w-full overflow-hidden py-3.5 px-6 rounded-xl text-sm font-semibold text-white grad-primary shadow-glow-violet hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none mt-2 shimmer group flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:opacity-80 font-medium transition-opacity">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
