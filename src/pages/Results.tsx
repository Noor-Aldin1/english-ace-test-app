
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useTest } from '@/contexts/TestContext';
import { questions } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

const Results = () => {
  const { score, proficiencyLevel, answers, resetTest } = useTest();
  const navigate = useNavigate();

  // Count of correct answers
  const correctCount = answers.filter(a => a.isCorrect).length;
  
  // Count answers by type
  const answersByType: {[key: string]: {total: number, correct: number}} = {};
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const type = question.type;
      if (!answersByType[type]) {
        answersByType[type] = { total: 0, correct: 0 };
      }
      answersByType[type].total += 1;
      if (answer.isCorrect) {
        answersByType[type].correct += 1;
      }
    }
  });

  // Get proficiency description
  const getProficiencyDescription = () => {
    switch (proficiencyLevel) {
      case "Proficient":
        return "You have mastered English at an advanced level. Your language skills are exceptional!";
      case "Advanced":
        return "You have a strong command of English. You can express yourself fluently on a wide range of topics.";
      case "Intermediate":
        return "You have a good working knowledge of English. You can handle most everyday situations.";
      case "Beginner":
        return "You have a basic understanding of English. Focus on building your vocabulary and grammar.";
      default:
        return "";
    }
  };
  
  // Get color based on score
  const getScoreColor = () => {
    if (score === null) return "bg-gray-200";
    if (score >= 90) return "bg-english-green";
    if (score >= 70) return "bg-english-blue";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Handle restart button
  const handleRestart = () => {
    resetTest();
    navigate('/test');
  };
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Test Results</h1>
        
        {score !== null && proficiencyLevel ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-40 h-40 mb-4">
                <div className={`absolute inset-0 rounded-full flex items-center justify-center ${getScoreColor()} text-white text-4xl font-bold`}>
                  {score}%
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{proficiencyLevel} Level</h2>
                <p className="text-muted-foreground">{getProficiencyDescription()}</p>
              </div>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Trophy className="h-5 w-5 text-english-blue mr-2" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Correct Answers:</span>
                  <span className="font-medium">{correctCount} out of {questions.length}</span>
                </div>
                <Separator />
                
                {Object.entries(answersByType).map(([type, data]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize">{type}:</span>
                      <span className="font-medium">
                        {data.correct} out of {data.total} ({Math.round((data.correct / data.total) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(data.correct / data.total) * 100} className="h-2" />
                  </div>
                ))}
                
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Questions Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {answers.map(answer => {
                  const question = questions.find(q => q.id === answer.questionId);
                  return question ? (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        {answer.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-english-green mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{question.text}</p>
                          <p className="text-sm mt-1">
                            Your answer: <span className={answer.isCorrect ? "text-english-green font-medium" : "text-destructive font-medium"}>
                              {question.options[answer.selectedOption]}
                            </span>
                          </p>
                          {!answer.isCorrect && (
                            <p className="text-sm mt-1">
                              Correct answer: <span className="text-english-green font-medium">
                                {question.options[question.correctOption]}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </CardContent>
              <CardFooter>
                <Button onClick={handleRestart} className="w-full">
                  Take Test Again
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-4">No test results available. Please take the test first.</p>
            <Button onClick={() => navigate('/test')}>Go to Test</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Results;
