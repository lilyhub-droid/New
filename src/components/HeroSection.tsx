import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download } from 'lucide-react';
import profileImage from '@/assets/profile-image.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden hero-grid-pattern py-[clamp(2rem,8vh,6rem)]">
      {/* Enhanced Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes - Adaptive sizes */}
        <div className="absolute top-[clamp(2rem,10vh,5rem)] left-[clamp(1rem,5vw,2.5rem)] w-[clamp(4rem,15vw,8rem)] h-[clamp(4rem,15vw,8rem)] bg-brand-orange/10 rounded-3xl blur-2xl animate-float glass-morphism"></div>
        <div className="absolute top-1/3 right-[clamp(2rem,10vw,5rem)] w-[clamp(6rem,20vw,12rem)] h-[clamp(6rem,20vw,12rem)] bg-brand-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-[clamp(8rem,25vw,16rem)] h-[clamp(8rem,25vw,16rem)] bg-brand-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[clamp(2rem,10vh,5rem)] right-[clamp(1rem,5vw,2.5rem)] w-[clamp(5rem,15vw,10rem)] h-[clamp(5rem,15vw,10rem)] bg-brand-gold/8 rounded-2xl blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Rotating ring - Responsive */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[clamp(12rem,40vw,24rem)] h-[clamp(12rem,40vw,24rem)] border border-brand-orange/5 rounded-full animate-rotate-slow"></div>
        
        {/* Gradient orbs - Responsive */}
        <div className="absolute top-1/4 right-1/3 w-[clamp(10rem,30vw,18rem)] h-[clamp(10rem,30vw,18rem)] bg-gradient-radial rounded-full animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-[clamp(1rem,3vw,1.5rem)] relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[clamp(2rem,8vw,4rem)]">
          {/* Enhanced Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-up w-full">
            
            {/* Enhanced Typography - Fully Responsive */}
            <h1 className="font-display font-bold mb-[clamp(1.5rem,4vh,2rem)] leading-[0.95] mt-[clamp(2rem,6vh,4rem)]">
              <span className="block text-shimmer animate-shimmer font-black" style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>
                ELOHIM'S
              </span>
            </h1>
            
            <h2 className="font-semibold mb-[clamp(1rem,3vh,1.5rem)] text-brand-orange animate-fade-up-delay" style={{ fontSize: 'clamp(1.25rem, 3vw + 0.25rem, 3rem)' }}>
              Oracles Of God
            </h2>
            
            {/* Ministry focus indicators - Responsive */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(1rem,3vh,1.5rem)] animate-fade-up-delay">
              {['Discipleship', 'Bible Studies', 'Prophetic Writings', 'Spiritual Mentoring', 'Kingdom Resources'].map((role, index) => (
                <span 
                  key={role} 
                  className="px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] bg-card/50 backdrop-blur-sm rounded-full font-medium border border-border/50 hover:border-brand-orange/30 transition-colors duration-300" 
                  style={{ 
                    animationDelay: `${0.1 * index}s`,
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
            
            <p className="text-muted-foreground mb-[clamp(1.5rem,4vh,2.5rem)] max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-up-delay" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 2rem)' }}>
              A fellowship and teaching platform equipping believers for deeper intimacy with God. 
              <span className="text-brand-orange font-semibold"> Free access to spiritual resources</span> 
              that challenge shallow Christianity and call believers into divine purpose.
            </p>
            
            {/* Enhanced CTA Buttons - Responsive with text wrapping */}
            <div className="flex flex-col sm:flex-row gap-[clamp(0.75rem,2vw,1rem)] justify-center lg:justify-start animate-fade-up-delay">
              <Button 
                variant="hero" 
                size="lg" 
                className="group relative overflow-hidden min-h-[clamp(2.75rem,6vw,3.5rem)] px-[clamp(1rem,3vw,1.5rem)]" 
                asChild
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Link to="/books" className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="relative z-10 text-center leading-tight" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Explore Resources</span>
                  <ArrowRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 flex-shrink-0" style={{ width: 'clamp(0.875rem, 1.75vw, 1rem)', height: 'clamp(0.875rem, 1.75vw, 1rem)' }} />
                </Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="group min-h-[clamp(2.75rem,6vw,3.5rem)] px-[clamp(1rem,3vw,1.5rem)]" 
                asChild
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Link to="/bible" className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <Download className="transition-transform group-hover:scale-110 flex-shrink-0" style={{ width: 'clamp(0.875rem, 1.75vw, 1rem)', height: 'clamp(0.875rem, 1.75vw, 1rem)' }} />
                  <span className="text-center leading-tight" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Read Bible</span>
                </Link>
              </Button>
              <Button 
                variant="hero" 
                size="lg" 
                className="group bg-brand-orange hover:bg-brand-orange/90 min-h-[clamp(2.75rem,6vw,3.5rem)] px-[clamp(1rem,3vw,1.5rem)]" 
                asChild
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Link to="/chat" className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="relative z-10 text-center leading-tight" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Join Upper Room</span>
                  <ArrowRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 flex-shrink-0" style={{ width: 'clamp(0.875rem, 1.75vw, 1rem)', height: 'clamp(0.875rem, 1.75vw, 1rem)' }} />
                </Link>
              </Button>
            </div>
            
            {/* Summary under CTA - Responsive */}
            <p className="text-muted-foreground mt-[clamp(1rem,3vh,1.5rem)] max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up-delay" style={{ fontSize: 'clamp(0.875rem, 1.75vw, 1.125rem)' }}>
              Join us on this journey of knowing Him, growing in Him, and revealing Him to the world. Together, we are ELOHIM'S.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;