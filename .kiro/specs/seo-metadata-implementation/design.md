# Design Document: SEO Metadata Implementation

## Overview

This design outlines the implementation of a comprehensive SEO metadata system for TechLab Solars using react-helmet-async. The solution provides a type-safe, reusable SEO component that manages document head metadata including OpenGraph tags, Twitter Cards, canonical URLs, and JSON-LD structured data.

The architecture follows React 18+ concurrent rendering best practices and maintains TypeScript strict mode compliance. The design prioritizes minimal bundle size impact (<15KB gzipped) for optimal performance on Render Static hosting.

### Key Design Principles

1. **Type Safety First**: All metadata properties are strictly typed with no `any` types
2. **Zero Runtime Overhead**: Metadata injection happens during render with no additional lifecycle costs
3. **Progressive Enhancement**: Sensible defaults ensure all pages have basic SEO coverage
4. **Developer Experience**: Simple prop-based API with validation warnings in development
5. **Bundle Efficiency**: Tree-shakeable imports and minimal dependencies

### Research Summary

**react-helmet-async vs alternatives**: react-helmet-async is the recommended solution for React 18+ as it properly handles concurrent rendering and Suspense boundaries. The original react-helmet is deprecated and causes hydration issues. Alternative solutions like react-head or custom implementations add unnecessary complexity.

**Bundle Size Analysis**: react-helmet-async adds approximately 8KB gzipped, well within the 15KB budget. The library is tree-shakeable and has zero dependencies beyond React.

**Schema.org Best Practices**: For professional service businesses, the ProfessionalService schema type is most appropriate. It supports all required fields including address, telephone, serviceType, and areaServed. For project/portfolio pages, Article schema provides better rich result opportunities.

**OpenGraph Image Specifications**: Facebook/LinkedIn require 1200x630px images for optimal display. Twitter supports the same dimensions with the summary_large_image card type. Images should be under 200KB and use absolute URLs.

## Architecture

### Component Hierarchy

```
App (HelmetProvider wrapper)
├── BrowserRouter
│   ├── Navigation
│   └── Routes
│       ├── Home (with SEO component)
│       ├── Services (with SEO component)
│       ├── Projects (with SEO component)
│       ├── Careers (with SEO component)
│       └── Contact (with SEO component)
```

### Data Flow

1. Page component renders with custom metadata props
2. SEO component receives props and merges with defaults
3. react-helmet-async Helmet component injects tags into document head
4. HelmetProvider manages state and prevents duplicate tags
5. Browser/crawler receives fully populated HTML head

### Integration Points

**Application Root (main.tsx or App.tsx)**:
- Wrap application with HelmetProvider
- Position outside BrowserRouter for SSR compatibility
- No configuration required

**Page Components**:
- Import SEO component
- Render at top of component tree
- Pass page-specific metadata props
- Component handles all head management

**Build System**:
- Vite automatically tree-shakes unused exports
- No special configuration needed
- Bundle analysis confirms size budget compliance

## Components and Interfaces

### SEO Component

**Location**: `src/components/shared/SEO.tsx`

**Purpose**: Centralized metadata management for all pages

**Key Features**:
- Accepts typed metadata props
- Provides TechLab Solars defaults
- Injects OpenGraph and Twitter Card tags
- Renders JSON-LD structured data
- Validates metadata in development mode

### TypeScript Interfaces

#### MetadataProps Interface

```typescript
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
```

**Design Rationale**:
- All properties optional to support defaults
- `type` restricted to valid OpenGraph types
- `metaTags` array enables future extensibility
- No `any` types - strict mode compliant

#### JSON-LD Schema Interfaces

```typescript
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
```

**Design Rationale**:
- Separate interfaces for different schema types
- Strict typing prevents invalid schema.org properties
- Nested objects typed for address and organization entities
- Supports both ProfessionalService and Article schemas

### Default Values

```typescript
const DEFAULT_METADATA = {
  title: 'TechLab Solars | Solar Energy Infrastructure - Chennai, India',
  description: 'Professional solar energy infrastructure design, installation, and monitoring services. 25.4 MW deployed across 500+ installations. Based in Chennai, serving all of India.',
  image: '/og-image-default.jpg',
  url: 'https://techlabsolars.com'
} as const;
```

**Design Rationale**:
- `as const` ensures immutability
- Description includes key metrics and location
- Image path relative to public directory
- URL uses production domain

## Data Models

### Metadata Configuration Model

