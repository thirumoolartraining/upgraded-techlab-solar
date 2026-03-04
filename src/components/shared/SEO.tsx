import { Helmet } from 'react-helmet-async';

// TypeScript Interfaces
interface MetadataProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  metaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

interface ProfessionalServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService';
  name: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  telephone: string;
  url: string;
  priceRange: string;
  areaServed: string;
  serviceType: string;
}

interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

// Default metadata constants
const DEFAULT_METADATA = {
  title: 'TechLab Solars | Solar Energy Infrastructure - Chennai, India',
  description: 'Professional solar energy infrastructure design, installation, and monitoring services. 25.4 MW deployed across 500+ installations. Based in Chennai, serving all of India.',
  image: '/og-image-default.svg',
  url: 'https://techlabsolars.com'
} as const;

// Helper functions
const getCanonicalUrl = (canonical?: string): string => {
  if (canonical) {
    // Strip query parameters and hash fragments
    return canonical.split('?')[0].split('#')[0].replace(/\/$/, '');
  }
  
  // Fallback to current location (SSR-safe)
  if (typeof window !== 'undefined') {
    const { origin, pathname } = window.location;
    return `${origin}${pathname.replace(/\/$/, '')}`;
  }
  
  return DEFAULT_METADATA.url;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateMetadata = (props: MetadataProps): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const { title, description, canonical } = props;
  
  if (title && title.length > 60) {
    console.warn(`SEO Warning: Title exceeds 60 characters (${title.length})`);
  }
  
  if (description && (description.length < 120 || description.length > 160)) {
    console.warn(`SEO Warning: Description should be 120-160 characters (${description.length})`);
  }
  
  if (canonical && !isValidUrl(canonical)) {
    console.warn(`SEO Warning: Canonical URL appears malformed: ${canonical}`);
  }
};

const renderJsonLd = (schema: ProfessionalServiceSchema | ArticleSchema): string => {
  try {
    return JSON.stringify(schema);
  } catch (error) {
    console.error('Failed to serialize JSON-LD schema:', error);
    return '{}';
  }
};

// SEO Component
export const SEO: React.FC<MetadataProps> = (props) => {
  // Validate metadata in development
  validateMetadata(props);
  
  // Merge with defaults
  const title = props.title 
    ? `${props.title} | TechLab Solars` 
    : DEFAULT_METADATA.title;
  const description = props.description || DEFAULT_METADATA.description;
  const image = props.image || DEFAULT_METADATA.image;
  const type = props.type || 'website';
  const canonicalUrl = getCanonicalUrl(props.canonical);
  const robotsContent = props.noindex ? 'noindex, nofollow' : 'index, follow';
  
  // Construct absolute image URL
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${DEFAULT_METADATA.url}${image}`;
  
  // JSON-LD Schema
  const jsonLdSchema: ProfessionalServiceSchema | ArticleSchema = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.title || DEFAULT_METADATA.title,
        description,
        image: absoluteImageUrl,
        author: {
          '@type': 'Organization',
          name: 'TechLab Solars'
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechLab Solars',
          logo: {
            '@type': 'ImageObject',
            url: `${DEFAULT_METADATA.url}/tl%20logo.png`
          }
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'TechLab Solars',
        description: 'Professional solar energy infrastructure design, installation, and monitoring services',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN'
        },
        telephone: '+91-XXX-XXX-XXXX',
        url: DEFAULT_METADATA.url,
        priceRange: '₹₹₹',
        areaServed: 'India',
        serviceType: 'Solar Energy Installation'
      };
  
  return (
    <Helmet>
      {/* Document Title */}
      <title>{title}</title>
      
      {/* Meta Description */}
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="TechLab Solars" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {renderJsonLd(jsonLdSchema)}
      </script>
      
      {/* Custom Meta Tags */}
      {props.metaTags?.map((tag, index) => {
        if (tag.name) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return null;
      })}
    </Helmet>
  );
};

export default SEO;
