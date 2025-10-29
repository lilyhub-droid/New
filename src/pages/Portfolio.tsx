import React from 'react';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import Footer from '@/components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section for Aduragbemi A.O. */}
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient">Aduragbemi Abraham</span>
            </h1>
            <h2 className="text-xl lg:text-2xl text-brand-orange mb-8 font-semibold">
              Christian Writer & Faith-Based Consultant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Part of the ELOHIM'S ministry team, serving through writing, consultation, and spiritual guidance 
              to help individuals and organizations align with their divine purpose.
            </p>
          </div>
        </div>
      </section>
      <AboutSection />
      <PortfolioSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Portfolio;