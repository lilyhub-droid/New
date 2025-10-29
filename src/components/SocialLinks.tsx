import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone, Calendar, Globe, Twitter, Instagram, Linkedin } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your-email@example.com',
      color: 'hover:text-blue-600',
      label: 'Send Email'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/1234567890',
      color: 'hover:text-green-600',
      label: 'Chat on WhatsApp'
    },
    {
      name: 'Phone',
      icon: Phone,
      href: 'tel:+1234567890',
      color: 'hover:text-purple-600',
      label: 'Call Now'
    },
    {
      name: 'Schedule',
      icon: Calendar,
      href: 'https://calendly.com/your-calendly-link',
      color: 'hover:text-orange-600',
      label: 'Book Consultation'
    },
    {
      name: 'Website',
      icon: Globe,
      href: 'https://your-website.com',
      color: 'hover:text-indigo-600',
      label: 'Visit Website'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/your-handle',
      color: 'hover:text-sky-600',
      label: 'Follow on Twitter'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/your-handle',
      color: 'hover:text-pink-600',
      label: 'Follow on Instagram'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/your-profile',
      color: 'hover:text-blue-700',
      label: 'Connect on LinkedIn'
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Connect With Me</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              size="lg"
              asChild
              className={`flex flex-col items-center p-4 h-auto space-y-2 transition-all duration-300 ${link.color}`}
            >
              <a 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{link.name}</span>
              </a>
            </Button>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Choose your preferred way to get in touch!
        </p>
      </CardContent>
    </Card>
  );
};

export { SocialLinks };