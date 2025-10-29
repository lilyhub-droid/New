import React from 'react';
import Navigation from '@/components/Navigation';
import ServicesSection from '@/components/ServicesSection';
import SkillsSection from '@/components/SkillsSection';
import Footer from '@/components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ServicesSection />
      <SkillsSection />
      <Footer />
    </div>
  );
};

export default Services;