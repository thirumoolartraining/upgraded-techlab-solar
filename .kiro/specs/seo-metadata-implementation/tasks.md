# Implementation Plan: SEO Metadata Implementation

## Overview

This plan implements comprehensive SEO metadata infrastructure for TechLab Solars using react-helmet-async. The implementation follows a sequential approach: install dependencies, create the core SEO component with TypeScript interfaces, integrate the HelmetProvider, add SEO to all page components, create the default OpenGraph image asset, and validate with tests.

All tasks build incrementally to ensure the feature is functional at each checkpoint. Testing tasks are marked as optional to enable faster MVP delivery while maintaining quality standards.

## Tasks

- [x] 1. Install react-helmet-async dependency
  - Run `npm install react-helmet-async` to add production dependency
  - Verify compatibility with React 18.3.1 in package.json
  - Ensure TypeScript types are included (@types/react-helmet-async is bundled)
  - _Requirements: 1.1, 1.2_

- [-] 2. Create SEO component with TypeScript interfaces
  - [x] 2.1 Create src/components/shared/SEO.tsx with MetadataProps interface
    - Define MetadataProps interface with title, description, canonical, image, type, noindex, and metaTags properties
    - All properties should be optional with proper TypeScript types (no `any` types)
    - Use union type for `type` property: 'website' | 'article'
    - _Requirements: 2.1, 2.2, 2.4, 16.1, 16.2, 16.3, 16.4_
  
  - [x] 2.2 Implement default metadata constants
    - Create DEFAULT_METADATA constant with TechLab Solars defaults
    - Include default title, description, image path, and URL
    - Use `as const` for immutability
    - _Requirements: 2.5, 2.7, 3.2, 4.2_
  
  - [x] 2.3 Implement SEO component with Helmet integration
    - Import Helmet from react-helmet-async
    - Accept MetadataProps as props
    - Merge provided props with defaults
    - Render document title with brand suffix logic
    - _Requirements: 2.3, 3.1, 3.3_
  
  - [x] 2.4 Add meta description tag rendering
    - Render meta name="description" tag
    - Use provided description or default
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 2.5 Add OpenGraph meta tags
    - Render og:title, og:description, og:type, og:url, og:image tags
    - Render og:image:width="1200" and og:image:height="630"
    - Render og:site_name="TechLab Solars" and og:locale="en_IN"
    - Handle type prop for website vs article
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10_
  
  - [x] 2.6 Add Twitter Card meta tags
    - Render twitter:card="summary_large_image"
    - Render twitter:title, twitter:description, twitter:image matching OpenGraph values
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  
  - [x] 2.7 Implement canonical URL logic
    - Create getCanonicalUrl helper function
    - Use provided canonical prop or construct from window.location
    - Strip trailing slashes and query parameters
    - Handle SSR safety with window check
    - Render link rel="canonical" tag
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 2.8 Add robots meta tags
    - Render meta name="robots" and name="googlebot" tags
    - Use noindex prop to control content: "index, follow" or "noindex, nofollow"
    - Ensure both tags have matching content
    - _Requirements: 15.1, 15.2, 15.3_
  
  - [x] 2.9 Implement JSON-LD structured data
    - Create ProfessionalServiceSchema and ArticleSchema TypeScript interfaces
    - Implement renderJsonLd helper function with try-catch
    - Render script type="application/ld+json" tag
    - Include ProfessionalService schema by default with all required fields
    - Support Article schema when type="article"
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11, 8.12, 8.13, 16.5_
  
  - [x] 2.10 Add custom meta tags support
    - Accept metaTags array prop
    - Render custom meta tags without overriding defaults
    - _Requirements: 19.1, 19.2, 19.3_
  
  - [x] 2.11 Implement development mode validation
    - Create validateMetadata function
    - Check title length (warn if >60 characters)
    - Check description length (warn if <120 or >160 characters)
    - Check canonical URL format
    - Only log warnings when NODE_ENV === 'development'
    - _Requirements: 20.1, 20.2, 20.3, 20.4_

