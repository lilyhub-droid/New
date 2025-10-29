import React from 'react';
import Navigation from '@/components/Navigation';
import { TestimonialSection } from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import SkillsSection from '@/components/SkillsSection';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Building,
  Lightbulb,
  Award
} from 'lucide-react';

const Business = () => {
  const businessServices = [
    {
      title: 'Business Strategy Consulting',
      description: 'Comprehensive business planning and strategic development',
      features: ['Market Analysis', 'Competitive Research', 'Growth Planning', 'ROI Optimization'],
      icon: Target,
      price: 'From $500'
    },
    {
      title: 'Content Marketing Strategy',
      description: 'Data-driven content strategies that convert and engage',
      features: ['Content Planning', 'Brand Voice Development', 'SEO Strategy', 'Analytics Setup'],
      icon: TrendingUp,
      price: 'From $750'
    },
    {
      title: 'Team Leadership Coaching',
      description: 'Transform your leadership skills and team dynamics',
      features: ['Leadership Assessment', 'Team Building', 'Communication Skills', 'Performance Management'],
      icon: Users,
      price: 'From $300/session'
    }
  ];

  const achievements = [
    {
      number: '50+',
      label: 'Businesses Transformed',
      icon: Building
    },
    {
      number: '95%',
      label: 'Client Success Rate',
      icon: Award
    },
    {
      number: '200+',
      label: 'Strategic Plans Created',
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute top-20 right-10 w-44 h-44 bg-brand-orange/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-36 h-36 bg-brand-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-6 py-3">
              <Briefcase className="w-4 h-4 mr-2" />
              Business Solutions
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Transform Your{' '}
              <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
                Business
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Strategic consulting and leadership coaching that drives real results. 
              Let's build your success story together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="hero" size="lg" className="hover-lift text-lg px-8 py-4">
                <Target className="w-5 h-5 mr-3" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="hover-lift text-lg px-8 py-4">
                <ArrowRight className="w-5 h-5 mr-3" />
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className="glass-morphism p-8 text-center hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-display font-bold text-gradient mb-2">
                  {achievement.number}
                </h3>
                <p className="text-muted-foreground font-medium">{achievement.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
              Business Solutions
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              Strategic{' '}
              <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
                Business Services
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive business solutions designed to accelerate your growth and maximize your potential
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {businessServices.map((service, index) => (
              <Card 
                key={service.title} 
                className="glass-morphism p-8 hover-lift group relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-4 text-gradient">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-brand-orange mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <Badge variant="outline" className="bg-brand-orange/10 text-brand-orange border-brand-orange/30">
                      {service.price}
                    </Badge>
                    <Button variant="hero" size="sm" className="hover-lift">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Card className="glass-morphism p-12 bg-gradient-primary hover-lift shadow-floating relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-display font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your business goals and create a strategic plan that drives real results. 
                Book your free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white text-brand-orange border-white hover:bg-transparent hover:text-white hover:border-white/80 font-semibold text-lg px-8 py-4 hover-lift"
                >
                  <Star className="w-5 h-5 mr-3" />
                  Book Free Consultation
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 hover-lift"
                >
                  <ArrowRight className="w-5 h-5 mr-3" />
                  View Pricing
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      
      {/* Aduragbemi A.O. Professional Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Aduragbemi A.O.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founder of ELOHIM'S and dedicated to spiritual growth and professional excellence
            </p>
          </div>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Business;