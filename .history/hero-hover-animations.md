# Hero Section — Button Hover Avatar Animations

> **Date** : 2026-03-22
> **Status** : 🟡 En attente des assets (vidéos + images)

---

## 🎯 Concept

Ajouter des **animations d'avatar réactives au hover** sur les deux boutons CTA de la Hero section. Chaque bouton déclenche une animation unique de l'avatar 3D.

## 🔄 Flux d'animation

```
Idle → [retour frame 1 si nécessaire] → Animation bouton → Loop fin → [hover out] → Reverse → Frame 1 → Idle
```

### Détails du flux :

1. **État normal** — L'avatar joue son animation **idle** en boucle
2. **Hover sur un bouton** :
   - Si idle **n'est pas** sur le **frame 1**, revenir au frame 1 d'abord
   - Jouer l'**animation de transition** spécifique au bouton (frame 1 → end frame)
   - Une fois terminée, **boucler** sur quelques frames de fin (loop d'attente)
3. **Cursor quitte le bouton** :
   - Jouer l'animation **en reverse** jusqu'au frame 1
   - Retourner à l'animation idle

### 🔑 Point clé
Le **frame 1 est le frame pivot partagé** — identique pour toutes les animations de boutons. C'est le point de transition entre idle ↔ animations de hover.

---

## 🎬 Les deux animations

### Bouton 1 : "Voir mes projets" (View Work)
- **Objet** : 📱 Tablette
- **Action** : Le personnage prend une tablette et la présente fièrement, bras tendu avec la paume ouverte, comme s'il montrait son portfolio
- **Loop** : Maintient la pose avec micro-mouvements subtils (respiration, léger balancement)

### Bouton 2 : "Me contacter" (Get In Touch)
- **Objet** : ☎️ Téléphone fixe vintage (rotatif)
- **Action** : Un téléphone vintage apparaît sur une petite table à côté. Le personnage décroche le combiné, le porte à l'oreille, et fait un thumbs up en souriant
- **Loop** : Maintient la pose téléphone + thumbs up avec micro-mouvements subtils

---

## 📁 Structure des dossiers

```
public/avatar/
  ├── idle/                    (36 frames — existant ✅)
  ├── scroll/                  (96 frames — existant ✅)
  ├── action/                  (72 frames — existant ✅)
  ├── hover_projects/          ← NOUVEAU (transition: frame 1 → end frame)
  ├── hover_projects_loop/     ← NOUVEAU (loop: end frame → end frame)
  ├── hover_contact/           ← NOUVEAU (transition: frame 1 → end frame)
  └── hover_contact_loop/      ← NOUVEAU (loop: end frame → end frame)
```

---

## 🛠️ Pipeline de production

1. **Nano Banana 2** — Générer les end frames (images) avec le modèle 3D uploadé
2. **Veo 3** — Générer les vidéos (2 par bouton = 4 vidéos total)
   - Vidéo transition : first frame → end frame (~2s)
   - Vidéo loop : end frame → end frame (~3s, seamless)
3. **FFmpeg** — Extraire les frames en WebP via `/process-avatar-video` workflow
4. **Code** — Implémenter la logique hover dans `Hero.js`

---

## 📝 Notes d'implémentation

- Green screen : `#00b140`
- Format des frames : WebP avec transparence
- FPS recommandé : ~10 FPS (cohérent avec idle/action existants)
- Le code utilisera les mêmes helpers `buildFramePaths`, `drawFrame`, `startLoop` existants dans `Hero.js`
- Ajouter des `onMouseEnter` et `onMouseLeave` sur `PrimaryBtn` et `SecondaryBtn`
- Gérer les interruptions (hover rapide entre les deux boutons)

---

## Related Files
- `src/components/sections/Hero.js` — Composant principal à modifier
- `.agent/workflows/process-avatar-video.md` — Workflow FFmpeg pour traiter les vidéos
- `scripts/remove-hover-watermark.js` — Script Node.js pour supprimer le filigrane Veo.
- `scripts/thin-hover-frames.js` — Script pour réduire le framerate (optimisation).

---

## 2026-03-23 - Implémentation des Hover Animations

**Modified Files:**
- `src/components/sections/Hero.js` - Ajout de la logique de chargement et de gestion d'état des 4 séquences d'animation hover.
- `.agent/workflows/process-avatar-video.md` - Mise à jour de la documentation du workflow.

**New Files (Scripts):**
- `scripts/remove-hover-watermark.js` - Script in-place pour retirer le filigrane "Veo"
- `scripts/thin-hover-frames.js` - Divise le nombre de frames par 2 pour la performance (96 au lieu de 192).

**What Was Done:**
- Extraction de 4 vidéos d'animation en PNG puis WebP (green screen supprimé).
- Suppression du filigrane vidéo Veo pixel par pixel de façon propre en bas à droite de chaque frame WebP existante.
- Chargement reporté ("lowest priority") des frames de hover via `requestIdleCallback` pour ne pas impacter le temps de chargement initial de la page ou les animations primaires.
- Blocked the hover animations entirely when users are scrolling, passing priority back to the default scroll-driven playback.
- Optimization des frames : rééchantillonnage de la vidéo source à 9 FPS via FFmpeg pour obtenir exactement 72 images par animation. Les tableaux font 72 images chacun tout en conservant 24 FPS (vitesse x2.6 au survol, 3 secondes d'animation).

**Notes:**
- `hoverCancelRef` est utilisé comme token pour invalider/interrompre les requêtes frame-par-frame en cas de changement rapide de bouton ou de reprise du scroll.
- Les animations de survol sont désactivées sur mobile (`isMobile` check).
