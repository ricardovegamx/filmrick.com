# FILMRICK Portfolio – Tasks

**IMPORTANT:** Commit to dev branch after each task is completed.

## 1. Project Setup
- Create a new Next.js project (latest version).
- Configure TailwindCSS.
- Initialize Git repo and enable Git LFS for images.
- Add `/content` folder for Markdown/MDX files.
- Add `/public/images` folder for optimized images.

## 2. Site Structure
- Add four routes:
  - `/` (Home)
  - `/galleries`
  - `/stories`
  - `/about`
- Each route should load a placeholder component.

## 3. MDX Integration
- Configure MDX support.
- Load markdown files from `/content`.
- Render them as pages.
- Add sample markdown files for each section.

## 4. Custom MDX Components
- `<Gallery>` → responsive grid (3x3 desktop, 2x2 mobile).
- `<Quote>` → elegant typographic block for quotes.
- Test components inside sample markdown files.

## 5. Image Optimization
- Set up Next.js Image optimization.
- Auto-generate optimized versions (~200–300kb).
- Enable lazy loading by default.
- Strip metadata, no watermark, no downloads.

## 6. SEO & Internationalization
- Implement SEO (Open Graph, Twitter cards).
- Default language = English.
- Auto-detect Spanish if browser locale = es.
- Add clean URL routing.

## 7. Design Polish
- Minimalist, black & white theme.
- Japanese-inspired layout (subtle grid, refined spacing).
- Sans-serif magazine-style typography.
- Add light/dark mode toggle.

## 8. About Page
- Add short bio (placeholder).
- Include link to Substack.
- Style consistent with the rest of the site.

## 9. CI/CD
- Add GitHub Actions workflow.
- Auto-deploy to Vercel on push to main branch.

## 10. Final Review
- Verify requirements:
  - SEO  
  - Galleries & Stories working with MDX  
  - About page & Substack link  
  - Image optimization & lazy loading  
  - i18n detection  
  - Light/dark mode  
- Ensure repo is production-ready.