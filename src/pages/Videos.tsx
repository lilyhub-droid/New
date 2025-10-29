import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Play, Search, Clock, Tag, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Video {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url?: string;
  tags: string[];
  is_featured: boolean;
  download_count: number;
  created_at: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, searchTerm, selectedTag]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('content_type', 'video')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(video => video.tags?.includes(selectedTag));
    }

    setFilteredVideos(filtered);
  };

  const handleWatch = async (video: Video) => {
    try {
      // Increment view count
      await supabase
        .from('content')
        .update({ download_count: video.download_count + 1 })
        .eq('id', video.id);

      // Open video link
      window.open(video.file_url, '_blank');
      
      // Update local state
      setVideos(videos.map(v => 
        v.id === video.id ? { ...v, download_count: v.download_count + 1 } : v
      ));
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  const getAllTags = () => {
    const allTags = videos.flatMap(video => video.tags || []);
    return [...new Set(allTags)];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Biblical Background */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Biblical Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-float">🎥</div>
          <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>📹</div>
          <div className="absolute top-60 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>🎬</div>
          <div className="absolute bottom-40 right-10 text-6xl animate-float" style={{ animationDelay: '4s' }}>🌟</div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-10 left-10 w-48 h-48 bg-brand-purple/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-brand-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 glass-morphism bg-brand-purple/10 text-brand-purple border-brand-purple/20 px-6 py-2">
              🎥 Video Library
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Video{' '}
              <span className="text-gradient animate-shimmer bg-gradient-accent bg-clip-text text-transparent">
                Teachings
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Watch inspiring video content, sermons, and educational materials that will strengthen 
              your faith and expand your understanding.
            </p>
          </div>

          {/* Enhanced Search and Filter - Prominent and Styled */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="glass-morphism p-8 shadow-glow border-2 border-brand-purple/20">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-purple" />
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg glass-morphism border-brand-purple/30 focus:border-brand-purple focus:ring-brand-purple"
                  />
                </div>
                {getAllTags().length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className="hover:shadow-glow"
                    >
                      All Videos
                    </Button>
                    {getAllTags().map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                        className="hover:shadow-glow"
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

      {/* Videos Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-morphism animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg mb-4"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredVideos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className={`glass-morphism hover-lift group animate-scale-in overflow-hidden ${
                    video.is_featured ? 'border-brand-orange/30 shadow-glow' : ''
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-gradient-accent overflow-hidden cursor-pointer" onClick={() => handleWatch(video)}>
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-accent">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-900 ml-1" />
                      </div>
                    </div>

                    {video.is_featured && (
                      <Badge className="absolute top-4 right-4 bg-brand-orange text-white">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-orange transition-colors">
                      {video.title}
                    </h3>
                    
                    {video.description && (
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                    )}

                    {/* Tags */}
                    {video.tags && video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {video.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Video Info */}
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(video.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.download_count} views
                      </div>
                    </div>

                    <Button 
                      variant="hero" 
                      className="w-full group-hover:shadow-glow transition-all duration-300"
                      onClick={() => handleWatch(video)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-morphism p-12 text-center">
              <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Videos Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedTag 
                  ? "Try adjusting your search or filter criteria."
                  : "Videos will appear here once they are published."
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

export default Videos;