import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool, Palette, Users, BookOpen, Code, Heart } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Writing & Content',
      icon: PenTool,
      skills: [
        { name: 'Creative Writing', level: 95 },
        { name: 'Content Strategy', level: 90 },
        { name: 'Copywriting', level: 88 },
        { name: 'Blogging', level: 92 },
        { name: 'Technical Writing', level: 85 },
      ],
      color: 'brand-orange',
    },
    {
      title: 'Design & Visual',
      icon: Palette,
      skills: [
        { name: 'Logo Design', level: 90 },
        { name: 'Brand Identity', level: 88 },
        { name: 'Social Media Graphics', level: 92 },
        { name: 'Print Design', level: 85 },
        { name: 'UI/UX Basics', level: 75 },
      ],
      color: 'brand-gold',
    },
    {
      title: 'Coaching & Mentoring',
      icon: Heart,
      skills: [
        { name: 'Life Coaching', level: 90 },
        { name: 'Spiritual Guidance', level: 95 },
        { name: 'Goal Setting', level: 88 },
        { name: 'Communication', level: 92 },
        { name: 'Active Listening', level: 94 },
      ],
      color: 'brand-orange',
    },
  ];

  const tools = [
    { name: 'Adobe Creative Suite', category: 'Design' },
    { name: 'Canva Pro', category: 'Design' },
    { name: 'Microsoft Office', category: 'Productivity' },
    { name: 'Google Workspace', category: 'Productivity' },
    { name: 'Notion', category: 'Organization' },
    { name: 'Calendly', category: 'Scheduling' },
    { name: 'Google Meet', category: 'Communication' },
    { name: 'WhatsApp Business', category: 'Communication' },
  ];

  const expertise = [
    {
      title: 'Content Creation',
      description: 'Crafting compelling narratives that resonate with diverse audiences',
      icon: BookOpen,
    },
    {
      title: 'Visual Storytelling',
      description: 'Translating concepts into visually appealing designs',
      icon: Palette,
    },
    {
      title: 'Spiritual Mentorship',
      description: 'Guiding individuals through faith-based personal development',
      icon: Heart,
    },
    {
      title: 'Brand Communication',
      description: 'Helping organizations communicate their mission effectively',
      icon: Users,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <Badge variant="secondary" className="mb-4 bg-brand-orange/10 text-brand-orange border-brand-orange/20">
            Skills & Expertise
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            What I{' '}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Bring
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A unique combination of creative, technical, and spiritual skills that enable me to 
            serve clients holistically and create meaningful impact.
          </p>
        </div>

        {/* Expertise Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) => (
            <Card 
              key={item.title} 
              className="p-6 text-center hover:shadow-glow transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/30 transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* Detailed Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="p-8 hover:shadow-glow transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-${category.color}/20 rounded-full flex items-center justify-center mr-4`}>
                  <category.icon className={`w-6 h-6 text-${category.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-primary">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-accent transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-2xl font-display font-semibold text-center mb-8">Tools & Technologies</h3>
          <Card className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <div key={tool.name} className="text-center p-4 rounded-lg hover:bg-brand-orange/5 transition-colors">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-brand-orange">
                      {tool.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-primary mb-1">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.category}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Journey */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <Card className="p-8 bg-gradient-subtle">
            <h3 className="text-2xl font-display font-semibold mb-4">Continuous Learning</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              As a Computer Science student and lifelong learner, I'm constantly expanding my skillset 
              and staying current with industry trends and best practices.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['AI & Technology', 'Advanced Design', 'Leadership', 'Biblical Studies', 'Digital Marketing'].map((area) => (
                <Badge key={area} variant="outline" className="border-brand-orange/30 text-brand-orange">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;