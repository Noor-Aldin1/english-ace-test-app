import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, GraduationCap, BookOpen, CheckCircle2, Zap, Brain, Target } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 flex flex-col items-center justify-center text-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <Zap className="h-4 w-4" />
            <span>New AI-Powered Adaptive Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
            Elevate Your <span className="text-gradient">English</span><br />
            To The Next Level
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the most accurate and dynamic English placement test. 
            Get an instant CEFR evaluation and detailed insights into your grammar, vocabulary, and reading skills.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" className="h-14 px-8 text-lg rounded-full premium-shadow group" asChild>
                <Link to="/test" className="flex items-center gap-2">
                  Start Assessment 
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" className="h-14 px-8 text-lg rounded-full premium-shadow group" asChild>
                  <Link to="/signup" className="flex items-center gap-2">
                    Create Account 
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EnglishAce?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our platform uses advanced algorithms to provide a balanced and accurate assessment of your language skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dynamic Randomization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every exam generates a unique set of randomized questions from our extensive bank, ensuring a fresh experience.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive immediate feedback, precise CEFR level estimation, and detailed charts breaking down your performance.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-start transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Auto-Save & Resume</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never lose your progress. Your test session is safely stored, allowing you to resume exactly where you left off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10 px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to discover your level?</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Join thousands of users who have accurately measured their English skills with our professional assessment platform.
          </p>
          {isAuthenticated ? (
            <Button size="lg" className="h-14 px-10 text-lg rounded-full premium-shadow" asChild>
              <Link to="/test">Take the Assessment Now</Link>
            </Button>
          ) : (
            <Button size="lg" className="h-14 px-10 text-lg rounded-full premium-shadow" asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
