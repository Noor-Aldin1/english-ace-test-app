
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-english-blue" />
            <span className="font-bold text-xl text-english-blue">EnglishAce</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EnglishAce. All rights reserved.</p>
          <p className="mt-1">Improve your English proficiency with our adaptive testing platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
