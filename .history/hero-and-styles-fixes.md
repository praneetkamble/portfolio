## 2026-03-09 - Avatar Frame Count & GlobalStyles Fixes

**Modified Files:**
- `src/styles/GlobalStyles.js` - Removed `@import` for Google Fonts to fix styled-components console warning about CSSOM APIs not handling `@import` well.
- `src/components/sections/Hero.js` - Updated `IDLE_FRAME_COUNT` from 72 to `36` because the `public/avatar/idle/` folder only contained 36 frames.
- `public/avatar/idle/frame_029.webp` - Copied from `frame_028.webp` to fill the gap and prevent a 404 error during the idle loop preload.

**Infrastructure Used:**
- ⚙️ **Config**: `src/app/layout.js` already includes the proper `<link>` tags for Google Fonts.

**What Was Done:**
- Replaced the `@import` statement in `createGlobalStyle` so it relies exclusively on `<link>` tags.
- Verified frame counts for `scroll` (96) and `action` (72) sequences.
- Resolved 404 console errors caused by mismatch between requested idle frames and existing idle frame assets.

## 2026-03-09 - Preloader vs Language Popup Sync

**Modified Files:**
- `src/components/Preloader.js` - Dispatches `preloader-finished` window event on completion.
- `src/components/PreferencesPopup.js` - Waits for `preloader-finished` before displaying the popup to the user.

**What Was Done:**
- Reversed the synchronization order so the Preloader animation finishes playing entirely before the Languages/Preferences popup interrupts the user.

## 2026-03-09 - Hero Section RTL Optimizations

**Modified Files:**
- `src/components/sections/Hero.js` - Implemented logical CSS properties (`inset-inline-start`, `inset-inline-end`) and conditional GSAP translations based on `isRTL`.

**Infrastructure Used:**
- 🪝 **Hooks**: `useLanguage` to access `isRTL`.

**What Was Done:**
- Mapped absolute `left`/`right` styled-component properties to `inset-inline-start`/`inset-inline-end` to automatically flip orbits and badges depending on the text direction.
- Updated `margin-left` in the `SkillPercent` component to `margin-inline-start` for correct flex layout alignment.
- Made GSAP timeline X-axis translation values conditionally reverse sign when `isRTL` is true, ensuring the Avatar properly slides to the right and explodes badges to the left.

## 2026-03-09 - Added Skill Title to Hero Section

**Modified Files:**
- `src/components/sections/Hero.js` - Added a `SkillTitle` styled component.

**Infrastructure Used:**
- 🪝 **Hooks**: `useLanguage` to access `t` for `skills.title`.

**What Was Done:**
- Rendered a text heading ("My Tech Stack" / "Core Skills") that fades in smoothly via GSAP alongside the orbiting badges when they explode into horizontal skill bars on the right side.
- Aligned the text flush with the expanded skill bars according to the LTR/RTL layout using logical CSS properties.

## 2026-03-09 - Fixed Animation Freeze on Title Render

**Modified Files:**
- `src/components/sections/Hero.js` - Optimized `SkillTitle` and `SkillBarWrapper` DOM placement and GSAP styles.

**What Was Done:**
- Wrapped `SkillTitle` and `SkillBarWrapper`s inside a new `SkillBarsContainer` (`position: absolute; inset: 0`) to decouple them from the `HeroContainer` Grid layout, preventing layout thrashing when their widths animate.
- Replaced GSAP `opacity: 0` with `autoAlpha: 0` (which toggles `visibility: hidden`) to prevent the browser from computing rendering costs for invisible text elements.
- Forced hardware acceleration on the title using `transform: translateZ(0)` and `will-change: opacity, transform, visibility`.

## 2026-03-09 - Fixed Framerate Hitching During Scroll

**Modified Files:**
- `src/components/sections/Hero.js` - Changed `ParticleCanvas` event rendering optimization.
## 2026-03-09 - Avatar Frame Count & GlobalStyles Fixes

**Modified Files:**
- `src/styles/GlobalStyles.js` - Removed `@import` for Google Fonts to fix styled-components console warning about CSSOM APIs not handling `@import` well.
- `src/components/sections/Hero.js` - Updated `IDLE_FRAME_COUNT` from 72 to `36` because the `public/avatar/idle/` folder only contained 36 frames.
- `public/avatar/idle/frame_029.webp` - Copied from `frame_028.webp` to fill the gap and prevent a 404 error during the idle loop preload.

**Infrastructure Used:**
- ⚙️ **Config**: `src/app/layout.js` already includes the proper `<link>` tags for Google Fonts.

**What Was Done:**
- Replaced the `@import` statement in `createGlobalStyle` so it relies exclusively on `<link>` tags.
- Verified frame counts for `scroll` (96) and `action` (72) sequences.
- Resolved 404 console errors caused by mismatch between requested idle frames and existing idle frame assets.

## 2026-03-09 - Preloader vs Language Popup Sync

**Modified Files:**
- `src/components/Preloader.js` - Dispatches `preloader-finished` window event on completion.
- `src/components/PreferencesPopup.js` - Waits for `preloader-finished` before displaying the popup to the user.

**What Was Done:**
- Reversed the synchronization order so the Preloader animation finishes playing entirely before the Languages/Preferences popup interrupts the user.

## 2026-03-09 - Hero Section RTL Optimizations

**Modified Files:**
- `src/components/sections/Hero.js` - Implemented logical CSS properties (`inset-inline-start`, `inset-inline-end`) and conditional GSAP translations based on `isRTL`.

**Infrastructure Used:**
- 🪝 **Hooks**: `useLanguage` to access `isRTL`.

