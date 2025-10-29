import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, MessageCircle, Users, Heart, Lightbulb, Globe } from 'lucide-react';

const QuickNavigation = () => {
  const navItems = [
    {
      title: "Study Together",
      description: "Join our Bible study sessions",
      icon: <BookOpen className="w-6 h-6" />,
      link: "/bible",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      title: "Upper Room",
      description: "Connect in our prayer chat",
      icon: <MessageCircle className="w-6 h-6" />,
      link: "/chat",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/10"
    },
    {
      title: "Fellowship",
      description: "Find community resources",
      icon: <Users className="w-6 h-6" />,
      link: "/books",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
      title: "Prayer Life",
      description: "Deepen your prayer walk",
      icon: <Heart className="w-6 h-6" />,
      link: "/audio",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/30"
    },
    {
      title: "Teachings",
      description: "Access video sermons",
      icon: <Lightbulb className="w-6 h-6" />,
      link: "/videos",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      title: "Kingdom Impact",
      description: "Live for His glory",
      icon: <Globe className="w-6 h-6" />,
      link: "/books",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30"
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-4xl animate-float">🕊️</div>
        <div className="absolute top-40 right-20 text-3xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-float" style={{ animationDelay: '2s' }}>🔥</div>
        <div className="absolute top-60 right-1/3 text-3xl animate-float" style={{ animationDelay: '3s' }}>💡</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Navigate Your{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Spiritual Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find resources and connections to grow deeper in your relationship with God
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navItems.map((item, index) => (
            <Card 
              key={item.title} 
              className="glass-morphism hover-lift group p-6 animate-scale-in border-2 border-transparent hover:border-brand-orange/20 transition-all duration-300"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${item.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={item.color}>
                  {item.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>
              
              <Button variant="outline" size="sm" asChild className="w-full group-hover:border-brand-orange/30">
                <Link to={item.link}>
                  Explore
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;