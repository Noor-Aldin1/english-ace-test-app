
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, UserPlus, Eye, EyeOff, ArrowRight, Check, User } from 'lucide-react';

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { label: 'Weak',      color: 'from-red-500 to-red-400',           width: '20%' },
    { label: 'Fair',      color: 'from-amber-500 to-yellow-400',       width: '40%' },
    { label: 'Good',      color: 'from-blue-500 to-cyan-400',          width: '65%' },
    { label: 'Strong',    color: 'from-teal-500 to-green-400',         width: '85%' },
    { label: 'Excellent', color: 'from-violet-500 to-teal-400',        width: '100%' },
  ];
  return { ...map[Math.min(score, 4)], score };
};

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const pwStrength = password ? getPasswordStrength(password) : null;
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const validateName = (val: string) => {
    if (!val.trim()) return 'Name is required';
    if (val.trim().length < 2) return 'Name must be at least 2 characters';
    if (val.trim().length > 50) return 'Name must be 50 characters or less';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const nErr = validateName(name);
    if (nErr) { setNameError(nErr); return; }
    if (!password || !confirmPassword) { setError('All fields are required'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setIsSubmitting(true);
    try {
      const success = await signup(name.trim(), password);
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
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, hsl(var(--accent) / 0.10) 0%, hsl(var(--primary) / 0.06) 60%, transparent 100%)' }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl animate-orb"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full blur-3xl animate-orb-delayed"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)' }}
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
            Start your English<br />
            <span className="text-gradient-teal">assessment today</span>
          </h2>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '60ms' }}>
            Free forever. No credit card. Get your CEFR level in 25 questions.
          </p>

          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '120ms' }}>
            {[
              '25 adaptive questions across 4 skills',
              'Instant CEFR level (A1 → C2)',
              'Detailed performance charts',
              'Auto-save & resume anytime',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full grad-teal flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-6 animate-slide-up">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-8 w-8 rounded-lg grad-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">English<span className="text-gradient">Ace</span></span>
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl grad-teal shadow-glow-teal mb-4">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">Create account</h1>
            <p className="text-muted-foreground text-sm">Just your name and a password to get started.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl border border-destructive/25 bg-destructive/8 text-sm text-destructive flex items-center gap-2 animate-scale-in">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="signup-name" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Full Name <span className="text-destructive ml-0.5">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (nameError) setNameError(''); }}
                  onBlur={() => setNameError(validateName(name))}
                  placeholder="e.g. Alex Johnson"
                  required
                  autoComplete="name"
                  maxLength={50}
                  className={`${inputBase} pl-11 ${nameError ? 'border-destructive/60' : ''}`}
                />
              </div>
              {nameError && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                  {nameError}
                </p>
              )}
              <p className="text-[10px] text-muted-foreground/60">This will be your unique identifier for login.</p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Password <span className="text-destructive ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className={`${inputBase} pr-12`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && pwStrength && (
                <div className="mt-2 space-y-1">
                  <div className="h-1 rounded-full bg-border overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${pwStrength.color} transition-all duration-500`} style={{ width: pwStrength.width }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Strength: <span className={`font-medium ${pwStrength.score >= 3 ? 'text-teal-500' : 'text-amber-500'}`}>{pwStrength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="signup-confirm" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Confirm Password <span className="text-destructive ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className={`${inputBase} pr-12 ${
                    confirmPassword
                      ? passwordsMatch
                        ? 'border-teal-500/40 focus:border-teal-500/60 focus:shadow-[0_0_0_3px_hsl(168_76%_48%/0.12)]'
                        : 'border-destructive/40 focus:border-destructive/60 focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.1)]'
                      : ''
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {confirmPassword && passwordsMatch && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full grad-teal flex items-center justify-center animate-scale-in">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden py-3.5 px-6 rounded-xl text-sm font-semibold text-white grad-primary shadow-glow-violet hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none mt-2 shimmer group flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:opacity-80 font-medium transition-opacity">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
