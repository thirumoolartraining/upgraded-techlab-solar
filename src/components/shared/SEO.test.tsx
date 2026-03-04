import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './SEO';

// Helper to render SEO component with HelmetProvider
const renderSEO = (props = {}) => {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>
  );
};

// Helper to get helmet data from document
const getDocumentMeta = (selector: string): string | null => {
  const element = document.querySelector(selector);
  return element?.getAttribute('content') || element?.getAttribute('href') || null;
};

describe('SEO Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Example Test 1: Default metadata rendering
  it('renders default metadata when no props provided', async () => {
    renderSEO();
    
    await waitFor(() => {
      expect(document.title).toBe('TechLab Solars | Solar Energy Infrastructure - Chennai, India');
      const description = getDocumentMeta('meta[name="description"]');
      expect(description).toContain('Professional solar energy infrastructure');
    });
  });

  // Example Test 2: Required constant meta tags
  it('always includes required constant meta tags', async () => {
    renderSEO();
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[property="og:image:width"]')).toBe('1200');
      expect(getDocumentMeta('meta[property="og:image:height"]')).toBe('630');
      expect(getDocumentMeta('meta[property="og:site_name"]')).toBe('TechLab Solars');
      expect(getDocumentMeta('meta[property="og:locale"]')).toBe('en_IN');
      expect(getDocumentMeta('meta[name="twitter:card"]')).toBe('summary_large_image');
    });
  });

  // Example Test 3: OpenGraph type default
  it('renders og:type as website by default', async () => {
    renderSEO();
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[property="og:type"]')).toBe('website');
    });
  });

  // Example Test 4: OpenGraph type article
  it('renders og:type as article when type prop is article', async () => {
    renderSEO({ type: 'article' });
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[property="og:type"]')).toBe('article');
    });
  });

  // Example Test 5: ProfessionalService JSON-LD schema
  it('renders ProfessionalService JSON-LD schema by default', async () => {
    renderSEO();
    
    await waitFor(() => {
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      expect(jsonLdScript).toBeTruthy();
      
      if (jsonLdScript?.textContent) {
        const schema = JSON.parse(jsonLdScript.textContent);
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('ProfessionalService');
        expect(schema.name).toBe('TechLab Solars');
        expect(schema.address.addressLocality).toBe('Chennai');
        expect(schema.address.addressRegion).toBe('Tamil Nadu');
        expect(schema.address.addressCountry).toBe('IN');
        expect(schema.url).toBe('https://techlabsolars.com');
        expect(schema.priceRange).toBe('₹₹₹');
        expect(schema.areaServed).toBe('India');
        expect(schema.serviceType).toBe('Solar Energy Installation');
      }
    });
  });

  // Example Test 6: Article JSON-LD schema
  it('renders Article schema when type is article', async () => {
    renderSEO({ type: 'article', title: 'Test Article' });
    
    await waitFor(() => {
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      expect(jsonLdScript).toBeTruthy();
      
      if (jsonLdScript?.textContent) {
        const schema = JSON.parse(jsonLdScript.textContent);
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Article');
        expect(schema.headline).toBe('Test Article');
        expect(schema.author['@type']).toBe('Organization');
        expect(schema.author.name).toBe('TechLab Solars');
        expect(schema.publisher['@type']).toBe('Organization');
      }
    });
  });

  // Example Test 7: Noindex robots tag
  it('renders noindex robots tags when noindex is true', async () => {
    renderSEO({ noindex: true });
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[name="robots"]')).toBe('noindex, nofollow');
      expect(getDocumentMeta('meta[name="googlebot"]')).toBe('noindex, nofollow');
    });
  });

  // Example Test 8: Index robots tag
  it('renders index robots tags when noindex is false or undefined', async () => {
    renderSEO({ noindex: false });
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[name="robots"]')).toBe('index, follow');
      expect(getDocumentMeta('meta[name="googlebot"]')).toBe('index, follow');
    });
  });

  // Example Test 9: Canonical URL construction
  it('constructs canonical URL from window.location when not provided', async () => {
    renderSEO();
    
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical?.getAttribute('href')).toBeTruthy();
    });
  });

  // Example Test 15: Production mode no warnings
  it('does not log warnings in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    const consoleWarnSpy = vi.spyOn(console, 'warn');
    
    renderSEO({
      title: 'This is a very long title that exceeds sixty characters and should trigger a warning',
      description: 'Short',
      canonical: 'not-a-valid-url'
    });
    
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    
    process.env.NODE_ENV = originalEnv;
  });

  // Additional test: Custom title with brand suffix
  it('appends brand suffix to custom titles', async () => {
    renderSEO({ title: 'Dominate the Grid' });
    
    await waitFor(() => {
      expect(document.title).toBe('Dominate the Grid | TechLab Solars');
    });
  });

  // Additional test: Custom metadata propagation
  it('propagates custom metadata to all related tags', async () => {
    const customTitle = 'Custom Page Title';
    const customDescription = 'This is a custom description for testing metadata propagation across all meta tags in the SEO component.';
    const customImage = 'https://example.com/custom-image.jpg';
    
    renderSEO({
      title: customTitle,
      description: customDescription,
      image: customImage
    });
    
    await waitFor(() => {
      expect(document.title).toContain(customTitle);
      expect(getDocumentMeta('meta[name="description"]')).toBe(customDescription);
      expect(getDocumentMeta('meta[property="og:description"]')).toBe(customDescription);
      expect(getDocumentMeta('meta[name="twitter:description"]')).toBe(customDescription);
      expect(getDocumentMeta('meta[property="og:image"]')).toBe(customImage);
      expect(getDocumentMeta('meta[name="twitter:image"]')).toBe(customImage);
    });
  });

  // Additional test: Canonical URL provided
  it('uses provided canonical URL', async () => {
    const customCanonical = 'https://techlabsolars.com/custom-page';
    
    renderSEO({ canonical: customCanonical });
    
    await waitFor(() => {
      expect(getDocumentMeta('link[rel="canonical"]')).toBe(customCanonical);
    });
  });

  // Additional test: Custom meta tags
  it('renders custom meta tags without overriding defaults', async () => {
    const customMetaTags = [
      { name: 'author', content: 'TechLab Solars Team' },
      { property: 'fb:app_id', content: '123456789' }
    ];
    
    renderSEO({ metaTags: customMetaTags });
    
    await waitFor(() => {
      expect(getDocumentMeta('meta[name="author"]')).toBe('TechLab Solars Team');
      expect(getDocumentMeta('meta[property="fb:app_id"]')).toBe('123456789');
      // Verify default tags still exist
      expect(getDocumentMeta('meta[name="description"]')).toBeTruthy();
    });
  });
});
