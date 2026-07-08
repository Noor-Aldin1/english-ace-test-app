import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTest } from '@/contexts/TestContext';
import { toast } from '@/components/ui/sonner';
import {
  Clock, Flag, ChevronRight, ChevronLeft,
  Headphones, Loader2, Sparkles, Send, X, AlertTriangle,
} from 'lucide-react';
import {
  Dialog, DialogContent,
} from '@/components/ui/dialog';

const Test: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    questions, answers, timeRemaining, isTestCompleted,
    flaggedQuestions, startTest, endTest, submitAnswer,
    updateTime, toggleFlagQuestion,
  } = useTest();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [audioStatus, setAudioStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [questionTransition, setQuestionTransition] = useState<'idle' | 'out' | 'in'>('idle');
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); toast.error('Please login to take the test'); return; }
    startTest();
  }, [isAuthenticated, navigate, startTest]);

  useEffect(() => {
    if (questions.length === 0 || isTestCompleted) return;
    const timer = setInterval(() => updateTime((prev: number) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [questions.length, isTestCompleted, updateTime]);

  useEffect(() => {
    if (isTestCompleted) navigate('/results');
  }, [isTestCompleted, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const existing = answers.find((a) => a.questionId === currentQuestion.id);
      setSelectedOption(existing ? existing.selectedOption : '');
      if (currentQuestion.category === 'listening') setAudioStatus('loading');
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const goToQuestion = useCallback((index: number) => {
    if (index === currentQuestionIndex) return;
    setQuestionTransition('out');
    setTimeout(() => {
      setCurrentQuestionIndex(index);
      setQuestionTransition('in');
      setTimeout(() => setQuestionTransition('idle'), 300);
    }, 180);
  }, [currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) goToQuestion(currentQuestionIndex + 1);
    else setShowConfirmModal(true);
  }, [currentQuestionIndex, questions.length, goToQuestion]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) goToQuestion(currentQuestionIndex - 1);
  }, [currentQuestionIndex, goToQuestion]);

  const handleOptionChange = useCallback((value: string) => {
    setSelectedOption(value);
    if (currentQuestion) submitAnswer(currentQuestion.id, value);
  }, [currentQuestion, submitAnswer]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showConfirmModal) return;
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (currentQuestion && ['a','b','c','d'].includes(e.key.toLowerCase())) {
      const idx = e.key.toLowerCase().charCodeAt(0) - 97;
      if (idx < currentQuestion.options.length) handleOptionChange(currentQuestion.options[idx].key);
    } else if (e.key === 'ArrowRight') handleNextQuestion();
    else if (e.key === 'ArrowLeft') handlePreviousQuestion();
  }, [currentQuestion, showConfirmModal, handleOptionChange, handleNextQuestion, handlePreviousQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const submitTest = () => { setShowConfirmModal(false); endTest(); };

  if (questions.length === 0) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl grad-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <p className="text-muted-foreground text-sm">Preparing your assessment...</p>
      </div>
    </div>
  );

  const progress = (answers.length / questions.length) * 100;
  const isAnswered = (qId: string) => answers.some((a) => a.questionId === qId);
  const isFlagged  = (qId: string) => flaggedQuestions.includes(qId);
  const isUrgent   = timeRemaining < 60;
  const questionFlagged = isFlagged(currentQuestion.id);
  const letterLabels = ['A','B','C','D'];

  const transitionStyle: React.CSSProperties = {
    opacity: questionTransition === 'out' ? 0 : 1,
    transform: questionTransition === 'out' ? 'translateX(-12px)'
      : questionTransition === 'in' ? 'translateX(8px)' : 'translateX(0)',
    transition: 'opacity 0.18s ease, transform 0.18s ease',
  };

  const catBadge = (cat: string) => {
    const map: Record<string, string> = {
      listening:  'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
      grammar:    'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20',
      vocabulary: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/20',
      reading:    'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
    };
    return map[cat] ?? 'bg-foreground/8 text-muted-foreground border-foreground/10';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Sticky Top Bar ── */}
      <header className="sticky top-0 z-30 glass-navbar border-b border-foreground/5">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-13 sm:h-14 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg grad-primary flex items-center justify-center">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-foreground hidden sm:block">EnglishAce</span>
          </Link>

          {/* Progress bar */}
          <div className="flex-1 max-w-[160px] sm:max-w-xs mx-2 sm:mx-4">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-widest">
              <span>Progress</span>
              <span>{answers.length}/{questions.length}</span>
            </div>
            <div className="h-1 sm:h-1.5 rounded-full bg-foreground/5 overflow-hidden">
              <div className="h-full rounded-full grad-aurora transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shrink-0 ${
              isUrgent
                ? 'bg-red-500/15 text-red-500 border border-red-500/20 animate-pulse'
                : 'glass border border-foreground/8 text-foreground'
            }`}
            aria-label={`Time remaining: ${formatTime(timeRemaining)}`}
            aria-live="polite"
          >
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6 flex flex-col-reverse md:flex-row gap-4 sm:gap-5">

        {/* Question Card */}
        <main className="flex-1">
          <div style={transitionStyle}>
            {/* Question header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest border ${catBadge(currentQuestion.category)}`}>
                  {currentQuestion.category === 'listening' && <Headphones className="inline h-2.5 w-2.5 mr-1" />}
                  {currentQuestion.category}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              <button
                onClick={() => toggleFlagQuestion(currentQuestion.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-200 ${
                  questionFlagged
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'glass text-muted-foreground hover:text-amber-500 border border-foreground/5'
                }`}
                aria-label={questionFlagged ? 'Remove flag' : 'Flag for review'}
                aria-pressed={questionFlagged}
              >
                <Flag className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${questionFlagged ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{questionFlagged ? 'Flagged' : 'Flag'}</span>
              </button>
            </div>

            {/* Card */}
            <div className="glass-card rounded-2xl sm:rounded-3xl border border-foreground/5 overflow-hidden">
              <div className="h-0.5 grad-aurora w-full" />

              <div className="p-4 sm:p-6 md:p-10">
                {/* Audio player */}
                {currentQuestion.category === 'listening' && currentQuestion.audioUrl && (
                  <div className="mb-5 sm:mb-6 p-3 sm:p-4 glass rounded-xl sm:rounded-2xl border border-fuchsia-500/10">
                    <p className="text-[10px] sm:text-xs text-fuchsia-500/70 font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2 sm:mb-3">
                      <Headphones className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Audio Clip
                    </p>
                    <div className="relative">
                      {audioStatus === 'loading' && (
                        <div className="absolute inset-0 flex items-center gap-2 bg-background/60 rounded-lg z-10 px-3">
                          <Loader2 className="h-4 w-4 text-fuchsia-400 animate-spin" />
                          <span className="text-xs text-muted-foreground">Loading audio...</span>
                        </div>
                      )}
                      {audioStatus === 'error' && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-xs text-destructive">
                          <AlertTriangle className="h-4 w-4" />Failed to load audio.
                        </div>
                      )}
                      <audio src={currentQuestion.audioUrl} controls controlsList="nodownload noplaybackrate"
                        className="w-full h-9 sm:h-10 outline-none"
                        onCanPlay={() => setAudioStatus('ready')}
                        onError={() => setAudioStatus('error')} />
                    </div>
                  </div>
                )}

                {/* Question text */}
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-5 sm:mb-8">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-2 sm:space-y-3" role="radiogroup" aria-label="Answer options">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option.key;
                    return (
                      <div
                        key={option.key}
                        onClick={() => handleOptionChange(option.key)}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Option ${letterLabels[idx]}: ${option.value}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleOptionChange(option.key)}
                        className={`option-card flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border cursor-pointer group ${
                          isSelected
                            ? 'selected'
                            : 'border-border hover:border-foreground/12'
                        } focus-ring`}
                      >
                        <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? 'grad-primary text-white shadow-glow-violet'
                            : 'bg-foreground/6 text-muted-foreground group-hover:bg-foreground/10 group-hover:text-foreground'
                        }`}>{letterLabels[idx]}</div>
                        <input type="radio" name="question-option" value={option.key} checked={isSelected}
                          onChange={() => handleOptionChange(option.key)} className="sr-only" id={`option-${option.key}`} />
                        <label htmlFor={`option-${option.key}`}
                          className={`flex-1 text-sm sm:text-base leading-relaxed cursor-pointer font-medium transition-colors duration-200 ${
                            isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/80'
                          }`}>
                          {option.value}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nav footer */}
              <div className="px-4 sm:px-6 md:px-10 py-4 sm:py-5 border-t border-foreground/5 flex justify-between items-center gap-3">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold glass border border-foreground/8 text-muted-foreground hover:text-foreground hover:border-foreground/15 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous question">
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button onClick={handleNextQuestion} id="next-question-btn"
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-200 shimmer group ${
                    currentQuestionIndex === questions.length - 1
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 shadow-glow-teal hover:opacity-90'
                      : 'grad-primary shadow-glow-violet hover:opacity-90'
                  }`}
                  aria-label={currentQuestionIndex === questions.length - 1 ? 'Submit test' : 'Next question'}>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <><Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span>Submit</span></>
                  ) : (
                    <><span>Next</span><ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Question Map Sidebar */}
        <aside className="w-full md:w-52 shrink-0 order-first md:order-last">
          <div className="glass-card rounded-2xl p-3 sm:p-4 border border-foreground/5 md:sticky md:top-20">
            <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
              Question Map
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-5 md:grid-cols-4 gap-1 sm:gap-1.5">
              {questions.map((q, i) => {
                const answered = isAnswered(q.id);
                const flagged  = isFlagged(q.id);
                const current  = currentQuestionIndex === i;
                return (
                  <button key={q.id} onClick={() => goToQuestion(i)}
                    aria-label={`Question ${i + 1}${answered ? ' answered' : ''}${flagged ? ' flagged' : ''}`}
                    className={`relative h-7 sm:h-8 w-full rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 focus-ring ${
                      current   ? 'grad-primary text-white shadow-glow-violet scale-105'
                      : answered ? 'bg-primary/20 text-primary border border-primary/20'
                      : 'glass text-muted-foreground hover:text-foreground border border-foreground/5'
                    }`}>
                    {i + 1}
                    {flagged && <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-400 border border-background" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-foreground/5 space-y-1.5 text-[10px] text-muted-foreground/60 font-medium hidden sm:block">
              {[{ color: 'bg-primary', label: 'Answered' },{ color: 'bg-foreground/10', label: 'Unanswered' },{ color: 'bg-amber-400', label: 'Flagged' }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${color}`} />{label}</div>
              ))}
            </div>
            <p className="mt-2 text-[9px] text-muted-foreground/30 text-center hidden md:block">A,B,C,D + arrow keys</p>
          </div>
        </aside>
      </div>

      {/* ── Submit Modal ── */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md border-0 p-0 bg-transparent shadow-none">
          <div className="glass-card rounded-2xl sm:rounded-3xl border border-foreground/8 p-6 sm:p-8 shadow-[0_32px_64px_hsl(0_0%_0%/0.4)]">
            <div className="flex items-start justify-between mb-5 sm:mb-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl grad-primary flex items-center justify-center shadow-glow-violet">
                <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <button onClick={() => setShowConfirmModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                aria-label="Close dialog">
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-2">Submit Assessment?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              You have answered <span className="text-foreground font-semibold">{answers.length}</span> out of{' '}
              <span className="text-foreground font-semibold">{questions.length}</span> questions.
            </p>
            {flaggedQuestions.length > 0 && (
              <p className="text-amber-500/80 text-sm mt-2 flex items-center gap-1.5">
                <Flag className="h-3.5 w-3.5 fill-current" />
                {flaggedQuestions.length} flagged question{flaggedQuestions.length > 1 ? 's' : ''} still to review.
              </p>
            )}
            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold glass border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200">
                Continue Testing
              </button>
              <button onClick={submitTest} id="confirm-submit-btn"
                className="flex-1 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white grad-primary shadow-glow-violet hover:opacity-90 transition-all duration-200 shimmer">
                Submit Answers
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Test;
