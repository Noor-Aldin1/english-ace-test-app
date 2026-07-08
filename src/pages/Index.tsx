import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import {
  ArrowRight, Brain, Target, Shield, Zap, BarChart3,
  BookOpen, Headphones, Star, ChevronRight, CheckCircle2,
} from 'lucide-react';

const CEFRLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelColors = [
  'from-slate-500 to-slate-400',
  'from-blue-600 to-blue-400',
  'from-cyan-600 to-teal-400',
  'from-violet-600 to-violet-400',
  'from-fuchsia-600 to-violet-500',
  'from-violet-500 to-indigo-400',
];

const features = [
  {
    icon: Brain, title: 'AI-Adaptive Engine',
    description: 'Our intelligent question bank selects a unique, balanced set of questions for every session — no two exams are alike.',
    gradient: 'from-violet-600/20 to-indigo-600/20', iconGradient: 'from-violet-500 to-indigo-500',
  },
  {
    icon: BarChart3, title: 'Instant CEFR Insights',
    description: 'Receive your proficiency level and a detailed breakdown of grammar, vocabulary, reading, and listening skills the moment you finish.',
    gradient: 'from-teal-600/20 to-cyan-600/20', iconGradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Shield, title: 'Auto-Save & Resume',
    description: 'Your session is securely stored locally. Pick up exactly where you left off — even if you close the browser.',
    gradient: 'from-fuchsia-600/20 to-violet-600/20', iconGradient: 'from-fuchsia-500 to-violet-500',
  },
];

const stats = [
  { value: 50, suffix: 'K+', label: 'Assessments Taken' },
  { value: 98, suffix: '%', label: 'Accuracy Rating' },
  { value: 4, suffix: '', label: 'Skills Evaluated' },
  { value: 25, suffix: 'Q', label: 'Per Assessment' },
];

const skillAreas = [
  { icon: BookOpen, label: 'Grammar',    color: 'text-violet-400' },
  { icon: Target,   label: 'Vocabulary', color: 'text-teal-400' },
  { icon: BarChart3,label: 'Reading',    color: 'text-blue-400' },
  { icon: Headphones,label:'Listening',  color: 'text-fuchsia-400' },
];

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)', animation: 'orb 14s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.10) 0%, transparent 70%)', animation: 'orb 18s ease-in-out 3s infinite' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-20 sm:opacity-30 pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 stagger">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
            <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
            <span>AI-Powered Adaptive Assessment Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-[1.05] tracking-tighter animate-slide-up">
            Discover Your{' '}
            <span className="text-gradient-aurora block mt-1">True English</span>
            <span className="text-foreground/90"> Level.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '80ms' }}>
            The most precise English proficiency platform. Take a 25-question adaptive assessment
            and get instant CEFR certification with a detailed skill breakdown.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '160ms' }}>
            {isAuthenticated ? (
              <Link to="/test" id="hero-cta-start"
                className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-xl grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer group">
                Start Assessment <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <>
                <Link to="/signup" id="hero-cta-signup"
                  className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-xl grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer group">
                  Start for Free <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/login" id="hero-cta-login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-muted-foreground rounded-xl glass border border-foreground/10 hover:text-foreground hover:border-foreground/20 transition-all duration-200">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex -space-x-2">
              {['V','A','K','M'].map((l, i) => (
                <div key={i} className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `hsl(${200 + i * 40}, 70%, 50%)` }}>{l}</div>
              ))}
            </div>
            <span>Join <strong className="text-foreground/70">50,000+</strong> learners worldwide</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
            </div>
          </div>
        </div>

        {/* Floating score card */}
        <div className="relative z-10 mt-12 sm:mt-16 w-full max-w-[320px] sm:max-w-sm mx-auto px-4 sm:px-0 animate-float" style={{ animationDelay: '200ms' }}>
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-foreground/5 shadow-[0_24px_48px_hsl(0_0%_0%/0.25)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium">Assessment Result</p>
                <p className="text-lg sm:text-2xl font-black text-foreground mt-0.5">B2 Upper Intermediate</p>
              </div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                <svg width="100%" height="100%" viewBox="0 0 64 64" className="-rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="url(#heroGrad)" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray="163.4" strokeDashoffset="40" />
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(258,90%,68%)" />
                      <stop offset="100%" stopColor="hsl(168,76%,48%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-black text-foreground">76%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {skillAreas.map(({ icon: Icon, label, color }) => (
                <div key={label} className="glass rounded-lg sm:rounded-xl p-2 sm:p-2.5 text-center">
                  <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mx-auto mb-1 ${color}`} />
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-10 sm:py-12 border-y border-border/50">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-0 md:divide-x divide-border/50">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="text-center px-2 sm:px-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 stagger">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-foreground/8 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5 sm:mb-6 animate-fade-in">
              Why EnglishAce
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4 animate-slide-up">
              Everything you need to{' '}
              <span className="text-gradient">know your level</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '80ms' }}>
              Built for learners who want real, actionable insights — not just a number.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto stagger">
            {features.map(({ icon: Icon, title, description, gradient, iconGradient }) => (
              <div key={title}
                className="group glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover border border-foreground/5 animate-slide-up">
                <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} border border-foreground/8 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-br ${iconGradient} rounded-md sm:rounded-lg flex items-center justify-center`}>
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEFR Levels ── */}
      <section className="py-12 sm:py-16 border-y border-border/50">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground/80 mb-2">
              Which level are <span className="text-gradient">you?</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">6 internationally recognised CEFR proficiency levels</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-2xl mx-auto">
            {CEFRLevels.map((level, i) => (
              <div key={level} className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-white font-bold text-sm bg-gradient-to-r ${levelColors[i]} shadow-md`}>
                {level}
              </div>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center gap-6 sm:gap-8 text-xs text-muted-foreground/60">
            <span>← Beginner</span><span>Advanced →</span>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              Three steps to{' '}
              <span className="text-gradient-teal">your results</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 stagger">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds — just your name and a password.', icon: '🚀' },
              { step: '02', title: 'Take the Test',  desc: '25 adaptive questions across 4 skill areas. ~25 minutes.', icon: '✍️' },
              { step: '03', title: 'Get Your Report',desc: 'Instant CEFR level, score, and detailed skill breakdown.', icon: '📊' },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="relative glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 card-hover border border-foreground/5 animate-slide-up">
                <div className="absolute -top-3 -left-1 text-4xl font-black text-foreground/5 select-none">{step}</div>
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{icon}</div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }} />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-16 border border-foreground/8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              Ready to find out{' '}
              <span className="text-gradient">where you stand?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Join thousands who have already discovered their true English level. Takes less than 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/test" id="cta-take-test"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-xl grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer group">
                  Take Assessment Now <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link to="/signup" id="cta-get-started"
                    className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-xl grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer group">
                    Get Started for Free <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link to="/about"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground rounded-xl glass border border-foreground/10 hover:border-foreground/20 transition-all duration-200">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground/50">
              {['No credit card', 'Instant results', 'Free forever'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
