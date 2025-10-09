# FILMRICK.com Development Notes

## Project Overview
Film photography portfolio website built with Next.js 15.5.2, featuring bilingual content (Spanish/English) and premium editorial design.

## Architecture
- **Framework**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS with IBM Plex Mono font
- **Content**: MDX files with gray-matter for metadata
- **Languages**: Spanish (default/root) and English (/en routes)
- **Deployment**: Surge.sh at filmrick.surge.sh

## Key Technical Decisions

### Font Implementation
- IBM Plex Mono loaded via next/font/google
- Applied site-wide through body className in layout.tsx
- All font-mono classes removed to prevent inheritance conflicts
- Clean Tailwind CSS approach without CSS variables

### Bilingual Routing
- Spanish content at root level (/)
- English content at /en/* routes
- Content structure:
  - `content/stories/` (Spanish) and `content/stories/en/` (English)
  - `content/galleries/` (Spanish) and `content/galleries/en/` (English)
  - `content/about/` (Spanish) and `content/about/en/` (English)

### Language Context
- LanguageProvider detects locale from URL path
- Proper initialization prevents Spanish/English content mixing
- localStorage persistence for user preference

## Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run type-check # TypeScript checking
```

## Content Management
- Stories: Ordered by date (newest first)
- Galleries: Static collections with metadata
- All content in markdown/MDX format
- Images stored in public/images/

## Deployment
- Platform: Vercel
- Build: `npm run build`
- Auto-deploy: Push to `dev` branch triggers deployment
- Framework: Next.js (auto-detected by Vercel)

## Recent Fixes
- ✅ IBM Plex Mono font inheritance resolved
- ✅ Bilingual routing fixed (Spanish at root, English at /en)
- ✅ Language context initialization corrected
- ✅ Spanish bio content translated
- ✅ Development environment cleaned up

## Code Quality
- Follows Next.js 13+ App Router patterns
- Tailwind CSS best practices
- TypeScript strict mode
- Clean component architecture
- No hacks or non-standard practices