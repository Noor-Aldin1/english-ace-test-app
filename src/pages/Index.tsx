
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, GraduationCap, Book, CheckCircle } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-english-blue mb-6">
            Test Your English Proficiency with EnglishAce
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Take our comprehensive 15-minute assessment to evaluate your English language skills and receive personalized feedback on your proficiency level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/test" className="flex items-center gap-2">
                  Start Test Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" variant="default" asChild>
                  <Link to="/signup" className="flex items-center gap-2">
                    Create Account <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose EnglishAce?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-english-light-blue rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-english-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Comprehensive Assessment</h3>
              <p className="text-muted-foreground">
                15 carefully designed questions covering grammar, vocabulary, reading comprehension, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-english-light-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-english-green" />
              </div>
              <h3 className="text-xl font-medium mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Receive your proficiency level and detailed feedback immediately after completing the test.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-english-light-blue rounded-full flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-english-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Learning Resources</h3>
              <p className="text-muted-foreground">
                Access tailored resources based on your results to improve your English proficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to assess your English proficiency?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have accurately measured their English skills with our test.
          </p>
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link to="/test">Take the Test Now</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
