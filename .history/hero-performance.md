## 2026-03-09 - Scroll Freezing & Animation Performance Update

**Modified Files:**
- `src/components/sections/Hero.js` - Complete rewrite of `AvatarFrame` rendering.

**Infrastructure Used:**
- 🖼️ **DOM API**: HTML `<canvas>` instead of `<img srcPattern>`
- 🪝 **Hooks**: `useCallback` to cache the drawing function and pure JS `Image` classes for hard caching frames purely in memory.

**What Was Done:**
- The reason the scrolling was still freezing slightly on fast scrolls is that even when using `frameImgRef.current.src = frame`, the browser still has to decode the WebP image into a bitmap layout for the screen. On fast scrolls (60 scrubs per second), this piles up.
- **Canvas Blitting:** I refactored `<AvatarFrame>` to be a `<canvas>`.
- Now, when the 204 images are downloaded (`new Image()`), I store the actual JS objects inside React `useRef(preloadedImages)`.
- During the `gsap` scroll scrub, instead of changing DOM attributes, the engine calls `ctx.drawImage(img)` which paints the ready-decoded 2D buffer directly to the screen via GPU hardware acceleration.
- This represents the absolute pinnacle of high-performance sequence rendering on the web (the exact same technique Apple uses for their scroll animations).

**Notes:**
- A full browser refresh (`Ctrl+F5` or `Cmd+Shift+R`) is mandatory to reload the DOM structure since we swapped an `<img>` tag out for a `<canvas>` element!
