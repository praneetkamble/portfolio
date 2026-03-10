## 2026-03-10 - Project Section: Cinematic Horizontal Slider Rewrite

**Modified Files:**
- `src/components/sections/Projects.js` - Complete rewrite using a sticky horizontal scrolling layout based on user's HTML template.
- `src/data/projects.js` - Added `image` properties using high-quality Unsplash URLs for the parallax slider images.

**Related Files:**
- `src/context/LanguageContext.js` - Used internal `t` function to map localized content (titles and descriptions).

**Infrastructure Used:**
- 🪝 **Hooks**: `useEffect`, `useRef`, `useState`, `useLanguage`
- 📚 **Libraries**: `styled-components`, Tailwind CSS

**What Was Done:**
- Converted standard vertical grid layout for Projects into a 100vh full screen cinematic sticky container.
- Added scroll-linked horizontal translation mapped exactly to `(N - 1) * 100vw`.
- Implemented `Anton` typography, parallax shift for images and titles relative to viewport.
- Handled global cursor intersection to only display correctly over slider elements.
- Retained existing `project` loop mapping, linking, tags and fallback data properly.

**Notes:**
- `Next/image` was intentionally eschewed for standard `<img>` to permit smoother CSS 3D transforms (`scale`, `translate3d`).
- `window.addEventListener('resize')` tracks `maxScroll` bounds.