Each page component will instantiate the SEO component with a configuration object:

```typescript
// Example: Home page metadata
const homeMetadata: MetadataProps = {
  title: 'Dominate the Grid',
  description: 'Grid-ready solar infrastructure engineered for maximum performance. TechLab Solars delivers enterprise-grade solar solutions from our Chennai headquarters.',
  canonical: 'https://techlabsolars.com',
  image: '/og-image-home.jpg'
};
```

### JSON-LD Data Model

The SEO component will generate JSON-LD based on page type:

**Default (ProfessionalService)**:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "TechLab Solars",
  "description": "Professional solar energy infrastructure services",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "IN"
  },
  "telephone": "+91-XXX-XXX-XXXX",
  "url": "https://techlabsolars.com",
  "priceRange": "₹₹₹",
  "areaServed": "India",
  "serviceType": "Solar Energy Installation"
}
```

**Article Type (for Projects page)**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Solar Projects Portfolio",
  "description": "25.4 MW deployed across 500+ installations",
  "image": "https://techlabsolars.com/og-image-projects.jpg",
  "author": {
    "@type": "Organization",
    "name": "TechLab Solars"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TechLab Solars",
    "logo": {
      "@type": "ImageObject",
      "url": "https://techlabsolars.com/tl%20logo.png"
    }
  }
}
```

### Canonical URL Construction

The component will construct canonical URLs using this logic:

```typescript
const getCanonicalUrl = (canonical?: string): string => {
  if (canonical) return canonical;
  
  // Fallback to current location
  if (typeof window !== 'undefined') {
    const { origin, pathname } = window.location;
    // Remove trailing slash and query params
    return `${origin}${pathname.replace(/\/$/, '')}`;
  }
  
  return DEFAULT_METADATA.url;
};
```

**Design Rationale**:
- Explicit canonical prop takes precedence
- Automatic construction from window.location for convenience
- Removes trailing slashes and query parameters
- SSR-safe with window check
- Falls back to default domain


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Metadata Propagation Consistency

*For any* title, description, and image values provided to the SEO component, those exact values SHALL appear consistently across all related meta tags (document title, og:title, twitter:title for titles; meta description, og:description, twitter:description for descriptions; og:image, twitter:image for images).

**Validates: Requirements 3.1, 4.1, 5.1, 5.2, 5.7, 6.2, 6.3, 6.4**

**Rationale**: This property ensures metadata consistency across all platforms (browsers, social media crawlers). If a title is set, it must propagate to all title-related tags without transformation or loss.

### Property 2: Default Value Fallback

*For any* metadata prop that is undefined, the SEO component SHALL render the corresponding default TechLab Solars value in all related meta tags.

**Validates: Requirements 2.7, 3.2, 4.2, 5.3, 5.6**

**Rationale**: This ensures every page has complete SEO coverage even when developers don't provide custom metadata. No page should have missing or empty meta tags.

### Property 3: Title Brand Suffix

*For any* custom title string provided, the SEO component SHALL append " | TechLab Solars" to create the final rendered title.

**Validates: Requirements 3.3**

**Rationale**: This ensures brand consistency across all pages while allowing custom page-specific titles. The suffix should be added to all non-default titles.

### Property 4: Canonical URL Sanitization

*For any* canonical URL containing query parameters or hash fragments, the SEO component SHALL strip them before rendering the canonical link tag.

**Validates: Requirements 7.4**

**Rationale**: Canonical URLs must be clean to prevent duplicate content issues. Query parameters and fragments should never appear in canonical tags.

### Property 5: Canonical Link Rendering

*For any* canonical URL provided (or constructed), the SEO component SHALL render a link tag with rel="canonical" and href set to that URL.

**Validates: Requirements 7.1**

**Rationale**: Every page must have a canonical URL to guide search engines to the preferred version of the page.

### Property 6: Robots Meta Tag Consistency

*For any* robots directive (index/noindex), the SEO component SHALL render matching meta tags for both name="robots" and name="googlebot" with identical content values.

**Validates: Requirements 15.3**

**Rationale**: Google respects both generic robots tags and googlebot-specific tags. They must always match to avoid conflicting directives.

### Property 7: Custom Meta Tags Injection

*For any* array of custom meta tags provided via the metaTags prop, all tags SHALL appear in the rendered output without overriding default meta tags.

**Validates: Requirements 19.2, 19.3**

**Rationale**: This enables extensibility for future metadata needs while protecting core SEO tags from accidental override.

