import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Download, Search, Clock, Tag, Eye, Sparkles } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  series?: string;
  description: string;
  file_url: string;
  thumbnail_url?: string;
  tags: string[];
  is_featured: boolean;
  download_count: number;
  created_at: string;
}

// Helper function to convert Google Drive sharing links to direct links
const convertToDirectLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const id = match[1];
  return `https://drive.google.com/uc?export=download&id=${id}`;
};

const convertToPreviewLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const id = match[1];
  return `https://drive.google.com/file/d/${id}/preview`;
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Static books data with Google Drive links
  const staticBooks: Book[] = [
    {
      id: 'kairos',
      title: 'KAIROS',
      description: 'A transformative journey through understanding God\'s divine timing and purpose.',
      file_url: 'https://drive.google.com/file/d/1XF_SsooBHfgzqs2u_hqkKpqRDd8i704_/view?usp=drivesdk',
      thumbnail_url: new URL('../assets/kairos-cover.jpg', import.meta.url).href,
      tags: ['Spiritual Growth', 'Divine Timing', 'Purpose'],
      is_featured: true,
      download_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: 'torches-1',
      title: 'Flickers Are Not Fire',
      subtitle: 'Episode 1',
      series: 'TORCHES IN THE NIGHT',
      description: 'Distinguishing between momentary experiences and genuine spiritual transformation.',
      file_url: 'https://drive.google.com/file/d/11g7xQluCUqu_yZ5u6qBZUcvYEEp5hYrP/view?usp=drivesdk',
      thumbnail_url: new URL('../assets/flickers-cover.jpg', import.meta.url).href,
      tags: ['Torches Series', 'Discernment', 'Spiritual Maturity'],
      is_featured: false,
      download_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: 'torches-2',
      title: 'Ashes Beneath the Altar',
      subtitle: 'Episode 2',
      series: 'TORCHES IN THE NIGHT',
      description: 'Finding hope and renewal in the place of sacrifice and surrender.',
      file_url: 'https://drive.google.com/file/d/1CdJ0CM6oAdUylGUuy6KSd23TPHOe-R2M/view?usp=drivesdk',
      thumbnail_url: new URL('../assets/ashes-cover.jpg', import.meta.url).href,
      tags: ['Torches Series', 'Sacrifice', 'Renewal'],
      is_featured: false,
      download_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: 'torches-3',
      title: 'I Killed the Mirror',
      subtitle: 'Episode 3',
      series: 'TORCHES IN THE NIGHT',
      description: 'Breaking free from self-deception and embracing authentic spiritual reflection.',
      file_url: 'https://drive.google.com/file/d/1TsYyuqhGSV21asRwrKotcGQ0ci1D_69Z/view?usp=drivesdk',
      thumbnail_url: new URL('../assets/mirror-cover.jpg', import.meta.url).href,
      tags: ['Torches Series', 'Self-Reflection', 'Truth'],
      is_featured: false,
      download_count: 0,
      created_at: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedTag]);

  const fetchBooks = async () => {
    try {
      setBooks(staticBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(book => book.tags?.includes(selectedTag));
    }

    setFilteredBooks(filtered);
  };

  const handleView = (book: Book) => {
    // Convert to preview link and open in new tab
    const previewUrl = convertToPreviewLink(book.file_url);
    window.open(previewUrl, '_blank');
  };

  const handleDownload = async (book: Book) => {
    try {
      const downloadUrl = convertToDirectLink(book.file_url);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${book.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setBooks(books.map(b => 
        b.id === book.id ? { ...b, download_count: b.download_count + 1 } : b
      ));
    } catch (error) {
      console.error('Error downloading book:', error);
    }
  };

  const getAllTags = () => {
    const allTags = books.flatMap(book => book.tags || []);
    return [...new Set(allTags)];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Modern Design */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-float">📖</div>
          <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>📚</div>
          <div className="absolute top-60 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>🕊️</div>
          <div className="absolute bottom-40 right-10 text-6xl animate-float" style={{ animationDelay: '4s' }}>💡</div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-10 left-10 w-48 h-48 bg-brand-gold/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-brand-orange/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-gold/10 text-brand-gold border-brand-gold/20 px-6 py-2 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Digital Library
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight animate-fade-up">
              Books &{' '}
              <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
                E-Books
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-up-delay">
              Explore transformational books, Biblical studies, and spiritual growth resources
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="glass-morphism p-6 md:p-8 shadow-glow border-2 border-brand-orange/20 animate-scale-in">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-orange" />
                  <Input
                    placeholder="Search books by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg glass-morphism border-brand-orange/30 focus:border-brand-orange focus:ring-brand-orange"
                  />
                </div>
                {getAllTags().length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className="hover:shadow-glow whitespace-nowrap transition-all duration-300 hover:scale-105"
                    >
                      All Books
                    </Button>
                    {getAllTags().map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                        className="hover:shadow-glow whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-morphism p-6 animate-pulse">
                  <div className="h-64 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <Card 
                  key={book.id} 
                  className={`glass-morphism hover-lift group overflow-hidden animate-scale-in transition-all duration-300 ${
                    book.is_featured ? 'border-brand-orange/50 shadow-glow ring-2 ring-brand-orange/20' : ''
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Book Cover */}
                  <div className="relative h-64 md:h-72 lg:h-80 bg-gradient-primary overflow-hidden">
                    {book.thumbnail_url && (
                      <img
                        src={book.thumbnail_url}
                        alt={book.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    {book.is_featured && (
                      <Badge className="absolute top-4 right-4 bg-brand-orange text-white shadow-glow animate-pulse-glow">
                        ⭐ Featured
                      </Badge>
                    )}
                    {book.series && (
                      <Badge className="absolute top-4 left-4 bg-brand-gold/90 text-white">
                        {book.series}
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-sm text-brand-orange font-medium mb-2">{book.subtitle}</p>
                    )}
                    
                    {book.description && (
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 text-sm">
                        {book.description}
                      </p>
                    )}

                    {/* Tags */}
                    {book.tags && book.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Download Info */}
                    <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(book.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {book.download_count}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                        onClick={() => handleView(book)}
                      >
                        <Eye className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span>View</span>
                      </Button>
                      <Button 
                        variant="hero" 
                        size="sm"
                        className="flex-1 whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-glow"
                        onClick={() => handleDownload(book)}
                      >
                        <Download className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span>Get</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-morphism p-12 text-center animate-fade-in">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Books Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedTag 
                  ? "Try adjusting your search or filter criteria."
                  : "Books will appear here once they are published."
                }
              </p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Books;
