import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Calendar, MessageCircle, Send, MapPin, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send me a message anytime',
      value: 'aduraogungbe2021@gmail.com',
      action: 'mailto:aduraogungbe2021@gmail.com',
      color: 'brand-orange',
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      description: 'Quick chat or voice call',
      value: '+234 912 641 8216',
      action: 'https://wa.me/2349126418216',
      color: 'brand-gold',
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: '30-minute consultation',
      value: 'Book via Calendly',
      action: 'https://calendly.com/aduraogungbe2021/30min',
      color: 'brand-orange',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Professional networking',
      value: 'Connect with me',
      action: 'https://www.linkedin.com/in/aduragbemi-ogungbe-454554281',
      color: 'brand-gold',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      // Store in Supabase
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          submitted_at: new Date().toISOString()
        }]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
      }

      // Send email via EmailJS
      await emailjs.send(
        'service_ur72pjo',
        'template_bp6ubnk',
        {
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          message: formData.message,
          to_email: 'aduraogungbe2021@gmail.com',
        },
        'QrR2dLtzyqEQ7ryMl'
      );

      setShowSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });


      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
      <div className="absolute top-20 right-10 w-44 h-44 bg-brand-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-36 h-36 bg-brand-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-6 py-2">
            Get In Touch
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
            Let's{' '}
            <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I'd love to hear from you! Whether you're interested in my writings, consultation sessions, or collaborations, feel free to reach out. Let's discuss how we can work together to transform your message and maximize your impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-3xl font-display font-bold mb-8 text-gradient">Get in Touch</h3>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                Whether you're interested in my writings, need consultation sessions, or want to explore collaborative opportunities, 
                I'm here to help. Choose your preferred way to connect:
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <Card 
                  key={method.title} 
                  className="glass-morphism p-8 hover-lift group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  onClick={() => window.open(method.action, '_blank')}
                >
                  <div className="flex items-center">
                    <div className={`w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-glow`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary mb-2 text-lg group-hover:text-brand-orange transition-colors">{method.title}</h4>
                      <p className="text-muted-foreground mb-2">{method.description}</p>
                      <p className="font-semibold text-brand-orange">{method.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Location */}
            <Card className="glass-morphism p-8 bg-brand-orange/5 border-brand-orange/20 hover-lift">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mr-6 shadow-glow">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2 text-lg">Based in Nigeria</h4>
                  <p className="text-muted-foreground text-lg">Serving clients globally</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-morphism p-10 hover-lift shadow-floating">
              <h3 className="text-3xl font-display font-bold mb-8 text-gradient">Send a Message</h3>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="font-medium">Message sent successfully!</p>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      aria-label="Full name"
                      required
                      className="mt-3 glass-card p-4 text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      aria-label="Email address"
                      required
                      className="mt-3 glass-card p-4 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service" className="text-lg font-semibold">Service Interested In</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    aria-label="Service of interest"
                    className="w-full mt-3 px-4 py-4 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-lg"
                  >
                    <option value="">Select a service</option>
                    <option value="writing-consultation">Writing Consultation</option>
                    <option value="faith-based-coaching">Faith-Based Coaching</option>
                    <option value="devotional-writing">Devotional Writing</option>
                    <option value="book-writing">Book Writing</option>
                    <option value="article-writing">Article Writing</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-lg font-semibold">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, goals, or how I can help you grow through writing and faith-based consultation..."
                    aria-label="Your message"
                    required
                    className="mt-3 glass-card min-h-[150px] p-4 text-lg"
                  />
                </div>


                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full hover-lift text-lg py-4 font-semibold shadow-glow" 
                  disabled={isSubmitting}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 mr-3" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <div className="text-xs text-muted-foreground text-center space-y-2">
                  <p>
                    🔒 <strong>Privacy Note:</strong> Your information is safe with us. We only use your data to respond to your inquiry and will never share it with third parties.
                  </p>
                  <p>
                    By submitting this form, you agree to our <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a> and <a href="/terms" className="underline hover:text-primary">Terms of Service</a>.
                  </p>
                </div>
              </form>

              <div className="mt-8 p-6 glass-card bg-brand-orange/5 rounded-xl border border-brand-orange/20">
                <p className="text-muted-foreground text-center leading-relaxed">
                  <strong className="text-brand-orange">Quick Response:</strong> I typically respond within 24 hours. 
                  For urgent matters, please contact me via WhatsApp.
                </p>
              </div>
            </Card>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Card className="glass-morphism p-12 bg-gradient-primary hover-lift shadow-floating relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-display font-bold text-white mb-6">
                Ready to Transform Your Vision?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your project and create something amazing together. 
                Your story deserves to be told beautifully.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-brand-orange border-white hover:bg-transparent hover:text-white hover:border-white/80 font-semibold text-lg px-8 py-4 hover-lift"
                onClick={() => window.open('https://calendly.com/aduraogungbe2021/30min', '_blank')}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Free Consultation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;