import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  city?: string;
  county?: string;
  coordinates?: { lat: number; lng: number };
}

// Generate JSON-LD schema for city pages
function generateCitySchema(city: string, county: string, canonical: string, coordinates?: { lat: number; lng: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": `Manoj Thomas - Best Realtor in ${city}`,
    "alternateName": [`Best Realtor ${city}`, `Best Realtor in ${city}`, `Top Realtor ${city}`, `Best Real Estate Agent ${city}`],
    "description": `Manoj Thomas is the best realtor in ${city}, ${county}. With 15+ years of experience and $1B+ in sales, he is the top-rated real estate agent in ${city} and the Bay Area. Contact the best ${city} realtor at (408) 757-7353.`,
    "image": "https://cascaderealtors.com/images/manoj-hs.webp",
    "url": canonical,
    "telephone": "+1-408-757-7353",
    "email": "contact@cascaderealtors.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    ...(coordinates && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.lat,
        "longitude": coordinates.lng
      }
    }),
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": county
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "415",
      "bestRating": "5"
    },
    "priceRange": "$$$"
  };
}

// Generate FAQ schema for city pages
function generateCityFAQSchema(city: string, county: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who is the best realtor in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Manoj Thomas is the best realtor in ${city}, California. With 15+ years of experience, $1B+ in lifetime sales, and 415+ satisfied clients, he is the top-rated real estate agent in ${city} and throughout ${county}. Contact him at (408) 757-7353.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I find the best real estate agent in ${city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For the best real estate agent in ${city}, contact Manoj Thomas at Cascade California Realty. He has helped hundreds of families buy and sell homes in ${city} with his expert knowledge of the local market, strong negotiation skills, and commitment to client satisfaction.`
        }
      }
    ]
  };
}

export function SEO({ title, description, canonical, city, county, coordinates }: SEOProps) {
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

    // Primary meta tags with best realtor keywords
    setMeta('description', description);
    setMeta('author', 'Manoj Thomas, Best Realtor in Bay Area, Cascade California Realty');

    // Add keywords meta tag for city
    if (city) {
      const keywords = `best realtor in ${city}, best realtor ${city}, top realtor ${city}, best real estate agent ${city}, best realtor in ${county || 'Bay Area'}, top real estate agent ${city}, ${city} realtor, ${city} real estate agent, Manoj Thomas ${city}, best ${city} realtor 2025`;
      setMeta('keywords', keywords);
    }

    // Open Graph with best realtor branding
    const ogTitle = city ? `Best Realtor in ${city} | Manoj Thomas - Top Real Estate Agent` : title;
    setMeta('og:title', ogTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'article', true);
    setMeta('og:image', 'https://cascaderealtors.com/images/manoj-hs.webp', true);
    setMeta('og:site_name', 'Best Realtor Bay Area - Manoj Thomas', true);

    // Twitter with best realtor branding
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://cascaderealtors.com/images/manoj-hs.webp');

    // Geo tags (only if city/coordinates provided)
    if (city) {
      setMeta('geo.region', 'US-CA');
      setMeta('geo.placename', `${city}, California`);
    }
    if (coordinates) {
      setMeta('geo.position', `${coordinates.lat};${coordinates.lng}`);
      setMeta('ICBM', `${coordinates.lat}, ${coordinates.lng}`);
    }

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Add JSON-LD schema for city pages
    if (city && county) {
      // Remove existing city schema if any
      const existingSchema = document.querySelector('script[data-city-schema]');
      if (existingSchema) {
        existingSchema.remove();
      }
      const existingFAQSchema = document.querySelector('script[data-city-faq-schema]');
      if (existingFAQSchema) {
        existingFAQSchema.remove();
      }

      // Add city-specific RealEstateAgent schema
      const citySchema = document.createElement('script');
      citySchema.type = 'application/ld+json';
      citySchema.setAttribute('data-city-schema', 'true');
      citySchema.textContent = JSON.stringify(generateCitySchema(city, county, canonical, coordinates));
      document.head.appendChild(citySchema);

      // Add city-specific FAQ schema
      const faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.setAttribute('data-city-faq-schema', 'true');
      faqSchema.textContent = JSON.stringify(generateCityFAQSchema(city, county));
      document.head.appendChild(faqSchema);
    }

    // Cleanup function
    return () => {
      const citySchema = document.querySelector('script[data-city-schema]');
      if (citySchema) citySchema.remove();
      const faqSchema = document.querySelector('script[data-city-faq-schema]');
      if (faqSchema) faqSchema.remove();
    };
  }, [title, description, canonical, city, county, coordinates]);

  return null;
}
