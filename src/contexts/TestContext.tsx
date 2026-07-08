import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { generateRandomExam, ExamQuestion } from '@/lib/exam-engine';

export type AnswerType = {
  questionId: string;
  selectedOption: string; // The original key (a, b, c, d)
  isCorrect: boolean;
};

interface TestContextType {
  questions: ExamQuestion[];
  answers: AnswerType[];
  timeRemaining: number;
  totalTime: number;
  isTestCompleted: boolean;
  score: number | null;
  proficiencyLevel: string | null;
  flaggedQuestions: string[];
  
  startTest: (forceNew?: boolean) => void;
  endTest: () => void;
  submitAnswer: (questionId: string, selectedOption: string) => void;
  updateTime: (updater: (prev: number) => number) => void;
  resetTest: () => void;
  toggleFlagQuestion: (questionId: string) => void;
  clearSession: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

// Configuration for dynamic timer
export const SECONDS_PER_QUESTION = 60;
const SESSION_KEY = 'english_ace_exam_session';

interface SessionState {
  questions: ExamQuestion[];
  answers: AnswerType[];
  timeRemaining: number;
  totalTime: number;
  isTestCompleted: boolean;
  score: number | null;
  proficiencyLevel: string | null;
  flaggedQuestions: string[];
  lastUpdated: number;
}

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [proficiencyLevel, setProficiencyLevel] = useState<string | null>(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  
  // Track if we've initialized from local storage to prevent unnecessary saves during first render
  const [isInitialized, setIsInitialized] = useState(false);

  // --- Callback Definitions in Dependency Order ---

  // Calculate results and end test
  const endTest = useCallback(() => {
    // Wait for the state to be updated before ending
    setIsTestCompleted(true);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setQuestions([]);
    setAnswers([]);
    setTimeRemaining(0);
    setTotalTime(0);
    setIsTestCompleted(false);
    setScore(null);
    setProficiencyLevel(null);
    setFlaggedQuestions([]);
  }, []);

  // Update the remaining time
  const updateTime = useCallback((updater: (prev: number) => number) => {
    setTimeRemaining(prev => {
      const newTime = updater(prev);
      if (newTime <= 0 && prev > 0) {
        // We defer the endTest call to avoid state updates during render phase if called synchronously
        setTimeout(() => endTest(), 0); 
      }
      return newTime;
    });
  }, [endTest]);

  // Start the test
  const startTest = useCallback((forceNew: boolean = false) => {
    if (forceNew || questions.length === 0) {
      const newQuestions = generateRandomExam(25); // 25 questions default
      const calculatedTotalTime = newQuestions.length * SECONDS_PER_QUESTION;
      setQuestions(newQuestions);
      setAnswers([]);
      setTimeRemaining(calculatedTotalTime);
      setTotalTime(calculatedTotalTime);
      setIsTestCompleted(false);
      setScore(null);
      setProficiencyLevel(null);
      setFlaggedQuestions([]);
    }
  }, [questions.length]);

  const resetTest = useCallback(() => {
    clearSession();
    startTest(true);
  }, [startTest, clearSession]);

  // Submit an answer
  const submitAnswer = useCallback((questionId: string, selectedOption: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = question.correctAnswer === selectedOption;
    
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        const updated = [...prev];
        updated[existingAnswerIndex] = { questionId, selectedOption, isCorrect };
        return updated;
      } else {
        return [...prev, { questionId, selectedOption, isCorrect }];
      }
    });
  }, [questions]);

  // Toggle flag status for a question
  const toggleFlagQuestion = useCallback((questionId: string) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  }, []);

  // --- Effects ---

  // Initialize from local storage or set defaults
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const parsed: SessionState = JSON.parse(savedSession);
        
        // If the session is older than 2 hours, discard it
        const isExpired = (Date.now() - parsed.lastUpdated) > 2 * 60 * 60 * 1000;
        
        if (!isExpired && !parsed.isTestCompleted) {
          setQuestions(parsed.questions || []);
          setAnswers(parsed.answers || []);
          setTimeRemaining(parsed.timeRemaining || 0);
          setTotalTime(parsed.totalTime || (parsed.questions?.length || 0) * SECONDS_PER_QUESTION);
          setIsTestCompleted(parsed.isTestCompleted || false);
          setScore(parsed.score || null);
          setProficiencyLevel(parsed.proficiencyLevel || null);
          setFlaggedQuestions(parsed.flaggedQuestions || []);
        }
      }
    } catch (e) {
      console.error('Failed to parse saved exam session', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to local storage whenever critical state changes
  useEffect(() => {
    if (!isInitialized) return;

    // We don't save completed tests to session, we clear it so they start fresh next time
    if (isTestCompleted) {
       localStorage.removeItem(SESSION_KEY);
       return;
    }

    // Only save if we actually have questions (meaning a test is active)
    if (questions.length > 0) {
      const stateToSave: SessionState = {
        questions,
        answers,
        timeRemaining,
        totalTime,
        isTestCompleted,
        score,
        proficiencyLevel,
        flaggedQuestions,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(stateToSave));
    }
  }, [questions, answers, timeRemaining, totalTime, isTestCompleted, score, proficiencyLevel, flaggedQuestions, isInitialized]);

  // React to isTestCompleted turning true
  useEffect(() => {
    if (isTestCompleted && score === null && questions.length > 0) {
      const correctAnswers = answers.filter(answer => answer.isCorrect).length;
      const calculatedScore = Math.round((correctAnswers / Math.max(questions.length, 1)) * 100);
      
      setScore(calculatedScore);
      
      let level;
      if (calculatedScore >= 90) level = "C1/C2 (Advanced)";
      else if (calculatedScore >= 75) level = "B2 (Upper Intermediate)";
      else if (calculatedScore >= 60) level = "B1 (Intermediate)";
      else if (calculatedScore >= 40) level = "A2 (Pre-Intermediate)";
      else level = "A1 (Beginner)";
      
      setProficiencyLevel(level);
    }
  }, [isTestCompleted, answers, score, questions.length]);

  return (
    <TestContext.Provider
      value={{
        questions,
        answers,
        timeRemaining,
        totalTime,
        isTestCompleted,
        score,
        proficiencyLevel,
        flaggedQuestions,
        startTest,
        endTest,
        submitAnswer,
        updateTime,
        resetTest,
        toggleFlagQuestion,
        clearSession
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
