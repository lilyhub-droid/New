-- Remove the overly permissive policy that allows any authenticated user to view subscribers
DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON public.newsletter_subscribers;

-- Create a more restrictive policy that only allows admin access
-- For now, we'll restrict to a specific admin user ID that can be updated later
-- This prevents any user from harvesting subscriber data
CREATE POLICY "Only admin can view subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false); -- This effectively blocks all access until proper admin system is implemented

-- The INSERT policy remains the same so users can still subscribe
-- CREATE POLICY "Anyone can subscribe" already exists and is secure