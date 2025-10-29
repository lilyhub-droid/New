import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import elohimsLogo from '@/assets/new-elohims-logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Books', href: '/books' },
    { label: 'Videos', href: '/videos' },
    { label: 'Audio', href: '/audio' },
    { label: 'Upper Room', href: '/chat' },
    { label: 'Holy Bible', href: '/bible' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={elohimsLogo} 
              alt="ELOHIM'S Logo" 
              className="w-10 h-10 rounded-lg mr-3"
            />
            <span className="font-display font-bold text-xl text-primary">ELOHIM'S</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, -2).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button variant="hero" size="sm" className="bg-brand-orange hover:bg-brand-orange/90 transition-all duration-300 hover:shadow-glow hover:scale-105" asChild>
              <Link to="/chat" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Upper Room</Link>
            </Button>
            <Button variant="outline" size="sm" className="border-brand-gold/40 hover:border-brand-gold transition-all duration-300 hover:scale-105" asChild>
              <Link to="/bible" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Holy Bible</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 bg-background/95 backdrop-blur-md rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-3 pt-4 px-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.label === 'Upper Room' ? 'hero' : item.label === 'Holy Bible' ? 'outline' : 'ghost'}
                  size="sm"
                  className={`justify-center w-full transition-all duration-300 hover:scale-105 ${
                    item.label === 'Upper Room' 
                      ? 'bg-brand-orange hover:bg-brand-orange/90 hover:shadow-glow' 
                      : item.label === 'Holy Bible'
                      ? 'border-brand-gold/40 hover:border-brand-gold'
                      : 'hover:bg-brand-gold/10'
                  }`}
                  asChild
                >
                  <Link
                    to={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {item.label}
                  </Link>
                </Button>
              ))}
              <div className="flex items-center justify-center pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;