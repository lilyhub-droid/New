import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Crown, Users, Lightbulb, HandHeart, Globe } from 'lucide-react';

const CoreValuesSection = () => {
  const values = [
    {
      title: 'Intimacy with God',
      description: 'We believe true transformation begins in the secret place. Prayer, worship, and the Word are the foundation of all we do.',
      icon: Heart,
      color: 'brand-orange'
    },
    {
      title: 'Holiness and Consecration',
      description: 'We are called to live as vessels set apart for God\'s use...choosing purity over popularity and obedience over applause.',
      icon: Crown,
      color: 'brand-gold'
    },
    {
      title: 'Discipleship and Growth',
      description: 'Our aim is to raise mature believers who are rooted in Christ, growing in knowledge, and equipped to disciple others.',
      icon: Users,
      color: 'brand-orange'
    },
    {
      title: 'Spirit and Truth',
      description: 'We embrace the power of the Holy Spirit while staying grounded in the unshakable truth of Scripture.',
      icon: Lightbulb,
      color: 'brand-gold'
    },
    {
      title: 'Sacrifice and Service',
      description: 'Ministry is not a stage but a surrender. We lay down our lives in service to God and to people.',
      icon: HandHeart,
      color: 'brand-orange'
    },
    {
      title: 'Kingdom Impact',
      description: 'We live not for ourselves but to extend God\'s Kingdom...touching lives, influencing culture, and shining the light of Christ wherever we are sent.',
      icon: Globe,
      color: 'brand-gold'
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-6 py-2">
            Core Values
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
            What We{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Stand For
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            These foundational principles guide everything we do and shape the community we are building together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card 
              key={value.title}
              className="glass-morphism p-8 hover-glow hover-lift animate-fade-up text-center group"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`w-16 h-16 bg-${value.color}/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow`}>
                <value.icon className={`w-8 h-8 text-${value.color}`} />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-gradient group-hover:text-brand-orange transition-colors">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;