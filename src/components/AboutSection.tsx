import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Palette, Heart, Users } from 'lucide-react';

const AboutSection = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Writing Journey Begins',
      description: 'Started with faith-based books and spiritual content creation',
      icon: BookOpen,
    },
    {
      year: '2022',
      title: 'Ministry Focus',
      description: 'Expanded to serve ministries and Christian organizations with specialized content',
      icon: Heart,
    },
    {
      year: '2023',
      title: 'Consultation Coaching',
      description: 'Launched faith-based consultation services for personal and spiritual growth',
      icon: Users,
    },
    {
      year: '2024',
      title: 'Transformational Ministry',
      description: 'Now serving as a full-time Christian writer and consultation coach',
      icon: Palette,
    },
  ];

  const values = [
    {
      title: 'Faith-Centered',
      description: 'Every piece of work is grounded in biblical wisdom and divine purpose',
    },
    {
      title: 'Transformational Impact',
      description: 'Creating content and providing guidance that leads to lasting change',
    },
    {
      title: 'Excellence & Integrity',
      description: 'Committed to the highest standards in both craft and character',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
            About Me
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
            Passionate About{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            My journey began with a deep passion for writing and a calling to help others grow through faith-centered guidance. 
            As a Christian writer and consultation coach, I combine powerful storytelling with transformational coaching to help individuals, ministries, and organizations maximize their influence and align with their divine purpose.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Personal Story */}
          <div className="animate-slide-up hover-lift" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-morphism p-8 hover-glow">
              <h3 className="text-3xl font-display font-bold mb-8 text-gradient">My Story</h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  My journey as a Christian writer began with a deep conviction that words have the power to transform lives. What started as faith-based writing has evolved into a comprehensive ministry of helping individuals, organizations, and ministries communicate their message with clarity, impact, and divine purpose.
                </p>
                <p className="text-lg">
                  With a passion for both writing and mentoring, I specialize in creating content that doesn't just inform but transforms. Through my books, articles, devotionals, and consultation sessions, I help others discover their unique voice and align their message with God's calling on their lives.
                </p>
                <p className="text-lg">
                  Whether I'm crafting a powerful devotional, writing business content that reflects Christian values, or coaching someone through their personal and spiritual growth journey, my commitment remains the same: to help every person and organization I work with maximize their influence for lasting impact.
                </p>
              </div>
            </Card>
          </div>

          {/* Core Values */}
          <div className="animate-slide-up hover-lift" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-morphism p-8 hover-glow">
              <h3 className="text-3xl font-display font-bold mb-8 text-gradient">Core Values</h3>
              <div className="space-y-8">
                {values.map((value, index) => (
                  <div key={value.title} className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform shadow-glow">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2 text-lg group-hover:text-brand-orange transition-colors">{value.title}</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-4xl font-display font-bold text-center mb-16 text-gradient">Journey Milestones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={milestone.year} className="glass-morphism p-8 text-center hover-lift group animate-scale-in" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>
                <Badge variant="secondary" className="mb-4 bg-brand-orange/20 text-brand-orange border-brand-orange/30 px-4 py-1 text-sm font-semibold">{milestone.year}</Badge>
                <h4 className="font-bold text-primary mb-3 text-lg group-hover:text-brand-orange transition-colors">{milestone.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-20 text-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <Card className="glass-morphism p-12 bg-gradient-primary/5 border-brand-orange/20 hover-lift shadow-floating">
            <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-6 text-gradient">Current Education</h3>
            <p className="text-xl text-primary mb-4 font-semibold">
              Computer Science Student
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Continuously expanding my technical skills while maintaining a focus on creative problem-solving 
              and innovative approaches to communication and design.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;