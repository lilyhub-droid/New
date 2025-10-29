import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, BookOpen, Video, Headphones, Book } from 'lucide-react';

const ContentSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Spiritual Books & E-Books",
      description: "Explore transformational books, Biblical studies, and spiritual growth resources.",
      icon: <BookOpen className="w-8 h-8" />,
      link: "/books",
      gradient: "bg-gradient-to-br from-brand-orange/20 to-brand-gold/20"
    },
    {
      title: "Teaching Videos",
      description: "Watch powerful teachings and sermons that will strengthen your faith.",
      icon: <Video className="w-8 h-8" />,
      link: "/videos",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Audio Teachings",
      description: "Listen to inspiring audio messages and worship sessions.",
      icon: <Headphones className="w-8 h-8" />,
      link: "/audio",
      gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20"
    },
    {
      title: "Bible Study",
      description: "Search, read, and bookmark verses in the complete KJV Bible.",
      icon: <Book className="w-8 h-8" />,
      link: "/bible",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl animate-float">📖</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>🎥</div>
        <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🎧</div>
        <div className="absolute top-60 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>✨</div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Explore Our{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Ministry Content
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover resources designed to deepen your relationship with God and grow in spiritual maturity.
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={sliderRef}
          >
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                willChange: 'transform'
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className={`glass-morphism p-8 md:p-12 text-center ${slide.gradient} border-2 border-brand-orange/20 transform transition-all duration-500 ${index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}`}>
                    <div className="flex justify-center mb-6 text-brand-orange animate-pulse-glow">
                      {slide.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{slide.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    <Button 
                      variant="hero" 
                      size="lg" 
                      asChild
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <Link to={slide.link} className="whitespace-nowrap">
                        Explore Content
                      </Link>
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 glass-morphism hover:bg-brand-orange/10"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 glass-morphism hover:bg-brand-orange/10"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-brand-orange scale-125' 
                    : 'bg-brand-orange/30 hover:bg-brand-orange/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSlideshow;