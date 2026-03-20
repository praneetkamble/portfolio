## 2026-03-20 - Rewrite Testimonials Component with Physics Bubbles

**Modified Files:**
- `src/components/sections/Testimonials.js` - Complete rewrite to use interactive SVG background and bouncy bubble physics.

**Related Files:**
- `src/data/testimonials.js` - The data used for generating initials.

**Infrastructure Used:**
- 📚 **Libraries**: `styled-components`, `react-icons`

**What Was Done:**
- Converted Tailwind interactive logic to `styled-components`.
- Swapped Avatar images for text initials (`getInitials(name)`).
- Showed author role inside bubbles when they are inactive.
- Constrained bubbles to not exceed the visual Section title boundaries (strictly confined horizontally and vertically).
- Replaced cursor blob with a static SVG dots grid revealed by cursor utilizing `mask-image: radial-gradient`.
- Ensured perfect synchronization with translations (`t()`).

## Phase 2 Refinements
- **UI:** Circular inactive rings, neon glassmorphic open state, transparent edge borders, custom tracking cursor, large blurred background flashlight restored.
- **Layout:** Re-wrote SectionWrapper `Container` rendering to support a `fullWidth` prop.
- **Data:** Added 4 new testimonials globally spanning EN, FR, and AR datasets.
