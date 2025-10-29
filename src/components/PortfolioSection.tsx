import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, Filter, Download } from 'lucide-react';
import { PDFViewer } from '@/components/PDFViewer';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Works' },
    { id: 'writing', label: 'Writing' },
    { id: 'books', label: 'Books' },
    { id: 'devotionals', label: 'Devotionals' },
  ];

  const books = [
    {
      id: 1,
      title: 'FLICKERS ARE NOT FIRE',
      subtitle: '"They sparkle... but they are not sanctified."',
      category: 'books',
      type: 'Spiritual Book',
      description: 'This book dives deep into the dangerous beauty of false light...a glitter that impresses men but lacks the fire of God. Through the dialogue of a boy and an Elder, it exposes the difference between appearance and authenticity, between gifts and consecration, between stage performance and true altar fire.',
      tags: ['Spiritual Growth', 'Authenticity', 'Ministry'],
      icon: '🔥',
    },
    {
      id: 2,
      title: 'I KILLED THE MIRRORS',
      subtitle: 'The Mystery of False Light',
      category: 'books',
      type: 'Spiritual Book',
      description: 'Not every light comes from God. Many shine but never burn. This book unveils the danger of mistaking glitter for glory...torches polished for platforms but empty of fire. It warns against borrowed callings, false flames, and stage-built ministries that comfort sin instead of confronting it.',
      tags: ['False Light', 'Ministry', 'Truth'],
      icon: '🪞',
    },
    {
      id: 3,
      title: 'ASHES BENEATH THE ALTAR',
      subtitle: 'The Cry of Ages',
      category: 'books',
      type: 'Spiritual Book',
      description: 'The altar doesn\'t remember talent ... it remembers surrender. This book speaks from the ashes of forgotten men and women who burned until only God remained. It confronts the tragedy of those who built altars but never stayed to die on them.',
      tags: ['Surrender', 'Sacrifice', 'Altar'],
      icon: '🔥',
    },
    {
      id: 4,
      title: 'ECHOES OF RESILIENCE',
      subtitle: 'Finding Strength in the Quiet After the Storm',
      category: 'books',
      type: 'Personal Development',
      description: 'Life does not only test us in the moment of impact, but in the silence that follows. The Echoes of Resilience is a reflection on what it means to rise after breaking, to rebuild when the applause has faded, and to discover the strength that whispers louder than pain.',
      tags: ['Resilience', 'Personal Growth', 'Recovery'],
      icon: '🌊',
    },
  ];

  const portfolioItems = [
    {
      id: 5,
      title: 'KAIROS Project',
      category: 'devotionals',
      type: 'Featured E-Novel',
      description: 'A transformational spiritual and educational e-novel that guides readers through personal growth and divine timing.',
      tags: ['Writing', 'Spiritual', 'Education'],
      image: '/api/placeholder/400/300',
      featured: true,
      url: 'https://mhsgqeqezpxtacradpkp.supabase.co/storage/v1/object/public/Uploads/KAIROS.pdf',
    },
    {
      id: 6,
      title: 'Daily Devotional Series',
      category: 'devotionals',
      type: 'Devotional Writing',
      description: 'Daily reflections and devotional content designed to inspire and guide believers in their spiritual journey.',
      tags: ['Devotionals', 'Daily Reading', 'Spiritual Growth'],
      image: '/api/placeholder/400/300',
    },
    {
      id: 7,
      title: 'Business Leadership Articles',
      category: 'writing',
      type: 'Content Writing',
      description: 'Comprehensive articles helping Christian entrepreneurs and leaders build authentic, faith-centered businesses.',
      tags: ['Business', 'Leadership', 'Faith'],
      image: '/api/placeholder/400/300',
    },
    {
      id: 8,
      title: 'Ministry Teaching Resources',
      category: 'writing',
      type: 'Educational Content',
      description: 'Teaching materials and study guides designed to help pastors and ministry leaders in their educational programs.',
      tags: ['Ministry', 'Teaching', 'Resources'],
      image: '/api/placeholder/400/300',
    },
    {
      id: 9,
      title: 'Reflective Articles Collection',
      category: 'writing',
      type: 'Article Writing',
      description: 'Thought-provoking articles covering faith, personal development, and purposeful living from a Christian perspective.',
      tags: ['Faith', 'Personal Development', 'Articles'],
      image: '/api/placeholder/400/300',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-10 right-20 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-orange/10 text-brand-orange border-brand-orange/20 px-6 py-2">
            Portfolio
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
            Featured{' '}
            <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            My portfolio reflects my journey as a Christian writer and consultation coach. From devotionals and reflective articles to book projects and teaching resources, each work is crafted to inspire growth, clarity, and transformation. I specialize in creating impactful written content for individuals, ministries, and organizations, while also offering consultation sessions to help others align with purpose and maximize their influence.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'hero' : 'outline'}
              onClick={() => setActiveFilter(filter.id)}
              className="glass-morphism hover-lift px-6 py-3 text-lg font-semibold"
            >
              <Filter className="w-5 h-5 mr-3" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Books Section */}
        {activeFilter === 'all' || activeFilter === 'books' ? (
          <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center mb-12">
              <h3 className="text-4xl font-display font-bold mb-4 text-gradient">Published Books</h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collection of transformational books designed to inspire spiritual growth and personal development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {books.map((book, index) => (
                <Card key={book.id} className="glass-morphism p-8 hover-lift group animate-scale-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow">
                      <span className="text-2xl">{book.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-xl mb-2 group-hover:text-brand-orange transition-colors">{book.title}</h4>
                      <p className="text-brand-orange font-semibold mb-3 text-sm">{book.subtitle}</p>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{book.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="glass-card text-xs px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="text-brand-orange hover:bg-brand-orange/20 font-semibold">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* Featured Project - KAIROS */}
        {activeFilter === 'all' || activeFilter === 'devotionals' ? (
          <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-morphism overflow-hidden border-brand-orange/20 hover-lift shadow-floating">
              <div className="grid lg:grid-cols-2">
                <div className="p-12 lg:p-16">
                  <Badge variant="secondary" className="mb-6 bg-brand-gold/20 text-brand-gold border-brand-gold/30 px-4 py-2 text-sm font-bold">
                    ✨ Featured Project
                  </Badge>
                  <h3 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-gradient">The KAIROS Project</h3>
                  <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                    A transformational e-novel that explores spiritual growth, divine timing, and personal transformation. 
                    This project combines compelling storytelling with educational content to guide readers on their journey 
                    of self-discovery and spiritual awakening.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Spiritual Growth', 'E-Novel', 'Education', 'Transformation'].map((tag) => (
                      <Badge key={tag} variant="outline" className="glass-card border-brand-orange/30 text-brand-orange px-4 py-2 text-sm font-semibold">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <PDFViewer 
                      url="https://mhsgqeqezpxtacradpkp.supabase.co/storage/v1/object/public/Uploads/KAIROS.pdf"
                      title="KAIROS Project"
                      trigger={
                        <Button variant="hero" size="lg" className="hover-lift">
                          <Eye className="w-5 h-5 mr-3" />
                          View Book
                        </Button>
                      }
                    />
                    <Button 
                      variant="hero-outline" 
                      size="lg" 
                      className="hover-lift"
                      onClick={() => window.open('https://mhsgqeqezpxtacradpkp.supabase.co/storage/v1/object/public/Uploads/KAIROS.pdf', '_blank')}
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="h-80 lg:h-full bg-gradient-primary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
                  <div className="text-center p-12 relative z-10">
                    <div className="w-32 h-32 glass-morphism rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                      <span className="text-4xl font-bold text-white">K</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">KAIROS Project</h4>
                    <p className="text-white/80 text-lg">Transformational E-Novel</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : null}

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {filteredItems.filter(item => !item.featured).map((item, index) => (
            <Card 
              key={item.id} 
              className="glass-morphism group overflow-hidden hover-lift cursor-pointer animate-scale-in"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className="h-56 bg-gradient-subtle flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
                <div className="text-center p-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                    <span className="text-2xl font-bold text-white">
                      {item.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-brand-orange font-semibold">{item.type}</p>
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-display font-bold text-2xl mb-4 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h4>
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="glass-card text-xs px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 2 && (
                    <Badge variant="secondary" className="glass-card text-xs px-3 py-1">
                      +{item.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="lg" className="w-full glass-card group-hover:bg-brand-orange/20 group-hover:text-brand-orange font-semibold">
                  <Eye className="w-5 h-5 mr-3" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials Placeholder */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="mb-12">
            <h3 className="text-4xl font-display font-bold mb-4 text-gradient">What Readers Say</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Testimonials from those whose lives have been transformed through writing and consultation.
            </p>
          </div>
          <Card className="glass-morphism p-12 hover-lift shadow-floating max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-6 opacity-20">"</div>
              <p className="text-xl italic text-muted-foreground mb-6 leading-relaxed">
                "Aduragbemi's writings helped me find clarity in a season of confusion. His words carry wisdom and life."
              </p>
              <div className="text-brand-orange font-semibold">— [Client/Reader Name]</div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '1s' }}>
          <Card className="glass-morphism p-12 hover-lift shadow-floating">
            <h3 className="text-3xl font-display font-bold mb-6 text-gradient">
              Ready to Transform Your Message?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's work together to bring clarity, impact, and transformation to your story and ministry.
            </p>
            <Button variant="hero" size="lg" className="hover-lift shadow-glow">
              Start Your Transformation Journey
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;