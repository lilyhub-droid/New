import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Headphones, Search, Tag, Sparkles, ChevronDown, ChevronUp, Music, Play, Download, Clock } from 'lucide-react';

interface Audio {
  id: string;
  title: string;
  baseTitle?: string; // For grouping
  part?: number; // Part number if multi-part
  description: string;
  file_url: string;
  thumbnail_url?: string;
  tags: string[];
  is_featured: boolean;
  play_count: number;
  created_at: string;
}

interface AudioStack {
  baseTitle: string;
  audios: Audio[];
  is_featured: boolean;
  tags: string[];
  thumbnail_url?: string;
  description: string;
}

// Helper function to convert Google Drive sharing links to direct links and thumbnails
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

const convertToThumbnail = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const id = match[1];
  return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
};

const Audio = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [audioStacks, setAudioStacks] = useState<AudioStack[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<AudioStack[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedStacks, setExpandedStacks] = useState<Set<string>>(new Set());
  const [currentAudio, setCurrentAudio] = useState<Audio | null>(null);

  const staticAudios: Audio[] = [
    {
      id: 'audio-1',
      title: 'A CRY (to my beloved)',
      description: 'A heartfelt cry to the beloved',
      file_url: 'https://drive.google.com/uc?export=download&id=158uiAOMi2VuyLk1O94I-rm1wWPKvj09I',
      thumbnail_url: '/audio/covers/a-cry-cover.jpg',
      tags: ['Worship', 'Prayer'],
      is_featured: true,
      play_count: 0,
      created_at: '2024-01-01',
    },
    {
      id: 'audio-2',
      title: 'AGES & SEASONS',
      description: 'Understanding the ages and seasons',
      file_url: 'https://drive.google.com/uc?export=download&id=1lJK3UWVYBXZlhP_M7hTpz-UNK6fVpXSc',
      thumbnail_url: '/audio/covers/ages-seasons-cover.jpg',
      tags: ['Teaching', 'Doctrine'],
      is_featured: true,
      play_count: 0,
      created_at: '2024-01-02',
    },
    {
      id: 'audio-3',
      title: 'MIDNIGHT-CRY 4_Night 3',
      description: 'Night 3 of Midnight Cry series',
      file_url: 'https://drive.google.com/uc?export=download&id=1cqFmFoPFGZENPRmJf37lwygpseHJoltp',
      thumbnail_url: '/audio/covers/midnight-cry-cover.jpg',
      tags: ['Prophetic', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-03',
    },
    {
      id: 'audio-4',
      title: 'THE BURDENS OF THE AGE',
      description: 'Understanding the burdens we carry',
      file_url: 'https://drive.google.com/uc?export=download&id=1lbZYP52lrfaDkuT9xrLkKi6z5SW0NWR-',
      thumbnail_url: '/audio/covers/burdens-cover.jpg',
      tags: ['Teaching', 'Prophetic'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-04',
    },
    {
      id: 'audio-5',
      title: 'THE BURDENS OF THE AGE 2',
      description: 'Continued teaching on burdens',
      file_url: 'https://drive.google.com/uc?export=download&id=1UxtVqfe79EM7unxNM63UCBeXjEyXMO5p',
      thumbnail_url: '/audio/covers/burdens-cover.jpg',
      tags: ['Teaching', 'Prophetic'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-05',
    },
    {
      id: 'audio-6',
      title: 'THE FIFTH SEASON',
      description: 'Understanding the fifth season',
      file_url: 'https://drive.google.com/uc?export=download&id=1FCPMJtSVUwMtpgl9S-frRpUfjVJiKch_',
      thumbnail_url: '/audio/covers/fifth-season-cover.jpg',
      tags: ['Prophetic', 'Seasons'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-06',
    },
    {
      id: 'audio-7',
      title: 'THE GRAVE OF TIME',
      description: 'Part 1 of The Grave of Time series',
      file_url: 'https://drive.google.com/uc?export=download&id=1h2g4BSon7V05_BYTROG5OIqocNmDtzch',
      thumbnail_url: '/audio/covers/grave-of-time-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: true,
      play_count: 0,
      created_at: '2024-01-07',
    },
    {
      id: 'audio-8',
      title: 'THE GRAVE OF TIME 2',
      description: 'Part 2 of The Grave of Time series',
      file_url: 'https://drive.google.com/uc?export=download&id=10q7kYOBFo13E2FRsh6P2dxAaNpM0d3_m',
      thumbnail_url: '/audio/covers/grave-of-time-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-08',
    },
    {
      id: 'audio-9',
      title: 'THE GRAVE OF TIME 3',
      description: 'Part 3 of The Grave of Time series',
      file_url: 'https://drive.google.com/uc?export=download&id=1dxeJmw5A0wIyDTziG5KmtWI-H7-T5GA6',
      thumbnail_url: '/audio/covers/grave-of-time-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-09',
    },
    {
      id: 'audio-10',
      title: 'THE GRAVE OF TIME 4',
      description: 'Part 4 of The Grave of Time series',
      file_url: 'https://drive.google.com/uc?export=download&id=1swsxy7nIVXzcpVAS-y6slK-oJjKhMHo8',
      thumbnail_url: '/audio/covers/grave-of-time-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-10',
    },
    {
      id: 'audio-11',
      title: 'THE GRAVE OF TIME 5',
      description: 'Part 5 of The Grave of Time series',
      file_url: 'https://drive.google.com/uc?export=download&id=16X_wSxKW1Rqj1LgcOHQUZl2FfeiSyLVC',
      thumbnail_url: '/audio/covers/grave-of-time-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-11',
    },
    {
      id: 'audio-12',
      title: 'THE WELL OF LIFE 1',
      description: 'Part 1 of The Well of Life series',
      file_url: 'https://drive.google.com/uc?export=download&id=1PRRu7HmNPq2rfKtniCXAvNSNnrgNXcZa',
      thumbnail_url: '/audio/covers/well-of-life-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: true,
      play_count: 0,
      created_at: '2024-01-12',
    },
    {
      id: 'audio-13',
      title: 'THE WELL OF LIFE 2 (The Cup of Travail)',
      description: 'Part 2: The Cup of Travail',
      file_url: 'https://drive.google.com/uc?export=download&id=1IuAJhMTemp5CZg8LXk7TZTfGYuvhJ_ue',
      thumbnail_url: '/audio/covers/well-of-life-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-13',
    },
    {
      id: 'audio-14',
      title: 'THE WELL OF LIFE 3 (Paradox of Strength)',
      description: 'Part 3: Paradox of Strength',
      file_url: 'https://drive.google.com/uc?export=download&id=18FEV093SLJgPqPMHVciBBllKjpFywDjb',
      thumbnail_url: '/audio/covers/well-of-life-cover.jpg',
      tags: ['Teaching', 'Series'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-14',
    },
    {
      id: 'audio-15',
      title: 'THE SPIRIT OF AGE',
      description: 'Understanding the spirit of the age',
      file_url: 'https://drive.google.com/uc?export=download&id=1V_hghdrZUl8Ks45RJmllWrZDjrdlC_Gs',
      thumbnail_url: '/audio/covers/spirit-of-age-cover.jpg',
      tags: ['Prophetic', 'Teaching'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-15',
    },
    {
      id: 'audio-16',
      title: 'THE SENT MAN',
      description: 'Understanding the calling of the sent man',
      file_url: 'https://drive.google.com/uc?export=download&id=1j0xay_gzb1xH_-Zt1JNQ3bgyQWl1HFLw',
      thumbnail_url: '/audio/covers/sent-man-cover.jpg',
      tags: ['Teaching', 'Ministry'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-16',
    },
    {
      id: 'audio-17',
      title: 'THE SENT MAN Part 2 (OOG)',
      description: 'Part 2 of The Sent Man series',
      file_url: 'https://drive.google.com/uc?export=download&id=1zROdwK9fNMZh0hJPRur6wShWIM-PtX8C',
      thumbnail_url: '/audio/covers/sent-man-cover.jpg',
      tags: ['Teaching', 'Ministry'],
      is_featured: false,
      play_count: 0,
      created_at: '2024-01-17',
    },
  ];

  useEffect(() => {
    fetchAudios();
  }, []);

  useEffect(() => {
    filterStacks();
  }, [audioStacks, searchTerm, selectedTag]);

  // Extract base title and part number from title
  const parseTitle = (title: string): { baseTitle: string; part?: number } => {
    // Match patterns like "Title (1)", "Title - Part 2", "Title Part 3"
    const patterns = [
      /^(.+?)\s*\((\d+)\)$/,           // "Title (1)"
      /^(.+?)\s*-\s*Part\s*(\d+)$/i,   // "Title - Part 1"
      /^(.+?)\s*Part\s*(\d+)$/i,       // "Title Part 1"
      /^(.+?)\s*Ep\.?\s*(\d+)$/i,      // "Title Ep 1" or "Title Ep. 1"
    ];

    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        return {
          baseTitle: match[1].trim(),
          part: parseInt(match[2], 10),
        };
      }
    }

    return { baseTitle: title };
  };

  const fetchAudios = () => {
    try {
      // Parse titles and add baseTitle/part info
      const parsedAudios = staticAudios.map(audio => {
        const { baseTitle, part } = parseTitle(audio.title);
        return { ...audio, baseTitle, part };
      });

      setAudios(parsedAudios);

      // Group audios by baseTitle
      const grouped = new Map<string, Audio[]>();
      parsedAudios.forEach(audio => {
        const key = audio.baseTitle || audio.title;
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(audio);
      });

      // Create stacks
      const stacks: AudioStack[] = Array.from(grouped.entries()).map(([baseTitle, audios]) => {
        // Sort by part number if available
        const sortedAudios = audios.sort((a, b) => {
          if (a.part !== undefined && b.part !== undefined) {
            return a.part - b.part;
          }
          return 0;
        });

        return {
          baseTitle,
          audios: sortedAudios,
          is_featured: sortedAudios.some(a => a.is_featured),
          tags: [...new Set(sortedAudios.flatMap(a => a.tags))],
          thumbnail_url: sortedAudios[0].thumbnail_url,
          description: sortedAudios[0].description,
        };
      });

      setAudioStacks(stacks);
    } catch (error) {
      console.error('Error loading audios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStacks = () => {
    let filtered = audioStacks;

    if (searchTerm) {
      filtered = filtered.filter(stack =>
        stack.baseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stack.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stack.audios.some(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(stack => stack.tags?.includes(selectedTag));
    }

    setFilteredStacks(filtered);
  };

  const handlePlay = (audio: Audio) => {
    try {
      setCurrentAudio(audio);
      
      // Update play count
      setAudios(audios.map(a => 
        a.id === audio.id ? { ...a, play_count: a.play_count + 1 } : a
      ));
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleDownload = (audio: Audio) => {
    try {
      const downloadUrl = convertToDirectLink(audio.file_url);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${audio.title}.mp3`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setAudios(audios.map(a => 
        a.id === audio.id ? { ...a, play_count: a.play_count + 1 } : a
      ));
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  const toggleStack = (baseTitle: string) => {
    const newExpanded = new Set(expandedStacks);
    if (newExpanded.has(baseTitle)) {
      newExpanded.delete(baseTitle);
    } else {
      newExpanded.add(baseTitle);
    }
    setExpandedStacks(newExpanded);
  };

  const getAllTags = () => {
    const allTags = audioStacks.flatMap(stack => stack.tags || []);
    return [...new Set(allTags)];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-float">🎵</div>
          <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>🎧</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🎤</div>
          <div className="absolute top-60 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>🔊</div>
          <div className="absolute bottom-40 right-10 text-6xl animate-float" style={{ animationDelay: '4s' }}>🎶</div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-10 left-10 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-brand-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-accent/10 text-brand-accent border-brand-accent/20 px-6 py-2 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Audio Library
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight animate-fade-up">
              Audio{' '}
              <span className="text-gradient animate-shimmer bg-gradient-primary bg-clip-text text-transparent">
                Teachings
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-up-delay">
              Listen to powerful sermons, podcasts, and audio teachings
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="glass-morphism p-6 md:p-8 shadow-glow border-2 border-brand-accent/20 animate-scale-in">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-accent" />
                  <Input
                    placeholder="Search audio content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg glass-morphism border-brand-accent/30 focus:border-brand-accent focus:ring-brand-accent"
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
                      All Audio
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

      {/* Fixed Bottom Player */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl">
          <div className="container mx-auto max-w-6xl">
            <AudioPlayer
              title={currentAudio.title}
              audioUrl={currentAudio.file_url}
              coverUrl={currentAudio.thumbnail_url}
              onDownload={() => handleDownload(currentAudio)}
            />
          </div>
        </div>
      )}

      {/* Audio Stacks Grid */}
      <section className={`pb-24 ${currentAudio ? 'mb-32' : ''}`}>
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
          ) : filteredStacks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStacks.map((stack, index) => (
                <Card 
                  key={stack.baseTitle} 
                  className={`glass-morphism hover-lift group overflow-hidden animate-scale-in transition-all duration-300 ${
                    stack.is_featured ? 'border-brand-accent/50 shadow-glow ring-2 ring-brand-accent/20' : ''
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Audio Cover */}
                  <div className="relative h-64 md:h-72 lg:h-80 bg-gradient-purple overflow-hidden">
                    {stack.thumbnail_url ? (
                      <img
                        src={convertToThumbnail(stack.thumbnail_url)}
                        alt={stack.baseTitle}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Headphones className="w-24 h-24 text-white/50" />
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-gray-900 ml-1" />
                      </div>
                    </div>

                    {stack.is_featured && (
                      <Badge className="absolute top-4 right-4 bg-brand-accent text-white shadow-glow animate-pulse-glow">
                        ⭐ Featured
                      </Badge>
                    )}
                    
                    {stack.audios.length > 1 && (
                      <Badge className="absolute top-4 left-4 bg-brand-gold/90 text-white">
                        {stack.audios.length} Parts
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">
                      {stack.baseTitle}
                    </h3>
                    
                    {stack.description && (
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 text-sm">
                        {stack.description}
                      </p>
                    )}

                    {/* Tags */}
                    {stack.tags && stack.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stack.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(stack.audios[0].created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Headphones className="w-3 h-3 mr-1" />
                        {stack.audios.reduce((sum, a) => sum + a.play_count, 0)} plays
                      </div>
                    </div>

                    {/* Multi-part Stack */}
                    {stack.audios.length > 1 ? (
                      <div>
                        <Button 
                          variant="outline" 
                          className="w-full mb-3 justify-between"
                          onClick={() => toggleStack(stack.baseTitle)}
                        >
                          <span>View All Parts</span>
                          {expandedStacks.has(stack.baseTitle) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        
                        {expandedStacks.has(stack.baseTitle) && (
                          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                            {stack.audios.map((audio) => (
                              <Card key={audio.id} className="p-3 bg-muted/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm line-clamp-1">
                                    {audio.part ? `Part ${audio.part}` : audio.title}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handlePlay(audio)}
                                  >
                                    <Play className="w-3 h-3 mr-1" />
                                    Play
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() => handleDownload(audio)}
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    Get
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Single Audio */
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                          onClick={() => handlePlay(stack.audios[0])}
                        >
                          <Play className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                          <span>Play</span>
                        </Button>
                        <Button 
                          variant="hero" 
                          size="sm"
                          className="flex-1 whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-glow"
                          onClick={() => handleDownload(stack.audios[0])}
                        >
                          <Download className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                          <span>Get</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-morphism p-12 text-center animate-fade-in">
              <Headphones className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Audio Content Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedTag 
                  ? "Try adjusting your search or filter criteria."
                  : "Add your Google Drive audio links to the staticAudios array in the code."
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

export default Audio;