**What Was Done:**
- Mapped absolute `left`/`right` styled-component properties to `inset-inline-start`/`inset-inline-end` to automatically flip orbits and badges depending on the text direction.
- Updated `margin-left` in the `SkillPercent` component to `margin-inline-start` for correct flex layout alignment.
- Made GSAP timeline X-axis translation values conditionally reverse sign when `isRTL` is true, ensuring the Avatar properly slides to the right and explodes badges to the left.

## 2026-03-09 - Added Skill Title to Hero Section

**Modified Files:**
- `src/components/sections/Hero.js` - Added a `SkillTitle` styled component.

**Infrastructure Used:**
- 🪝 **Hooks**: `useLanguage` to access `t` for `skills.title`.

**What Was Done:**
- Rendered a text heading ("My Tech Stack" / "Core Skills") that fades in smoothly via GSAP alongside the orbiting badges when they explode into horizontal skill bars on the right side.
- Aligned the text flush with the expanded skill bars according to the LTR/RTL layout using logical CSS properties.

## 2026-03-09 - Fixed Animation Freeze on Title Render

**Modified Files:**
- `src/components/sections/Hero.js` - Optimized `SkillTitle` and `SkillBarWrapper` DOM placement and GSAP styles.

**What Was Done:**
- Wrapped `SkillTitle` and `SkillBarWrapper`s inside a new `SkillBarsContainer` (`position: absolute; inset: 0`) to decouple them from the `HeroContainer` Grid layout, preventing layout thrashing when their widths animate.
- Replaced GSAP `opacity: 0` with `autoAlpha: 0` (which toggles `visibility: hidden`) to prevent the browser from computing rendering costs for invisible text elements.
- Forced hardware acceleration on the title using `transform: translateZ(0)` and `will-change: opacity, transform, visibility`.

## 2026-03-09 - Fixed Framerate Hitching During Scroll

**Modified Files:**
- `src/components/sections/Hero.js` - Changed `ParticleCanvas` event rendering optimization.

**What Was Done:**
- Added an `IntersectionObserver` to the hero section. The expensive canvas `requestAnimationFrame` particle loop completely pauses when the user scrolls past the Hero area, saving massive CPU/GPU overhead on scroll down.
- Implemented a debounce timeout on the `resize` event handler.
- Removed the expensive `ctx.shadowBlur` from the particles, as canvas blur filters heavily degrade scroll performance.
- Set the `mousemove` event listener tracking the cursor to `{ passive: true }` to avoid scroll blocking on the main thread.
- Decreased the maximum particle cap slightly from `100` to `80`.

## 2026-03-09 - Added 12 Animated Skill Badges to Hero

**Modified Files:**
- `src/components/sections/Hero.js` - Refactored orbital badges and skill horizontal bars to render dynamically from an array of 12 technologies.

**Infrastructure Used:**
- ⚙️ **Config**: Expanded the hardcoded `badges` GSAP arrays into a `BADGES` array object containing React, Next.js, Node.js, Firebase, PostgreSQL, MySQL, PHP, Python, styled-components, REST API, Three.js, and GSAP.

**What Was Done:**
- Converted `SkillBarsContainer` from an absolute wrapper to a `flex-wrap` container that takes up the right side of the screen.
- Converted `SkillBarWrapper` to `position: relative` so the 12 bars naturally wrap into 2 or 3 columns on Desktop and 1 column on Mobile, utilizing space perfectly without overflowing vertically down the page.
- Rewrote the GSAP timeline `forEach` loop. The interval between flights is now `0.15s` instead of `1.5s`, compressing the animation of 12 badges into a dense, rapid-fire sequence so the user doesn't have to scroll forever.
- Math changes for flight phase: The badges now shoot outwards in a calculated radial burst `angle = (Math.PI * 2 * index) / 12` before locking into their respective grid positions.
## 2026-03-09 - Fixed React Hydration Error in Hero Badges

**Modified Files:**
- `src/components/sections/Hero.js` - Changed how orbital badge starting positions are calculated.

**What Was Done:**
- Replaced `Math.random()` with deterministic pseudo-random logic based on the array `index`.
- This ensures the server-side React render and the client-side React hydration generate the exact same CSS `top`, `left`, and `right` inline style properties, resolving the "Text content did not match" Next.js hydration console error.
 
  
  
 # #   2 0 2 6 - 0 3 - 1 0   -   S c a l e d   S k i l l T i t l e   W a t e r m a r k  
 * * M o d i f i e d   F i l e s : * *  
 -   s r c / c o m p o n e n t s / s e c t i o n s / H e r o . j s   -   I n c r e a s e d   f o n t   s i z e   a n d   o p a c i t y   o f   S k i l l T i t l e  
 * * W h a t   W a s   D o n e : * *  
 -   U s e r   w a n t e d   t h e   w a t e r m a r k   t o   s p a n   a l m o s t   t h e   e n t i r e   s e c t i o n   w i d t h .  
 -   C h a n g e d   f o n t - s i z e   f r o m   c l a m p ( 4 r e m ,   1 0 v w ,   1 5 r e m )   t o   c l a m p ( 5 r e m ,   1 6 v w ,   2 2 r e m ) .  
 -   A d j u s t e d   l i n e - h e i g h t   t o   0 . 8 5   a n d   l e t t e r - s p a c i n g   t o   - 4 p x   t o   m a k e   t h e   m a s s i v e   t e x t   l o o k   c o h e s i v e .  
 -   I n c r e a s e d   t h e   G S A P   a u t o A l p h a   f r o m   0 . 0 4   t o   0 . 0 8   s o   t h e   t e x t   i s   s l i g h t l y   m o r e   v i s i b l e .  
  
 