- [ ] 2.12 Write property test for metadata propagation consistency
  - **Property 1: Metadata Propagation Consistency**
  - **Validates: Requirements 3.1, 4.1, 5.1, 5.2, 5.7, 6.2, 6.3, 6.4**
  - Use fast-check to generate random title, description, and image values
  - Verify values appear consistently in all related meta tags
  - Run 100 iterations minimum

- [ ]* 2.13 Write property test for default value fallback
  - **Property 2: Default Value Fallback**
  - **Validates: Requirements 2.7, 3.2, 4.2, 5.3, 5.6**
  - Use fast-check to generate random combinations of undefined props
  - Verify default TechLab Solars values are rendered
  - Run 100 iterations minimum

- [ ]* 2.14 Write property test for title brand suffix
  - **Property 3: Title Brand Suffix**
  - **Validates: Requirements 3.3**
  - Use fast-check to generate random title strings
  - Verify " | TechLab Solars" is appended to all custom titles
  - Run 100 iterations minimum

- [ ]* 2.15 Write property test for canonical URL sanitization
  - **Property 4: Canonical URL Sanitization**
  - **Validates: Requirements 7.4**
  - Use fast-check to generate URLs with query parameters and hash fragments
  - Verify they are stripped from canonical link tag
  - Run 100 iterations minimum

- [ ]* 2.16 Write property test for canonical link rendering
  - **Property 5: Canonical Link Rendering**
  - **Validates: Requirements 7.1**
  - Use fast-check to generate random canonical URLs
  - Verify link rel="canonical" tag is always rendered
  - Run 100 iterations minimum

- [ ]* 2.17 Write property test for robots meta tag consistency
  - **Property 6: Robots Meta Tag Consistency**
  - **Validates: Requirements 15.3**
  - Use fast-check to generate random boolean values for noindex
  - Verify robots and googlebot meta tags have matching content
  - Run 100 iterations minimum

- [ ]* 2.18 Write property test for custom meta tags injection
  - **Property 7: Custom Meta Tags Injection**
  - **Validates: Requirements 19.2, 19.3**
  - Use fast-check to generate random arrays of custom meta tags
  - Verify all custom tags appear without overriding defaults
  - Run 100 iterations minimum

- [ ]* 2.19 Write property test for development mode validation warnings
  - **Property 8: Development Mode Validation Warnings**
  - **Validates: Requirements 20.1, 20.2, 20.3**
  - Use fast-check to generate invalid metadata (long titles, short descriptions, malformed URLs)
  - Verify console warnings appear only in development mode
  - Run 100 iterations minimum

- [ ] 2.20 Write unit tests for SEO component
  - Test default metadata rendering (Example Test 1)
  - Test required constant meta tags (Example Test 2)
  - Test OpenGraph type default and article (Example Tests 3-4)
  - Test ProfessionalService and Article JSON-LD schemas (Example Tests 5-6)
  - Test noindex and index robots tags (Example Tests 7-8)
  - Test canonical URL construction (Example Test 9)
  - Test production mode no warnings (Example Test 15)
  - _Requirements: 2.5, 5.3, 5.4, 5.8, 5.9, 5.10, 6.1, 8.1-8.13, 15.1, 15.2, 7.2, 20.4_

- [x] 3. Integrate HelmetProvider in application root
  - [x] 3.1 Add HelmetProvider to main.tsx or App.tsx
    - Import HelmetProvider from react-helmet-async
    - Wrap application with HelmetProvider
    - Position outside BrowserRouter for SSR compatibility
    - _Requirements: 9.1, 9.2_
  
  - [ ]* 3.2 Verify no hydration warnings
    - Run application in development mode
    - Check console for hydration warnings
    - _Requirements: 9.3_

