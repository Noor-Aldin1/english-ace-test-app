
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { GraduationCap, Target, Shield, Users, BookOpen, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Hero ── */}
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-foreground/8 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5 sm:mb-6">
            About EnglishAce
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground mb-4 sm:mb-5">
            Assess. Improve.{' '}
            <span className="text-gradient">Excel.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl sm:max-w-2xl mx-auto">
            EnglishAce combines proven language assessment methodology with modern technology to deliver the most accurate English proficiency testing experience available.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-foreground/5 mb-10 sm:mb-12 animate-slide-up" style={{ animationDelay: '80ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-0 md:divide-x divide-border/50">
            {[
              { value: 50000, suffix: '+', label: 'Assessments Taken' },
              { value: 98,    suffix: '%', label: 'Accuracy Rating' },
              { value: 6,     suffix: '',  label: 'CEFR Levels' },
              { value: 4,     suffix: '',  label: 'Skill Areas' },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="text-center px-2 sm:px-4">
                <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission ── */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-foreground/5 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '120ms' }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                At EnglishAce, our mission is to provide accessible, accurate, and comprehensive English proficiency testing to learners worldwide. We believe understanding your current level is the first step toward meaningful improvement.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Founded by language experts and educational technologists, EnglishAce combines proven assessment methodologies with modern technology to deliver a testing experience that is both rigorous and user-friendly.
              </p>
            </div>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight text-center mb-6 sm:mb-8">
            How Our Test <span className="text-gradient">Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 stagger">
            {[
              {
                icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10 border-primary/15',
                title: 'Test Structure',
                items: ['25 questions across key English skills', '25-minute time limit (60 seconds per question)', 'Questions randomly drawn from a large bank', 'Covers grammar, vocabulary, reading & listening'],
              },
              {
                icon: GraduationCap, color: 'text-accent', bg: 'bg-teal-500/10 border-teal-500/15',
                title: 'Proficiency Levels',
                items: ['A1 Beginner: Basic phrases and expressions', 'A2 Elementary: Simple everyday communication', 'B1 Intermediate: Most everyday situations', 'B2+ Advanced: Fluent, near-native mastery'],
              },
            ].map(({ icon: Icon, color, bg, title, items }) => (
              <div key={title} className={`glass-card rounded-2xl p-5 sm:p-6 border ${bg} animate-slide-up`}>
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{title}</h3>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 mt-0.5 ${color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skill Areas ── */}
        <div className="mb-10 sm:mb-12 animate-slide-up" style={{ animationDelay: '160ms' }}>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight text-center mb-6 sm:mb-8">
            Four Skill <span className="text-gradient-teal">Areas Evaluated</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: BookOpen,  label: 'Grammar',    desc: 'Tenses, sentence structure, verb forms',  from: 'from-violet-600/20 to-violet-500/10 border-violet-500/15', iconColor: 'text-violet-500', iconBg: 'bg-violet-500/15' },
              { icon: Target,    label: 'Vocabulary', desc: 'Word knowledge, context, synonyms',        from: 'from-teal-600/20 to-teal-500/10 border-teal-500/15',   iconColor: 'text-teal-500',   iconBg: 'bg-teal-500/15' },
              { icon: BarChart3, label: 'Reading',    desc: 'Comprehension, inference, analysis',      from: 'from-blue-600/20 to-blue-500/10 border-blue-500/15',   iconColor: 'text-blue-500',   iconBg: 'bg-blue-500/15' },
              { icon: Shield,    label: 'Listening',  desc: 'Audio comprehension and detail',          from: 'from-fuchsia-600/20 to-fuchsia-500/10 border-fuchsia-500/15', iconColor: 'text-fuchsia-500', iconBg: 'bg-fuchsia-500/15' },
            ].map(({ icon: Icon, label, desc, from, iconColor, iconBg }) => (
              <div key={label} className={`glass-card rounded-2xl p-4 sm:p-5 border bg-gradient-to-br ${from} card-hover`}>
                <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center mb-2.5 sm:mb-3`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-foreground/5 mb-10 sm:mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-3 sm:mb-4">Our Team</h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                EnglishAce was developed by a passionate team of linguists, educators, and software developers committed to creating the best language assessment tools.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Our test questions are designed by certified language teachers with years of experience in English instruction and assessment. All content undergoes rigorous review for accuracy and relevance.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-foreground/8 text-center animate-slide-up relative overflow-hidden" style={{ animationDelay: '240ms' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, hsl(var(--primary) / 0.07) 0%, transparent 70%)' }} />
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3 relative z-10">
            Ready to test your <span className="text-gradient">English?</span>
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 relative z-10 text-sm sm:text-base">
            Create a free account and discover your proficiency level in under 30 minutes.
          </p>
          <Link to="/signup" id="about-cta-btn"
            className="relative z-10 inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl grad-primary text-white font-semibold shadow-glow-violet hover:opacity-90 transition-all shimmer group text-sm sm:text-base">
            Get Started Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
