
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTest } from '@/contexts/TestContext';
import { questions } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const Test = () => {
  const { isAuthenticated } = useAuth();
  const { 
    answers, 
    timeRemaining, 
    isTestCompleted, 
    startTest, 
    endTest, 
    submitAnswer, 
    updateTime 
  } = useTest();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const navigate = useNavigate();

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle timer
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please login to take the test");
      return;
    }

    startTest();

    const timer = setInterval(() => {
      updateTime(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, navigate, timeRemaining]);

  // If test is completed, redirect to results page
  useEffect(() => {
    if (isTestCompleted) {
      navigate('/results');
    }
  }, [isTestCompleted, navigate]);

  // Calculate test progress
  const progress = (answers.length / questions.length) * 100;

  // Check if current question has been answered
  const isQuestionAnswered = (questionId: number) => {
    return answers.some(answer => answer.questionId === questionId);
  };

  // Get selected option for current question if it exists
  useEffect(() => {
    const currentQuestionId = questions[currentQuestionIndex]?.id;
    if (currentQuestionId) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestionId);
      if (existingAnswer) {
        setSelectedOption(existingAnswer.selectedOption);
      } else {
        setSelectedOption("");
      }
    }
  }, [currentQuestionIndex, answers]);

  // Handle next question button
  const handleNextQuestion = () => {
    if (selectedOption) {
      // Submit the current answer
      submitAnswer(
        questions[currentQuestionIndex].id,
        selectedOption
      );

      // Check if it's the last question
      if (currentQuestionIndex === questions.length - 1) {
        endTest();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      toast.warning("Please select an answer");
    }
  };

  // Handle previous question button
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle option selection
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  // Navigate directly to a specific question
  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="flex items-center bg-muted p-2 rounded-md">
            <Clock className="h-5 w-5 mr-2 text-english-blue" />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />
        
        {/* Question navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {questions.map((question, index) => (
            <Button 
              key={question.id}
              variant={currentQuestionIndex === index ? "default" : "outline"}
              size="sm"
              className={`relative ${isQuestionAnswered(question.id) ? "border-english-green" : ""}`}
              onClick={() => navigateToQuestion(index)}
            >
              {index + 1}
              {isQuestionAnswered(question.id) && (
                <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-english-green" />
              )}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <span className="bg-english-light-blue text-english-blue text-xs font-medium px-2.5 py-1 rounded-full mr-2">
                {currentQuestion?.type.charAt(0).toUpperCase() + currentQuestion?.type.slice(1)}
              </span>
              <CardTitle className="text-xl">{currentQuestion?.text}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {currentQuestion && (
              <RadioGroup value={selectedOption} onValueChange={handleOptionChange} className="mt-2 space-y-4">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value={key} id={`option-${key}`} />
                    <Label htmlFor={`option-${key}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{key.toUpperCase()}.</span> {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {timeRemaining < 60 && (
                <div className="flex items-center text-destructive">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span className="text-sm">Less than 1 minute remaining!</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? "Finish Test" : "Next Question"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Test;