- [ ] 4. Checkpoint - Verify SEO component works in isolation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Integrate SEO component in Home page
  - [x] 5.1 Add SEO component to Home page component
    - Import SEO component
    - Render at top of component with custom props
    - Set title="Dominate the Grid"
    - Set description highlighting grid-ready solar infrastructure and Chennai headquarters
    - Set canonical to root domain URL
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 5.2 Write integration test for Home page SEO
    - **Validates: Requirements 10.1, 10.2, 10.4**
    - Verify SEO component renders with correct metadata
    - Verify canonical URL matches root domain

- [x] 6. Integrate SEO component in Services page
  - [x] 6.1 Add SEO component to Services page component
    - Import SEO component
    - Set title including "Solar Energy Services" and "TechLab Solars"
    - Set description mentioning site survey, design, installation, and monitoring services
    - Set canonical="/services"
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 6.2 Write integration test for Services page SEO
    - **Validates: Requirements 11.1, 11.2, 11.4**
    - Verify SEO component renders with correct metadata
    - Verify canonical URL matches /services route

- [x] 7. Integrate SEO component in Projects page
  - [x] 7.1 Add SEO component to Projects page component
    - Import SEO component
    - Set title including "Solar Projects" and "Portfolio"
    - Set description highlighting 25.4 MW deployed and 500+ installations
    - Set canonical="/projects"
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  
  - [ ]* 7.2 Write integration test for Projects page SEO
    - **Validates: Requirements 12.1, 12.2, 12.4**
    - Verify SEO component renders with correct metadata
    - Verify canonical URL matches /projects route

- [x] 8. Integrate SEO component in Careers page
  - [x] 8.1 Add SEO component to Careers page component
    - Import SEO component
    - Set title including "Careers" and "Join Our Team"
    - Set description mentioning engineering and technical opportunities
    - Set canonical="/careers"
    - _Requirements: 13.1, 13.2, 13.3, 13.4_
  
  - [ ]* 8.2 Write integration test for Careers page SEO
    - **Validates: Requirements 13.1, 13.2, 13.4**
    - Verify SEO component renders with correct metadata
    - Verify canonical URL matches /careers route

- [x] 9. Integrate SEO component in Contact page
  - [x] 9.1 Add SEO component to Contact page component
    - Import SEO component
    - Set title including "Contact" and "Site Survey"
    - Set description mentioning Chennai location and consultation services
    - Set canonical="/contact"
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [ ]* 9.2 Write integration test for Contact page SEO
    - **Validates: Requirements 14.1, 14.2, 14.4**
    - Verify SEO component renders with correct metadata
    - Verify canonical URL matches /contact route

- [ ] 10. Checkpoint - Verify all pages have SEO metadata
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Create default OpenGraph image asset
  - [x] 11.1 Create or obtain default OpenGraph image
    - Create image at 1200x630 pixels
    - Include TechLab Solars branding and solar panel imagery
    - Optimize for web delivery (target <200KB)
    - Save as public/og-image-default.jpg
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_
  
  - [x] 11.2 Verify SEO component references default image
    - Confirm DEFAULT_METADATA.image points to /og-image-default.jpg
    - Test that pages without custom images use the default
    - _Requirements: 18.5_

- [x]* 12. Verify bundle size compliance
  - Run `npm run build` to generate production bundle
  - Check dist/assets directory for bundle sizes
  - Verify total bundle size increase is under 15KB gzipped
  - Use bundle analyzer if needed to identify large dependencies
  - _Requirements: 1.3, 17.1, 17.2, 17.3, 17.4_

- [ ] 13. Final checkpoint - Complete feature validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations
- Unit tests use Vitest with React Testing Library
- All TypeScript code must pass strict mode compilation
- SEO component must not use `any` types per agent profile directive
- Bundle size must remain under 15KB gzipped for Render Static optimization
- Development mode validation warnings help catch SEO issues early
- Checkpoints ensure incremental validation and user feedback opportunities
