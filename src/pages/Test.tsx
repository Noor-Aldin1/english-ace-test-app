import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { AlertTriangle, Clock, CheckCircle, Flag, ChevronRight, ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Test = () => {
  const { isAuthenticated } = useAuth();
  const { 
    questions,
    answers, 
    timeRemaining, 
    isTestCompleted, 
    flaggedQuestions,
    startTest, 
    endTest, 
    submitAnswer, 
    updateTime,
    toggleFlagQuestion
  } = useTest();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle timer & test start
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please login to take the test");
      return;
    }

    startTest(); // Starts a test if one isn't active (or resumes from localStorage)
  }, [isAuthenticated, navigate, startTest]);

  // Timer interval
  useEffect(() => {
    if (questions.length === 0 || isTestCompleted) return;

    const timer = setInterval(() => {
      updateTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questions.length, isTestCompleted, updateTime]);

  // If test is completed, redirect to results page
  useEffect(() => {
    if (isTestCompleted) {
      navigate('/results');
    }
  }, [isTestCompleted, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  // Sync selected option when question changes
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setSelectedOption(existingAnswer ? existingAnswer.selectedOption : "");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmModal(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleOptionChange = useCallback((value: string) => {
    setSelectedOption(value);
    if (currentQuestion) {
      submitAnswer(currentQuestion.id, value);
    }
  }, [currentQuestion, submitAnswer]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showConfirmModal) return;

    // A, B, C, D mapping based on shuffled options order
    if (currentQuestion && ['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
      const charCode = e.key.toLowerCase().charCodeAt(0) - 97; // 'a' is 0, 'b' is 1...
      if (charCode < currentQuestion.options.length) {
        const optionKey = currentQuestion.options[charCode].key;
        handleOptionChange(optionKey);
      }
    } else if (e.key === 'ArrowRight') {
      handleNextQuestion();
    } else if (e.key === 'ArrowLeft') {
      handlePreviousQuestion();
    }
  }, [currentQuestion, showConfirmModal, handleOptionChange, handleNextQuestion, handlePreviousQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const submitTest = () => {
    setShowConfirmModal(false);
    endTest();
  };

  if (questions.length === 0) return null;

  const progress = (answers.length / questions.length) * 100;
  const isQuestionAnswered = (questionId: string) => answers.some(a => a.questionId === questionId);
  const isQuestionFlagged = (questionId: string) => flaggedQuestions.includes(questionId);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Main Content Area */}
        <div className="flex-1 order-2 md:order-1">
          <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl premium-shadow border border-slate-100 dark:border-slate-800">
            <div className="text-lg font-semibold text-primary">
              Question {currentQuestionIndex + 1} <span className="text-muted-foreground text-sm font-normal">/ {questions.length}</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full font-bold text-lg tracking-wider transition-colors ${timeRemaining < 60 ? 'bg-destructive/10 text-destructive animate-pulse' : 'bg-primary/10 text-primary'}`}>
              <Clock className="h-5 w-5 mr-2" />
              {formatTime(timeRemaining)}
            </div>
          </div>

          <Progress value={progress} className="h-2 mb-8 bg-slate-100 dark:bg-slate-800" indicatorColor="bg-primary" />
          
          <Card className="premium-shadow border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-full"></div>
            <CardHeader className="pt-8 pb-4 px-6 md:px-10">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {currentQuestion.category}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleFlagQuestion(currentQuestion.id)}
                  className={`${isQuestionFlagged(currentQuestion.id) ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'text-slate-400'}`}
                >
                  <Flag className={`h-4 w-4 mr-2 ${isQuestionFlagged(currentQuestion.id) ? 'fill-current' : ''}`} />
                  {isQuestionFlagged(currentQuestion.id) ? 'Flagged' : 'Flag for review'}
                </Button>
              </div>
              <CardTitle className="text-2xl md:text-3xl leading-relaxed text-slate-800 dark:text-slate-100">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 md:px-10 py-4">
              <RadioGroup value={selectedOption} onValueChange={handleOptionChange} className="mt-4 space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const letterLabel = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = selectedOption === option.key;
                  return (
                    <div 
                      key={option.key} 
                      onClick={() => handleOptionChange(option.key)}
                      className={`
                        flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer group
                        ${isSelected 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }
                      `}
                    >
                      <RadioGroupItem value={option.key} id={`option-${option.key}`} className="sr-only" />
                      <div className={`
                        flex items-center justify-center h-8 w-8 rounded-md font-bold text-sm transition-colors
                        ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary/20 group-hover:text-primary'}
                      `}>
                        {letterLabel}
                      </div>
                      <Label htmlFor={`option-${option.key}`} className="flex-1 cursor-pointer text-base md:text-lg leading-relaxed font-medium">
                        {option.value}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 px-6 md:px-10 py-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="font-semibold px-6"
              >
                <ChevronLeft className="h-5 w-5 mr-1" /> Previous
              </Button>
              
              <Button 
                size="lg"
                onClick={handleNextQuestion}
                className={`font-semibold px-8 ${currentQuestionIndex === questions.length - 1 ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
              >
                {currentQuestionIndex === questions.length - 1 ? "Submit Test" : "Next Question"} <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar Navigator */}
        <div className="w-full md:w-64 order-1 md:order-2 shrink-0">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl premium-shadow border border-slate-100 dark:border-slate-800 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Question Map</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const answered = isQuestionAnswered(question.id);
                const flagged = isQuestionFlagged(question.id);
                const isCurrent = currentQuestionIndex === index;
                
                let btnClass = "h-10 w-full p-0 font-semibold relative overflow-hidden transition-all duration-200 ";
                
                if (isCurrent) {
                  btnClass += "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900 bg-primary text-white hover:bg-primary/90 ";
                } else if (answered) {
                  btnClass += "bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300 ";
                } else {
                  btnClass += "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 border-none ";
                }

                return (
                  <Button 
                    key={question.id}
                    variant="outline"
                    className={btnClass}
                    onClick={() => navigateToQuestion(index)}
                  >
                    {index + 1}
                    {flagged && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center"><div className="w-3 h-3 bg-slate-800 dark:bg-slate-200 rounded-sm mr-2"></div> Answered</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm mr-2"></div> Unanswered</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div> Flagged</div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-center text-slate-400">
              Pro tip: Use A,B,C,D and arrow keys to navigate.
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Submit Assessment?</DialogTitle>
            <DialogDescription className="text-base pt-2">
              You have answered {answers.length} out of {questions.length} questions.
              {flaggedQuestions.length > 0 && (
                <div className="mt-2 text-amber-600 font-medium">
                  You still have {flaggedQuestions.length} flagged question(s) to review.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between mt-6">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Continue Testing
            </Button>
            <Button onClick={submitTest} className="bg-primary text-white">
              Submit Final Answers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Test;
