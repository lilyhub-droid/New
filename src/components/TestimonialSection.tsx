import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  avatar_url?: string;
  is_featured: boolean;
}

export const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
            Testimonials
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
            What Clients{' '}
            <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover how our collaboration has transformed brands, ministries, and individuals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`glass-morphism p-8 hover-lift group animate-scale-in ${
                testimonial.is_featured ? 'border-brand-orange/30 shadow-glow' : ''
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="flex">{renderStars(testimonial.rating)}</div>
                {testimonial.is_featured && (
                  <Badge variant="secondary" className="ml-auto bg-brand-orange/20 text-brand-orange border-brand-orange/30 text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-brand-orange/30 absolute -top-2 -left-2" />
                <p className="text-muted-foreground leading-relaxed pl-6 italic">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center">
                {testimonial.avatar_url ? (
                  <img 
                    src={testimonial.avatar_url} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-primary group-hover:text-brand-orange transition-colors">
                    {testimonial.name}
                  </h4>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role && testimonial.company 
                        ? `${testimonial.role}, ${testimonial.company}`
                        : testimonial.role || testimonial.company
                      }
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};