### Property 8: Development Mode Validation Warnings

*For any* metadata that violates SEO best practices (title >60 chars, description outside 120-160 chars, malformed canonical URL), the SEO component SHALL log a console warning when process.env.NODE_ENV === 'development'.

**Validates: Requirements 20.1, 20.2, 20.3**

**Rationale**: Developers should receive immediate feedback about SEO issues during development, but production builds should not include validation overhead.

### Example Test 1: Default Metadata Rendering

WHEN the SEO component is rendered with no props, THEN it SHALL render all required meta tags with TechLab Solars default values including title, description, og:image, and all constant tags.

**Validates: Requirements 2.5**

### Example Test 2: Required Constant Meta Tags

WHEN the SEO component is rendered, THEN it SHALL always include og:image:width="1200", og:image:height="630", og:site_name="TechLab Solars", og:locale="en_IN", and twitter:card="summary_large_image" regardless of props.

**Validates: Requirements 5.8, 5.9, 5.10, 6.1**

### Example Test 3: OpenGraph Type Default

WHEN the SEO component is rendered without a type prop, THEN og:type SHALL be "website".

**Validates: Requirements 5.3**

### Example Test 4: OpenGraph Type Article

WHEN the SEO component is rendered with type="article", THEN og:type SHALL be "article".

**Validates: Requirements 5.4**

### Example Test 5: ProfessionalService JSON-LD Schema

WHEN the SEO component is rendered with type="website" or no type, THEN it SHALL render a script tag with type="application/ld+json" containing a valid ProfessionalService schema with @context="https://schema.org", @type="ProfessionalService", name="TechLab Solars", address with Chennai location, telephone, url, priceRange, areaServed="India", and serviceType="Solar Energy Installation".

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11, 8.12**

### Example Test 6: Article JSON-LD Schema

WHEN the SEO component is rendered with type="article", THEN it SHALL render Article schema instead of ProfessionalService schema.

**Validates: Requirements 8.13**

### Example Test 7: Noindex Robots Tag

WHEN the SEO component is rendered with noindex=true, THEN it SHALL render meta tags with content="noindex, nofollow" for both robots and googlebot.

**Validates: Requirements 15.1**

### Example Test 8: Index Robots Tag

WHEN the SEO component is rendered with noindex=false or undefined, THEN it SHALL render meta tags with content="index, follow" for both robots and googlebot.

**Validates: Requirements 15.2**

### Example Test 9: Canonical URL Construction

WHEN the SEO component is rendered without a canonical prop, THEN it SHALL construct the canonical URL from window.location.origin and pathname, removing trailing slashes.

**Validates: Requirements 7.2**

### Example Test 10: Home Page Integration

WHEN the Home page component is rendered, THEN it SHALL include the SEO component with title="Dominate the Grid" and canonical pointing to the root domain.

**Validates: Requirements 10.1, 10.2, 10.4**

### Example Test 11: Services Page Integration

WHEN the Services page component is rendered, THEN it SHALL include the SEO component with a title containing "Solar Energy Services" and "TechLab Solars", and canonical="/services".

**Validates: Requirements 11.1, 11.2, 11.4**

### Example Test 12: Projects Page Integration

WHEN the Projects page component is rendered, THEN it SHALL include the SEO component with a title containing "Solar Projects" and "Portfolio", and canonical="/projects".

**Validates: Requirements 12.1, 12.2, 12.4**

### Example Test 13: Careers Page Integration

WHEN the Careers page component is rendered, THEN it SHALL include the SEO component with a title containing "Careers" and "Join Our Team", and canonical="/careers".

**Validates: Requirements 13.1, 13.2, 13.4**

### Example Test 14: Contact Page Integration

WHEN the Contact page component is rendered, THEN it SHALL include the SEO component with a title containing "Contact" and "Site Survey", and canonical="/contact".

**Validates: Requirements 14.1, 14.2, 14.4**

### Example Test 15: Production Mode No Warnings

WHEN the SEO component is rendered with invalid metadata in production mode (process.env.NODE_ENV === 'production'), THEN it SHALL NOT log any console warnings.

**Validates: Requirements 20.4**

## Error Handling

### Invalid Prop Handling

The SEO component will handle invalid props gracefully:

**Empty Strings**: Treated as undefined, falling back to defaults
**Malformed URLs**: Logged as warnings in development, rendered as-is in production
**Invalid Type Values**: TypeScript prevents at compile time via union type
**Null Values**: Treated as undefined, falling back to defaults

