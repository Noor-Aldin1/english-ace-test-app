
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  noFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false, noFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container py-8 md:py-12'}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
