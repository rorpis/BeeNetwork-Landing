
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { generateFingerprint } from '@/lib/fingerprint';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Generate a unique fingerprint for the visitor
        const fingerprint = generateFingerprint();
        
        // Get the current page path
        const pagePath = location.pathname + location.search;

        // Track the page view in Supabase
        await supabase
          .from('pageviews')
          .insert({
            page_path: pagePath,
            user_fingerprint: fingerprint,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent || null
          } as any); // Using type assertion to bypass TypeScript error until types are regenerated
          
        console.log('Page view tracked successfully');
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    // Track the page view when the component mounts or location changes
    trackPageView();
  }, [location.pathname, location.search]);

  // This component doesn't render anything
  return null;
};

export default PageViewTracker;
