## 2026-03-10 - Optimisation changement de thème (Section About)

**Modified Files:**
- `src/components/sections/About.js` - Changed Three.js scene initialization to avoid teardown/rebuild on theme switch.

**What Was Done:**
- Separated Three.js initialization into a `useEffect` with an empty dependency array so it only mounts once.
- Stored references to objects whose colors depend on the theme (`scene.fog`, `floor.material`, `grid.material`) inside a ref.
- Added a second `useEffect` that listens to `themeContext` changes to update only colors dynamically.
- Disabled `vertexColors` on `GridHelper` dynamically so its color can be changed freely from its material.

**Notes:**
- A dramatic lag during theme switching was caused by React tearing down the entire Three.js WebGL viewport and re-compiling all shaders from scratch when `themeContext` triggered the main effect hook. Now the scene effortlessly transitions colors.
