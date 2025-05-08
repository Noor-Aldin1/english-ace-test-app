
import React, { createContext, useState, useContext } from 'react';
import { questions } from '@/data/questions';

type AnswerType = {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
};

interface TestContextType {
  answers: AnswerType[];
  timeRemaining: number;
  isTestCompleted: boolean;
  score: number | null;
  proficiencyLevel: string | null;
  startTest: () => void;
  endTest: () => void;
  submitAnswer: (questionId: number, selectedOption: string) => void;
  updateTime: (seconds: number) => void;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

// Total test time in seconds (15 minutes)
const TOTAL_TEST_TIME = 15 * 60;

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TEST_TIME);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [proficiencyLevel, setProficiencyLevel] = useState<string | null>(null);

  // Start the test - reset state
  const startTest = () => {
    setAnswers([]);
    setTimeRemaining(TOTAL_TEST_TIME);
    setIsTestCompleted(false);
    setScore(null);
    setProficiencyLevel(null);
  };

  // Update the remaining time
  const updateTime = (seconds: number) => {
    setTimeRemaining(seconds);
    if (seconds <= 0) {
      endTest();
    }
  };

  // Submit an answer
  const submitAnswer = (questionId: number, selectedOption: string) => {
    // Find the question
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    // Check if answer is correct
    const isCorrect = question.correctOption === selectedOption;
    
    // Update answers
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        questionId,
        selectedOption,
        isCorrect
      };
      setAnswers(updatedAnswers);
    } else {
      // Add new answer
      setAnswers([...answers, {
        questionId,
        selectedOption,
        isCorrect
      }]);
    }
  };

  // End the test and calculate results
  const endTest = () => {
    // Calculate score
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalAnswered = answers.length;
    
    // Calculate score as percentage of correct answers out of the total questions
    // If not all questions are answered, calculate based on questions answered
    const calculatedScore = totalAnswered === 0 
      ? 0 
      : Math.round((correctAnswers / Math.max(totalAnswered, 1)) * 100);
    
    setScore(calculatedScore);
    
    // Determine proficiency level based on score
    let level;
    if (calculatedScore >= 90) {
      level = "Proficient";
    } else if (calculatedScore >= 75) {
      level = "Advanced";
    } else if (calculatedScore >= 60) {
      level = "Intermediate";
    } else {
      level = "Beginner";
    }
    
    setProficiencyLevel(level);
    setIsTestCompleted(true);
  };

  // Reset the test
  const resetTest = () => {
    startTest();
  };

  return (
    <TestContext.Provider
      value={{
        answers,
        timeRemaining,
        isTestCompleted,
        score,
        proficiencyLevel,
        startTest,
        endTest,
        submitAnswer,
        updateTime,
        resetTest
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
