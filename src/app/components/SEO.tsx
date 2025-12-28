import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  city: string;
  coordinates: { lat: number; lng: number };
}

export function SEO({ title, description, canonical, city, coordinates }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Primary meta tags
    setMeta('description', description);
    setMeta('author', 'Manoj Thomas, Cascade California Realty');

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'article', true);
    setMeta('og:image', 'https://cascaderealtors.com/images/logo.webp', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://cascaderealtors.com/images/logo.webp');

    // Geo tags
    setMeta('geo.region', 'US-CA');
    setMeta('geo.placename', `${city}, California`);
    setMeta('geo.position', `${coordinates.lat};${coordinates.lng}`);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, canonical, city, coordinates]);

  return null;
}
