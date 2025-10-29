import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ContentSlideshow from '@/components/ContentSlideshow';
import QuickNavigation from '@/components/QuickNavigation';
import MissionSection from '@/components/MissionSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import { StayConnected } from '@/components/StayConnected';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ContentSlideshow />
      <QuickNavigation />
      <MissionSection />
      <CoreValuesSection />
      <StayConnected />
      <Footer />
    </div>
  );
};

export default Index;
