import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PenTool, Palette, Heart, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: PenTool,
      title: 'Content Writing',
      description: 'Compelling content that tells your story and connects with your audience.',
      features: [
        'Blog posts & articles',
        'Website copy',
        'Social media content',
        'E-books & guides',
        'Email campaigns'
      ],
      price: 'Starting at $50',
    },
    {
      icon: PenTool,
      title: 'UX Writing & Copywriting',
      description: 'Strategic writing that converts and guides user experience.',
      features: [
        'UX copy & microcopy',
        'Sales copywriting',
        'Email sequences',
        'Landing page copy',
        'Product descriptions'
      ],
      price: 'Starting at $75',
    },
    {
      icon: Heart,
      title: 'Business Writing & Consultations',
      description: 'Professional writing and strategic consultations for growth.',
      features: [
        'Business proposals',
        'Technical writing',
        'Content strategy',
        'Brand messaging',
        'Marketing consultations'
      ],
      price: 'Starting at $100',
    },
    {
      icon: Heart,
      title: 'Christian Theology & Coaching',
      description: 'Transformational mentorship for personal and spiritual growth.',
      features: [
        'Biblical studies',
        'Spiritual guidance',
        'Purpose discovery',
        'Goal setting & accountability',
        'Personal development'
      ],
      price: 'Starting at $120',
    },
  ];

  const coachingBenefits = [
    'Gain clarity on your life purpose and direction',
    'Develop spiritual disciplines and practices',
    'Build confidence and overcome limiting beliefs',
    'Create actionable plans for your goals',
    'Receive ongoing support and accountability'
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      <div className="absolute top-10 left-10 w-48 h-48 bg-brand-purple/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-brand-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
            Services
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
            How I Can{' '}
            <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
              Help You
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Whether you're a brand looking to communicate better, a ministry seeking to expand reach, 
            or an individual ready for transformation, I'm here to help you grow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="glass-morphism p-10 text-center hover-lift group animate-scale-in shadow-floating"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-glow">
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-brand-orange transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{service.description}</p>
              <div className="space-y-4 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center justify-start text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-brand-orange mr-4 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </div>
                ))}
              </div>
              <Badge variant="secondary" className="mb-8 bg-brand-orange/20 text-brand-orange border-brand-orange/30 px-4 py-2 text-sm font-bold">
                {service.price}
              </Badge>
              <Button variant="hero-outline" className="w-full glass-card hover-lift font-semibold text-lg py-3" asChild>
                <Link to={`/book?service=${encodeURIComponent(service.title)}`}>
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Featured Service - Coaching */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Card className="glass-morphism overflow-hidden border-brand-orange/20 hover-lift shadow-floating">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <Badge variant="secondary" className="mb-6 bg-brand-gold/20 text-brand-gold border-brand-gold/30 px-4 py-2 text-sm font-bold">
                  ✨ Transformational Mentorship
                </Badge>
                <h3 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-gradient">Word & Life Coaching</h3>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Experience transformational growth through Christian-based coaching that aligns your life 
                  with God's purpose. Together, we'll unlock your potential and create lasting change.
                </p>
                <div className="space-y-4 mb-10">
                  {coachingBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-brand-orange mr-4 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground text-lg leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button variant="hero" size="lg" className="hover-lift" asChild>
                    <Link to="/book?service=Christian-Based%20Coaching">
                      <Calendar className="w-5 h-5 mr-3" />
                      Schedule Consultation
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="lg" className="hover-lift" asChild>
                    <Link to="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="h-80 lg:h-full bg-gradient-accent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
                <div className="text-center p-12 relative z-10">
                  <div className="w-24 h-24 glass-morphism rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Transform Your Life</h4>
                  <p className="text-xl text-white/90">With Purpose & Faith</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <Card className="glass-morphism p-12 hover-lift shadow-floating">
            <h3 className="text-4xl font-display font-bold mb-6 text-gradient">Ready to Get Started?</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project and how I can help you achieve your goals. 
              Every great journey begins with a single conversation.
            </p>
            <Button variant="hero" size="lg" className="hover-lift shadow-glow px-8 py-4 text-lg font-semibold" asChild>
              <Link to="/book">
                <Calendar className="w-5 h-5 mr-3" />
                Book a Free Consultation
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;