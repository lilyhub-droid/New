-- Add KAIROS Project as the first book in content table
INSERT INTO public.content (
  title,
  description,
  content_type,
  file_url,
  tags,
  is_featured,
  is_published,
  download_count,
  created_at,
  updated_at
) VALUES (
  'KAIROS Project',
  'A transformational spiritual and educational e-novel that guides readers through personal growth and divine timing. This project combines compelling storytelling with educational content to guide readers on their journey of self-discovery and spiritual awakening.',
  'book',
  'https://mhsgqeqezpxtacradpkp.supabase.co/storage/v1/object/public/Uploads/KAIROS.pdf',
  ARRAY['Spiritual Growth', 'E-Novel', 'Education', 'Transformation'],
  true,
  true,
  0,
  '2024-01-01 00:00:00+00',
  '2024-01-01 00:00:00+00'
);