### Runtime Error Prevention

```typescript
// Safe window access for SSR compatibility
const getCanonicalUrl = (canonical?: string): string => {
  if (canonical) return canonical;
  
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${window.location.pathname}`;
  }
  
  return DEFAULT_METADATA.url;
};

// Safe JSON-LD rendering
const renderJsonLd = (schema: ProfessionalServiceSchema | ArticleSchema): string => {
  try {
    return JSON.stringify(schema);
  } catch (error) {
    console.error('Failed to serialize JSON-LD schema:', error);
    return '{}';
  }
};
```

### Development Mode Validation

```typescript
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
```

### Helmet Provider Error Boundaries

The HelmetProvider should be wrapped in an error boundary to prevent SEO failures from crashing the application:

```typescript
// In App.tsx or main.tsx
<ErrorBoundary fallback={<div>Application Error</div>}>
  <HelmetProvider>
    <App />
  </HelmetProvider>
</ErrorBoundary>
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and integration points
- Default metadata rendering (Example Test 1)
- Constant meta tags presence (Example Test 2)
- OpenGraph type switching (Example Tests 3-4)
- JSON-LD schema structure (Example Tests 5-6)
- Robots meta tag variations (Example Tests 7-8)
- Canonical URL construction (Example Test 9)
- Page integration tests (Example Tests 10-14)
- Production mode behavior (Example Test 15)

**Property Tests**: Verify universal properties across all inputs
- Metadata propagation consistency (Property 1)
- Default value fallback (Property 2)
- Title brand suffix (Property 3)
- Canonical URL sanitization (Property 4)
- Canonical link rendering (Property 5)
- Robots meta tag consistency (Property 6)
- Custom meta tags injection (Property 7)
- Development mode validation warnings (Property 8)

### Property-Based Testing Configuration

**Library**: fast-check (for TypeScript/JavaScript property-based testing)

**Installation**:
```bash
npm install --save-dev fast-check
```

**Configuration**: Each property test will run minimum 100 iterations to ensure comprehensive input coverage.

**Test Tag Format**: Each property test must include a comment referencing the design property:
```typescript
// Feature: seo-metadata-implementation, Property 1: Metadata Propagation Consistency
test('metadata propagates consistently across all tags', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 100 }),
      fc.string({ minLength: 1, maxLength: 200 }),
      fc.webUrl(),
      (title, description, image) => {
        // Test implementation
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Test Examples

**Testing Framework**: Vitest with React Testing Library

**Example Unit Test**:
```typescript
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/shared/SEO';

describe('SEO Component', () => {
  it('renders default metadata when no props provided', () => {
    render(<SEO />);
    
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('TechLab Solars | Solar Energy Infrastructure - Chennai, India');
    expect(helmet.metaTags.find(t => t.name === 'description')?.content)
      .toContain('Professional solar energy infrastructure');
  });
  
  it('appends brand suffix to custom titles', () => {
    render(<SEO title="Dominate the Grid" />);
    
    const helmet = Helmet.peek();
    expect(helmet.title).toBe('Dominate the Grid | TechLab Solars');
  });
});
```

### Integration Test Strategy

Each page component (Home, Services, Projects, Careers, Contact) will have an integration test verifying:
1. SEO component is rendered
2. Page-specific metadata is correct
3. Canonical URL matches the route

**Example Integration Test**:
```typescript
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '@/pages/Home';

describe('Home Page SEO', () => {
  it('renders with correct SEO metadata', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );
    
    const helmet = Helmet.peek();
    expect(helmet.title).toContain('Dominate the Grid');
    expect(helmet.linkTags.find(t => t.rel === 'canonical')?.href)
      .toBe('https://techlabsolars.com');
  });
});
```

### Test Coverage Goals

- **SEO Component**: 100% coverage (all branches, all props)
- **Page Integrations**: 100% coverage (all pages have SEO)
- **Utility Functions**: 100% coverage (URL sanitization, validation)
- **Overall Feature**: 95%+ coverage

### Performance Testing

While not part of automated tests, manual verification should confirm:
1. Bundle size increase <15KB gzipped (use `npm run build` and check dist/assets)
2. No visible performance degradation on page load
3. Lighthouse SEO score remains 100/100
4. No hydration warnings in development console

### Accessibility Testing

Verify that metadata doesn't interfere with screen readers:
1. Document title is announced correctly
2. No duplicate ARIA labels from meta tags
3. JSON-LD script tags don't affect tab order

