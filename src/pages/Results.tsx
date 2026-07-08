import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Trophy, Target, Clock, AlertCircle, BarChart3, RotateCcw } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip, Cell, PieChart, Pie } from 'recharts';

const TOTAL_TEST_TIME = 15 * 60; // 15 minutes in seconds

const Results = () => {
  const { score, proficiencyLevel, answers, questions, resetTest, timeRemaining } = useTest();
  const navigate = useNavigate();

  // If no test has been completed/started, this would be empty
  const hasResults = score !== null && proficiencyLevel !== null && questions.length > 0;

  // Calculate statistics
  const stats = useMemo(() => {
    if (!hasResults) return null;

    const totalQuestions = questions.length;
    const correctCount = answers.filter(a => a.isCorrect).length;
    const answeredCount = answers.length;
    const skippedCount = totalQuestions - answeredCount;
    const incorrectCount = answeredCount - correctCount;

    const timeSpentSeconds = TOTAL_TEST_TIME - timeRemaining;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`;

    // Category breakdown
    const categoryStats: Record<string, { total: number, correct: number }> = {
      grammar: { total: 0, correct: 0 },
      vocabulary: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
      listening: { total: 0, correct: 0 }
    };

    questions.forEach(q => {
      if (categoryStats[q.category]) {
        categoryStats[q.category].total += 1;
      }
    });

    answers.forEach(a => {
      const q = questions.find(question => question.id === a.questionId);
      if (q && a.isCorrect && categoryStats[q.category]) {
        categoryStats[q.category].correct += 1;
      }
    });

    const radarData = Object.keys(categoryStats).map(key => {
      const stat = categoryStats[key];
      const percentage = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      return {
        subject: key.charAt(0).toUpperCase() + key.slice(1),
        score: percentage,
        fullMark: 100,
      };
    });
    
    const accuracyData = [
      { name: 'Correct', value: correctCount, color: '#10b981' },
      { name: 'Incorrect', value: incorrectCount, color: '#ef4444' },
      { name: 'Skipped', value: skippedCount, color: '#94a3b8' }
    ];

    // Determine Strengths and Weaknesses
    const sortedCategories = [...radarData].filter(d => categoryStats[d.subject.toLowerCase()].total > 0).sort((a, b) => b.score - a.score);
    const strengths = sortedCategories.filter(c => c.score >= 70).map(c => c.subject);
    const weaknesses = sortedCategories.filter(c => c.score < 50).map(c => c.subject);

    return {
      totalQuestions,
      correctCount,
      incorrectCount,
      skippedCount,
      timeSpentFormatted,
      categoryStats,
      radarData,
      accuracyData,
      strengths,
      weaknesses
    };
  }, [hasResults, questions, answers, timeRemaining]);

  const getProficiencyDescription = () => {
    if (!proficiencyLevel) return "";
    if (proficiencyLevel.includes("C1/C2")) return "You have mastered English at an advanced level. Your language skills are exceptional and near-native.";
    if (proficiencyLevel.includes("B2")) return "You have a strong command of English. You can express yourself fluently on a wide range of complex topics.";
    if (proficiencyLevel.includes("B1")) return "You have a solid working knowledge of English. You can handle most everyday and professional situations independently.";
    if (proficiencyLevel.includes("A2")) return "You have a basic understanding of English. You can communicate in simple and routine tasks.";
    return "You are at the beginning of your English journey. Focus on building core vocabulary and basic grammar structures.";
  };
  
  const handleRestart = () => {
    resetTest();
    navigate('/test');
  };

  if (!hasResults || !stats) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-20 px-4">
          <AlertCircle className="h-16 w-16 text-slate-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">No Results Found</h2>
          <p className="text-muted-foreground text-lg mb-8">It looks like you haven't completed an assessment yet.</p>
          <Button size="lg" onClick={() => navigate('/test')}>Take the Assessment</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 pb-12">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Assessment Results</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Review your performance, discover your strengths, and see where you can improve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Main Score Card */}
          <Card className="md:col-span-2 premium-shadow border-none bg-gradient-to-br from-primary/5 to-indigo-500/5">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  <Target className="h-4 w-4" /> CEFR Estimate
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{proficiencyLevel}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {getProficiencyDescription()}
                </p>
              </div>
              <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-slate-200 dark:text-slate-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                  <circle className="text-primary stroke-current transition-all duration-1000 ease-out" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * score!) / 100}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{score}%</span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Score</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="premium-shadow border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" /> Test Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
                <p className="text-2xl font-bold">{stats.timeSpentFormatted}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Questions</p>
                  <p className="text-xl font-bold">{stats.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Answered</p>
                  <p className="text-xl font-bold">{stats.totalQuestions - stats.skippedCount}</p>
                </div>
              </div>
              <Button onClick={handleRestart} variant="outline" className="w-full mt-2 group">
                <RotateCcw className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-180" />
                Retake Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart */}
          <Card className="premium-shadow border-none">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" /> Skill Breakdown
              </CardTitle>
              <CardDescription>Your performance across different language skills</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={stats.radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <RechartsTooltip formatter={(value: number) => [`${value}%`, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Accuracy Breakdown */}
          <Card className="premium-shadow border-none">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-500" /> Accuracy Rate
              </CardTitle>
              <CardDescription>Breakdown of your submitted answers</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.accuracyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats.accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-4">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.correctCount}</span>
                  <span className="block text-sm text-muted-foreground">Correct</span>
                </div>
              </div>
              <div className="w-full flex justify-center gap-6 mt-2 absolute bottom-6">
                {stats.accuracyData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strengths & Weaknesses (if enough data) */}
        {(stats.strengths.length > 0 || stats.weaknesses.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="premium-shadow border-none border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.strengths.length > 0 ? (
                  <ul className="space-y-3">
                    {stats.strengths.map((s, i) => (
                      <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-500/10 p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                        <span className="font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">Keep practicing to build your strengths!</p>
                )}
              </CardContent>
            </Card>

            <Card className="premium-shadow border-none border-t-4 border-t-amber-500">
              <CardHeader>
                <CardTitle className="text-lg">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.weaknesses.length > 0 ? (
                  <ul className="space-y-3">
                    {stats.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 shrink-0" />
                        <span className="font-medium">{w}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">Great job! You showed no major weaknesses in this test.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Questions Review */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Detailed Review</h2>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const answer = answers.find(a => a.questionId === question.id);
            const isAnswered = !!answer;
            const isCorrect = answer?.isCorrect;
            const selectedOptionText = answer 
              ? question.options.find(o => o.key === answer.selectedOption)?.value 
              : "Skipped";
            const correctOptionText = question.options.find(o => o.key === question.correctOption)?.value;

            return (
              <Card key={question.id} className={`premium-shadow border-l-4 ${!isAnswered ? 'border-l-slate-400' : isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      {!isAnswered ? (
                        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-xs">-</div>
                      ) : isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-slate-400">Q{index + 1}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                          {question.category}
                        </span>
                      </div>
                      <p className="font-medium text-lg mb-3 text-slate-800 dark:text-slate-200">{question.text}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-3 rounded-lg ${isAnswered ? (isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200') : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          <p className="text-xs uppercase font-bold mb-1 opacity-70">Your Answer</p>
                          <p className="font-medium">{selectedOptionText}</p>
                        </div>
                        
                        {(!isAnswered || !isCorrect) && (
                          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-900/50">
                            <p className="text-xs uppercase font-bold mb-1 opacity-70">Correct Answer</p>
                            <p className="font-medium">{correctOptionText}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
