import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, BookOpen, Video, Headphones, X, Star, Check, Eye, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content_type: 'book' | 'video' | 'audio';
  file_url: string;
  thumbnail_url?: string;
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  download_count: number;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  avatar_url?: string;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

const Admin = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form states for new content
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    content_type: 'book' as 'book' | 'video' | 'audio',
    tags: '',
    is_featured: false,
    is_published: false
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);

  useEffect(() => {
    fetchContent();
    fetchTestimonials();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent((data || []) as ContentItem[]);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  };

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "File required",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload main file
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const fileUrl = await uploadFile(selectedFile, 'content-files', fileName);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (selectedThumbnail) {
        const thumbExt = selectedThumbnail.name.split('.').pop();
        const thumbName = `thumb_${Date.now()}.${thumbExt}`;
        thumbnailUrl = await uploadFile(selectedThumbnail, 'thumbnails', thumbName);
      }

      // Parse tags
      const tags = newContent.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // Insert content record
      const { error } = await supabase
        .from('content')
        .insert([{
          title: newContent.title,
          description: newContent.description,
          content_type: newContent.content_type,
          file_url: fileUrl,
          thumbnail_url: thumbnailUrl,
          tags,
          is_featured: newContent.is_featured,
          is_published: newContent.is_published,
          author_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Content uploaded successfully!",
        description: "Your content has been added to the library.",
      });

      // Reset form
      setNewContent({
        title: '',
        description: '',
        content_type: 'book',
        tags: '',
        is_featured: false,
        is_published: false
      });
      setSelectedFile(null);
      setSelectedThumbnail(null);

      // Refresh content list
      fetchContent();
    } catch (error) {
      console.error('Error uploading content:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your content.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const toggleContentStatus = async (id: string, field: 'is_featured' | 'is_published', value: boolean) => {
    try {
      const { error } = await supabase
        .from('content')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setContent(content.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));

      toast({
        title: "Content updated",
        description: `Content has been ${value ? 'enabled' : 'disabled'} for ${field.replace('is_', '')}.`,
      });
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const toggleTestimonialStatus = async (id: string, field: 'is_featured' | 'is_approved', value: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setTestimonials(testimonials.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));

      toast({
        title: "Testimonial updated",
        description: `Testimonial has been ${value ? 'enabled' : 'disabled'} for ${field.replace('is_', '')}.`,
      });
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(content.filter(item => item.id !== id));
      toast({
        title: "Content deleted",
        description: "Content has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-32">
          <div className="text-center">
            <div className="animate-pulse">Loading admin panel...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your content library and testimonials
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
              <TabsTrigger value="manage">Manage Content</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="glass-morphism p-8">
                <h2 className="text-2xl font-bold mb-6">Upload New Content</h2>
                <form onSubmit={handleSubmitContent} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={newContent.title}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                        placeholder="Content title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content Type</label>
                      <Select 
                        value={newContent.content_type} 
                        onValueChange={(value: 'book' | 'video' | 'audio') => 
                          setNewContent({ ...newContent, content_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={newContent.description}
                      onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                      placeholder="Content description"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      value={newContent.tags}
                      onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                      placeholder="theology, sermon, biblical studies"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Main File</label>
                      <Input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Thumbnail (optional)</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedThumbnail(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newContent.is_featured}
                        onChange={(e) => setNewContent({ ...newContent, is_featured: e.target.checked })}
                      />
                      <span>Featured</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newContent.is_published}
                        onChange={(e) => setNewContent({ ...newContent, is_published: e.target.checked })}
                      />
                      <span>Published</span>
                    </label>
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Content'}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="manage">
              <div className="space-y-4">
                {content.map((item) => (
                  <Card key={item.id} className="glass-morphism p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getContentIcon(item.content_type)}
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{item.content_type}</Badge>
                            {item.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {item.download_count}
                          </div>
                        </div>
                        <Button
                          variant={item.is_featured ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleContentStatus(item.id, 'is_featured', !item.is_featured)}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={item.is_published ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleContentStatus(item.id, 'is_published', !item.is_published)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteContent(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials">
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="glass-morphism p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div>
                            <h3 className="font-bold">{testimonial.name}</h3>
                            {(testimonial.role || testimonial.company) && (
                              <p className="text-sm text-muted-foreground">
                                {testimonial.role && testimonial.company 
                                  ? `${testimonial.role}, ${testimonial.company}`
                                  : testimonial.role || testimonial.company
                                }
                              </p>
                            )}
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant={testimonial.is_featured ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTestimonialStatus(testimonial.id, 'is_featured', !testimonial.is_featured)}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={testimonial.is_approved ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTestimonialStatus(testimonial.id, 'is_approved', !testimonial.is_approved)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;