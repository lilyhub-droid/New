import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart } from 'lucide-react';

const MissionSection = () => {
  const sections = [
    {
      title: 'Mission',
      icon: Target,
      content: 'To awaken believers to divine purpose and alignment with God\'s Kairos moments, equipping them to live consecrated lives that bear fruit for the Kingdom. We are committed to raising disciples who walk in truth, power, and intimacy with God.',
      color: 'brand-orange'
    },
    {
      title: 'Vision',
      icon: Eye,
      content: 'A generation fully yielded to Christ...burning with His fire, grounded in His Word, and equipped to influence culture through the life of the Spirit. Our vision is to see ordinary men and women become living altars, carriers of God\'s Presence, and witnesses of His Kingdom on earth.',
      color: 'brand-gold'
    },
    {
      title: 'About Us',
      icon: Heart,
      content: 'ELOHIM\'S is a fellowship and teaching platform birthed to disciple, equip, and strengthen believers in their spiritual walk. Through Bible studies, prophetic writings, teaching sessions, and mentoring, we seek to draw hearts back to the altar of intimacy with God.',
      color: 'brand-orange'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
            Our Foundation
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            Called to{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Transform
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We provide resources...books, devotionals, audio teachings, and videos...that challenge shallow Christianity and call believers into depth, prayer, and alignment with divine purpose.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <Card 
              key={section.title}
              className="glass-morphism p-8 hover-glow hover-lift animate-fade-up"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-${section.color}/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`w-6 h-6 text-${section.color}`} />
                </div>
                <h3 className="text-2xl font-display font-bold text-gradient">{section.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {section.content}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <Card className="glass-morphism p-12 bg-gradient-primary/5 border-brand-orange/20 hover-lift shadow-floating">
            <p className="text-2xl lg:text-3xl font-display font-semibold mb-6 text-gradient leading-relaxed">
              "At ELOHIM'S, it is not about performance or platforms...it is about raising a people who burn for God in secret and shine His light in public."
            </p>
            <p className="text-xl text-brand-orange font-semibold">
              Join us on this journey of knowing Him, growing in Him, and revealing Him to the world. Together, we are ELOHIM'S.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;