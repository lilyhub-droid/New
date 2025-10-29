import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logoImage from '@/assets/new-elohims-logo.png';

const Footer = () => {
  const location = useLocation();
  const isBusinessPage = location.pathname === '/business';

  if (isBusinessPage) {
    return (
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Aduragbemi Section - Only on Business Page */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Aduragbemi Abraham</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Christian writer, consultant, and ministry leader passionate about helping believers discover their divine purpose.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <Link to="/business#about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Me
                </Link>
                <Link to="/business#services" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Consulting
                </Link>
                <Link to="/business#portfolio" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
                <Link to="/business#contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            {/* Ministry Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Ministry</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                  ELOHIM'S
                </Link>
                <Link to="/books" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Books
                </Link>
                <Link to="/videos" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Videos
                </Link>
                <Link to="/audio" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Audio
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 Aduragbemi Abraham. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Default footer for all other pages
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ELOHIM'S Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="ELOHIM'S Logo" className="w-12 h-12" />
              <h3 className="text-2xl font-bold">ELOHIM'S</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A fellowship and teaching platform equipping believers for deeper intimacy with God and divine purpose.
            </p>
          </div>
          
          {/* Ministry Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              <Link to="/books" className="block text-muted-foreground hover:text-foreground transition-colors">
                Books & E-Books
              </Link>
              <Link to="/videos" className="block text-muted-foreground hover:text-foreground transition-colors">
                Teaching Videos
              </Link>
              <Link to="/audio" className="block text-muted-foreground hover:text-foreground transition-colors">
                Audio Messages
              </Link>
              <Link to="/bible" className="block text-muted-foreground hover:text-foreground transition-colors">
                Bible Study
              </Link>
            </div>
          </div>
          
          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <div className="space-y-2">
              <Link to="/chat" className="block text-muted-foreground hover:text-foreground transition-colors">
                Upper Room
              </Link>
              <Link to="/bible" className="block text-muted-foreground hover:text-foreground transition-colors">
                Holy Bible
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Elohim's. Oracles Of God.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;