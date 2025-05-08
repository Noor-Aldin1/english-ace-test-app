
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About EnglishAce</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-english-blue">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-4">
              At EnglishAce, our mission is to provide accessible, accurate, and comprehensive English proficiency testing to learners worldwide. We believe that understanding your current level is the first step toward improvement.
            </p>
            <p className="text-lg leading-relaxed">
              Founded by language experts and educational technologists, EnglishAce combines proven assessment methodologies with modern technology to deliver a testing experience that is both rigorous and user-friendly.
            </p>
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-semibold mb-6 text-center">How Our Test Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-3 text-english-blue">Test Structure</h3>
              <p className="mb-2">• 15 questions across various English skills</p>
              <p className="mb-2">• 15-minute time limit to simulate real testing conditions</p>
              <p className="mb-2">• Questions adapt to your skill level</p>
              <p>• Covers grammar, vocabulary, reading comprehension, and more</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-3 text-english-blue">Proficiency Levels</h3>
              <p className="mb-2">• Beginner: Basic understanding of simple phrases and expressions</p>
              <p className="mb-2">• Intermediate: Can handle most everyday situations</p>
              <p className="mb-2">• Advanced: Can express ideas fluently and spontaneously</p>
              <p>• Proficient: Near-native command of the language</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-english-blue">Our Team</h2>
            <p className="text-lg leading-relaxed mb-4">
              EnglishAce was developed by a passionate team of linguists, educators, and software developers committed to creating the best language assessment tools.
            </p>
            <p className="text-lg leading-relaxed">
              Our test questions are designed by certified language teachers with years of experience in English language instruction and assessment. All content undergoes rigorous review to ensure accuracy and relevance.
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4">Ready to Test Your English?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Create a free account today and discover your English proficiency level.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
