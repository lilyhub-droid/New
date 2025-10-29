import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react';

export const StayConnected = () => {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: MessageCircle,
      href: 'https://t.me/E_OracleofGod',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/share/14Ggc4YpB26/',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/oraclesofgod_e?igsh=NDVwcGlsbWoyeDdk',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@oog_ehms?si=d8qv37iyvIBkRvFT',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-morphism p-12 text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 text-gradient">Stay Connected</h3>
              <p className="text-muted-foreground text-lg">
                Follow us on your favorite platform to never miss updates and new content.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="lg"
                  className={`h-20 flex-col gap-2 group transition-all duration-300 hover:shadow-glow bg-gradient-to-br ${link.color} ${link.hoverColor} text-white hover:text-white rounded-2xl`}
                  asChild
                >
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${link.name}`}
                  >
                    <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};