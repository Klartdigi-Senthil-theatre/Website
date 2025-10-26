// Google Analytics and SEO Monitoring Setup
// Add this to your index.html head section for Google Analytics

/*
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

<!-- Bing Webmaster Tools -->
<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
*/

// SEO Performance Monitoring Component
import { useEffect } from 'react';

export const SEOAnalytics = () => {
  useEffect(() => {
    // Track page views for SEO monitoring
    const trackPageView = (url) => {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: url
        });
      }
    };

    // Track user interactions
    const trackUserInteraction = (action, category, label) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          event_category: category,
          event_label: label
        });
      }
    };

    // Track booking conversions
    const trackBookingConversion = (movieTitle, seatCount, totalPrice) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
          transaction_id: Date.now().toString(),
          value: totalPrice,
          currency: 'INR',
          items: [{
            item_id: movieTitle,
            item_name: movieTitle,
            category: 'Movie Ticket',
            quantity: seatCount,
            price: totalPrice / seatCount
          }]
        });
      }
    };

    // Make functions globally available
    window.trackPageView = trackPageView;
    window.trackUserInteraction = trackUserInteraction;
    window.trackBookingConversion = trackBookingConversion;

    // Track initial page view
    trackPageView(window.location.href);

  }, []);

  return null;
};

// SEO Meta Tags Component for Dynamic Pages
export const SEOMetaTags = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Track page view
    if (window.trackPageView) {
      window.trackPageView(window.location.href);
    }

  }, [title, description, keywords, canonical]);

  return null;
};

// Local SEO Keywords Helper
export const localSEOKeywords = {
  primary: [
    'Senthil Theater',
    'Senthil Cinema', 
    'Karur cinema',
    'Kattuputhur cinema',
    'movie theater Karur'
  ],
  secondary: [
    'book movie tickets Karur',
    'Karur movie theater',
    'cinema near me Karur',
    'Senthil Theater showtimes',
    'movie tickets Kattuputhur',
    'Karur theaters near me',
    'best cinema Karur',
    'Tamil Nadu cinema',
    'movie booking online'
  ],
  longTail: [
    'best movie theater in Karur district',
    'Senthil Theater Kattuputhur Tamil Nadu',
    'book movie tickets online Karur',
    'latest movies in Karur cinema',
    'Senthil Cinema show timings today',
    'movie theater near Kattuputhur',
    'cinema hall in Karur with online booking'
  ]
};

export default SEOAnalytics;
