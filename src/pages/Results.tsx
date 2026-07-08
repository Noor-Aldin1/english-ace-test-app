import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useTest } from '@/contexts/TestContext';
import { useTheme } from '@/contexts/ThemeContext';
import ProgressRing from '@/components/ui/ProgressRing';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import {
  CheckCircle, XCircle, Trophy, Target, Clock, AlertCircle,
  BarChart3, RotateCcw, TrendingUp, TrendingDown, Award, Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Tooltip as RechartsTooltip, Cell, PieChart, Pie,
} from 'recharts';

/* ── Confetti ── */
const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() => {
    if (!active) return [];
    const colors = ['#8b5cf6','#14b8a6','#f59e0b','#3b82f6','#ec4899','#10b981'];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i, color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, [active]);
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(({ id, color, left, delay, rotation }) => (
        <div key={id} className="absolute w-2 h-2 rounded-sm"
          style={{ left, top: '-20px', backgroundColor: color,
            animation: `confettiDrop ${(Math.random() * 2 + 2).toFixed(1)}s ease-out forwards`,
            animationDelay: delay, transform: `rotate(${rotation})` }} />
      ))}
    </div>
  );
};

/* ── Category styles ── */
const categoryStyle = (cat: string) => {
  switch (cat) {
    case 'Grammar':    return { badge: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20' };
    case 'Vocabulary': return { badge: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/20' };
    case 'Reading':    return { badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20' };
    case 'Listening':  return { badge: 'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20' };
    default:           return { badge: 'bg-foreground/5 text-muted-foreground border-foreground/10' };
  }
};

const Results: React.FC = () => {
  const { score, proficiencyLevel, answers, questions, resetTest, timeRemaining, totalTime } = useTest();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const hasResults = score !== null && proficiencyLevel !== null && questions.length > 0;

  // Chart theme colors
  const chartColors = {
    gridStroke:    isLight ? 'hsl(240,10%,85%)'  : 'hsl(240,5%,18%)',
    tickFill:      isLight ? 'hsl(240,5%,42%)'   : 'hsl(240,5%,55%)',
    tooltipBg:     isLight ? 'hsl(0,0%,100%)'    : 'hsl(240,10%,8%)',
    tooltipBorder: isLight ? 'hsl(240,10%,88%)'  : 'hsl(240,5%,15%)',
    tooltipColor:  isLight ? 'hsl(240,10%,8%)'   : '#fff',
    radarStroke:   isLight ? 'hsl(258,80%,58%)'  : 'hsl(258,90%,68%)',
    radarFill:     isLight ? 'hsl(258,80%,58%)'  : 'hsl(258,90%,68%)',
    pieSeg:        isLight ? ['#14b8a6','#ef4444','#d1d5db'] : ['#14b8a6','#ef4444','#334155'],
  };

  const stats = useMemo(() => {
    if (!hasResults) return null;
    const totalQ = questions.length;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const answeredCount = answers.length;
    const skippedCount = totalQ - answeredCount;
    const incorrectCount = answeredCount - correctCount;
    const timeSpentSeconds = (totalTime ?? 1500) - timeRemaining;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`;

    const catStats: Record<string, { total: number; correct: number }> = {
      grammar: { total: 0, correct: 0 }, vocabulary: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 }, listening: { total: 0, correct: 0 },
    };
    questions.forEach((q) => { if (catStats[q.category]) catStats[q.category].total += 1; });
    answers.forEach((a) => {
      const q = questions.find((q) => q.id === a.questionId);
      if (q && a.isCorrect && catStats[q.category]) catStats[q.category].correct += 1;
    });

    const radarData = Object.keys(catStats).map((key) => {
      const s = catStats[key];
      return { subject: key.charAt(0).toUpperCase() + key.slice(1), score: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0, fullMark: 100 };
    });

    const accuracyData = [
      { name: 'Correct',   value: correctCount,   color: chartColors.pieSeg[0] },
      { name: 'Incorrect', value: incorrectCount, color: chartColors.pieSeg[1] },
      { name: 'Skipped',   value: skippedCount,   color: chartColors.pieSeg[2] },
    ];

    const sorted = [...radarData].sort((a, b) => b.score - a.score);
    const strengths  = sorted.filter((c) => c.score >= 70).map((c) => c.subject);
    const weaknesses = sorted.filter((c) => c.score < 50).map((c) => c.subject);

    return { totalQ, correctCount, incorrectCount, skippedCount, answeredCount, timeSpentFormatted, radarData, accuracyData, strengths, weaknesses };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasResults, questions, answers, timeRemaining, totalTime, theme]);

  useEffect(() => {
    if (score !== null && score >= 80) {
      const t = setTimeout(() => setShowConfetti(true), 600);
      return () => clearTimeout(t);
    }
  }, [score]);

  const getProficiencyDescription = () => {
    if (!proficiencyLevel) return '';
    if (proficiencyLevel.includes('C1') || proficiencyLevel.includes('C2'))
      return 'You have mastered English at an advanced level. Your language skills are exceptional and near-native.';
    if (proficiencyLevel.includes('B2'))
      return 'You have a strong command of English. You can express yourself fluently on complex topics.';
    if (proficiencyLevel.includes('B1'))
      return 'You have a solid working knowledge of English for most everyday professional situations.';
    if (proficiencyLevel.includes('A2'))
      return 'You have a basic understanding. You can communicate in simple and routine tasks.';
    return 'You are beginning your English journey. Focus on core vocabulary and basic grammar.';
  };

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => { const next = new Set(prev); next.has(qId) ? next.delete(qId) : next.add(qId); return next; });
  };

  if (!hasResults || !stats) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-16 sm:py-24 px-4 animate-fade-in">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl glass border border-foreground/8 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-4 tracking-tight">No Results Found</h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8">Complete the assessment first to see your results here.</p>
          <button onClick={() => navigate('/test')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl grad-primary text-white font-semibold shadow-glow-violet hover:opacity-90 transition-all shimmer">
            Take the Assessment
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Confetti active={showConfetti} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">

        {/* ── Header ── */}
        <div className="text-center mb-8 sm:mb-10 animate-slide-up">
          {score! >= 80 && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Outstanding Performance!
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-3">
            Your Assessment <span className="text-gradient">Results</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Review your performance, discover strengths, and see where to improve.
          </p>
        </div>

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5 stagger">

          {/* Score Ring */}
          <div className="md:col-span-2 glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-foreground/5 animate-slide-up">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full glass border border-primary/20 text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4">
                  <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> CEFR Estimate
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 sm:mb-3 tracking-tight">{proficiencyLevel}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto sm:mx-0">
                  {getProficiencyDescription()}
                </p>
              </div>
              <div className="shrink-0">
                <ProgressRing percentage={score!} size={140} strokeWidth={9}>
                  <div className="text-center">
                    <AnimatedCounter target={score!} suffix="%" className="text-3xl sm:text-4xl font-black text-foreground" duration={1600} />
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">Score</p>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-foreground/5 animate-slide-up flex flex-col gap-4" style={{ animationDelay: '60ms' }}>
            <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm">
              <Clock className="h-4 w-4 text-primary" /> Test Summary
            </div>
            <div className="space-y-3 sm:space-y-4 flex-1">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Time Spent</p>
                <p className="text-xl sm:text-2xl font-black text-foreground">{stats.timeSpentFormatted}</p>
              </div>
              <div className="h-px bg-border/50" />
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: 'Total',     value: stats.totalQ,        color: 'text-foreground' },
                  { label: 'Answered',  value: stats.answeredCount, color: 'text-foreground' },
                  { label: 'Correct',   value: stats.correctCount,  color: 'text-teal-500' },
                  { label: 'Incorrect', value: stats.incorrectCount,color: 'text-red-500' },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 uppercase tracking-wider font-medium">{label}</p>
                    <p className={`text-lg sm:text-xl font-black ${color}`}>
                      <AnimatedCounter target={value} duration={1200} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { resetTest(); navigate('/test'); }} id="retake-assessment-btn"
              className="w-full py-2.5 sm:py-3 rounded-xl glass border border-foreground/10 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200 flex items-center justify-center gap-2 group">
              <RotateCcw className="h-4 w-4 group-hover:-rotate-180 transition-transform duration-500" />
              Retake Assessment
            </button>
          </div>
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">

          {/* Radar */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-foreground/5 animate-slide-up" style={{ animationDelay: '120ms' }}>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">Skill Breakdown</h3>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">Performance across all language skills</p>
            <div className="h-[200px] sm:h-[240px] md:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%"  data={stats.radarData}>
                  <PolarGrid stroke={chartColors.gridStroke} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: chartColors.tickFill, fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke={chartColors.radarStroke} fill={chartColors.radarFill} fillOpacity={0.22} strokeWidth={2} />
                  <RechartsTooltip
                    contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '12px', color: chartColors.tooltipColor, fontSize: '12px' }}
                    formatter={(value: number) => [`${value}%`, 'Score']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Accuracy Donut */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-foreground/5 animate-slide-up relative" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">Accuracy Rate</h3>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">Breakdown of submitted answers</p>
            <div className="h-[160px] sm:h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.accuracyData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {stats.accuracyData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: '12px', color: chartColors.tooltipColor, fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <AnimatedCounter target={stats.correctCount} className="text-2xl sm:text-3xl font-black text-foreground" duration={1000} />
                <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium">Correct</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-2">
              {stats.accuracyData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground font-medium">{item.name}</span>
                  <span className="text-foreground font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Strengths & Weaknesses ── */}
        {(stats.strengths.length > 0 || stats.weaknesses.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-teal-500/10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">Your Strengths</h3>
              </div>
              {stats.strengths.length > 0 ? (
                <ul className="space-y-2 sm:space-y-2.5">
                  {stats.strengths.map((s) => {
                    const style = categoryStyle(s);
                    return (
                      <li key={s} className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${style.badge}`}>
                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm">{s}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted-foreground italic text-sm">Keep practicing to build strengths!</p>
              )}
            </div>
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-amber-500/10 animate-slide-up" style={{ animationDelay: '240ms' }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">Areas to Improve</h3>
              </div>
              {stats.weaknesses.length > 0 ? (
                <ul className="space-y-2 sm:space-y-2.5">
                  {stats.weaknesses.map((w) => {
                    const style = categoryStyle(w);
                    return (
                      <li key={w} className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${style.badge}`}>
                        <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm">{w}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted-foreground italic text-sm">Great job! No major weaknesses detected.</p>
              )}
            </div>
          </div>
        )}

        {/* ── Detailed Review ── */}
        <div className="mt-8 sm:mt-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Detailed Review</h2>
            <span className="px-2.5 py-1 rounded-full glass border border-foreground/8 text-xs font-medium text-muted-foreground">
              {questions.length} questions
            </span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {questions.map((question, index) => {
              const answer = answers.find((a) => a.questionId === question.id);
              const isAnsweredQ = !!answer;
              const isCorrect = answer?.isCorrect;
              const selectedText = answer ? question.options.find((o) => o.key === answer.selectedOption)?.value : 'Skipped';
              const correctText = question.options.find((o) => o.key === question.correctAnswer)?.value;
              const isExpanded = expandedQuestions.has(question.id);
              const catStyle = categoryStyle(question.category.charAt(0).toUpperCase() + question.category.slice(1));

              return (
                <div key={question.id}
                  className={`glass-card rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-200 ${
                    !isAnsweredQ ? 'border-foreground/5'
                    : isCorrect  ? 'border-teal-500/15'
                    : 'border-red-500/15'
                  }`}>
                  <button onClick={() => toggleExpand(question.id)}
                    className="w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 text-left group hover:bg-foreground/2 transition-colors"
                    aria-expanded={isExpanded}>
                    <div className="shrink-0">
                      {!isAnsweredQ ? (
                        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full glass border border-foreground/10 flex items-center justify-center text-muted-foreground text-xs font-bold">–</div>
                      ) : isCorrect ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-teal-500" />
                      ) : (
                        <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground/40">Q{index + 1}</span>
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border ${catStyle.badge}`}>
                          {question.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate pr-4">{question.question}</p>
                    </div>
                    <div className={`shrink-0 transition-transform duration-200 text-muted-foreground/30 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-foreground/5 pt-3 sm:pt-4 space-y-2.5 sm:space-y-3 animate-slide-down">
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">{question.question}</p>

                      {question.transcript && (
                        <div className="p-2.5 sm:p-3 rounded-xl glass border border-fuchsia-500/10 text-xs">
                          <p className="text-fuchsia-500/60 font-semibold uppercase tracking-widest mb-1">Audio Transcript</p>
                          <p className="text-muted-foreground italic">"{question.transcript}"</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className={`p-3 sm:p-3.5 rounded-xl border text-sm ${
                          isAnsweredQ
                            ? isCorrect
                              ? 'bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300'
                              : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300'
                            : 'glass border-foreground/8 text-muted-foreground'
                        }`}>
                          <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">Your Answer</p>
                          <p className="font-semibold text-sm">{selectedText ?? '—'}</p>
                        </div>
                        {(!isAnsweredQ || !isCorrect) && (
                          <div className="p-3 sm:p-3.5 rounded-xl border text-sm bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">Correct Answer</p>
                            <p className="font-semibold text-sm">{correctText}</p>
                          </div>
                        )}
                      </div>

                      {question.explanation && (
                        <div className="p-3 sm:p-3.5 rounded-xl glass border border-primary/15 text-sm">
                          <p className="text-primary/70 font-semibold text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Explanation
                          </p>
                          <p className="text-muted-foreground leading-relaxed text-sm">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
