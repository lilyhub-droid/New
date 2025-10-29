import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('service') || 'Content Writing';
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceType,
    projectDescription: '',
    timeline: '',
    budget: '',
    preferredDate: '',
    additionalInfo: ''
  });

  const serviceOptions = [
    'Content Writing',
    'Graphic Design', 
    'Christian-Based Coaching'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Booking Request - ${formData.service}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Project Description: ${formData.projectDescription}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Preferred Date: ${formData.preferredDate}
Additional Information: ${formData.additionalInfo}
    `.trim();
    
    const mailtoLink = `mailto:aduragbemiabrahamo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "Booking Request Sent!",
      description: "Your email client will open with the booking details.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-10 left-10 w-48 h-48 bg-brand-purple/10 rounded-full blur-3xl animate-float"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2">
                Book Your Service
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Let's Start Your{' '}
                <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
                  Project
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Fill out the form below and I'll get back to you within 24 hours to discuss your project details.
              </p>
            </div>

            <Card className="glass-morphism p-8 lg:p-12 hover-lift shadow-floating animate-scale-in">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="glass-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="glass-card"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Phone Number</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="glass-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Service Type *</label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Project Description *</label>
                  <Textarea
                    required
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    placeholder="Please describe your project, goals, and what you're looking to achieve..."
                    className="glass-card min-h-[120px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Timeline</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Project timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                        <SelectItem value="1-week">Within 1 week</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Budget Range</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under $100</SelectItem>
                        <SelectItem value="100-250">$100 - $250</SelectItem>
                        <SelectItem value="250-500">$250 - $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-plus">$1,000+</SelectItem>
                        <SelectItem value="discuss">Let's discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Preferred Consultation Date</label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className="glass-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Additional Information</label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any additional details, references, inspiration, or specific requirements..."
                    className="glass-card"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="submit" variant="hero" size="lg" className="flex-1 hover-lift">
                    <Send className="w-5 h-5 mr-3" />
                    Send Booking Request
                  </Button>
                  <Button type="button" variant="hero-outline" size="lg" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-5 h-5 mr-3" />
                    Go Back
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingForm;