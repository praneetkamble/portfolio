## 2026-03-10 - Correction rendu 3D Light Mode (Section About)

**Modified Files:**
- `src/components/sections/About.js` - Adjusted fog density and lighting parameters dynamically based on theme.

**What Was Done:**
- Added adaptive `scene.fog.density`: It is now `0.025` in Dark mode and reduced to `0.012` in Light mode to prevent the bright fog from washing out object colors.
- Tweaked `ambientLight` and `dirLight` intensities when switching to Light mode to provide better contrast.
- Darkened the 3D grid helper slightly in Light mode (`#cbd5e1`) so it remains visible against the bright background.

**Notes:**
- A very dense fog combined with a white/light background adds white pixels over everything, creating an overexposed "milky/foggy" look. By reducing the fog density and balancing the lights in Light mode, the 3D scene retains vivid colors and good contrast regardless of the active theme.
