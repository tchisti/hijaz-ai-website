# Hijaz.ai — Homepage Motion Spec Sheet

A short, implementation-ready reference for designers and developers. Every
animation on the homepage is derived from one of the timing curves and
durations below. Deviating requires a design review.

---

## 1. Timing tokens

| Token             | Duration | Curve                         | Use                                                |
| ----------------- | -------- | ----------------------------- | -------------------------------------------------- |
| `motion.tap`      | 120 ms   | `ease-out`                    | Active states, taps, presses                       |
| `motion.hover`    | 240 ms   | `cubic-bezier(.16,1,.3,1)`    | Card lift, color, glow                             |
| `motion.reveal`   | 600 ms   | `cubic-bezier(.16,1,.3,1)`    | Section entry, fade-up + blur                      |
| `motion.count`    | 2000 ms  | `cubic-bezier(.16,1,.3,1)`    | KPI count-up                                       |
| `motion.parallax` | scroll   | `useTransform` linear         | Hero layered parallax (back / mid / front)         |
| `motion.ambient`  | 14–22 s  | `easeInOut`, infinite         | Background orbs, drift                             |

> All curves derive from the **expo-out** family `[0.16, 1, 0.3, 1]`. This
> keeps the site feeling cohesive and "decelerated" — never bouncy.

---

## 2. Hero — `<AIAutomationHero />`

### 2.1 Entrance

- `stagger.children = 120 ms`, `delayChildren = 200 ms`
- Each child fades from `{ opacity: 0, y: 28, blur: 8px }` → `0 / 0 / 0`
  over `motion.reveal` (600 ms).

### 2.2 Layered parallax (3 layers)

| Layer    | Element                            | Scroll → Y translate |
| -------- | ---------------------------------- | -------------------- |
| Back     | Ambient orbs + grid                | 0 → 60 px            |
| Mid      | Three.js scene / fallback image    | 0 → 120 px           |
| Front    | Headline, CTAs, stage chips        | 0 → 200 px           |

All three fade out together over `[0, 0.7]` of section scroll progress.

### 2.3 3D scene (Three.js)

- **Lazy load**: `next/dynamic({ ssr: false })`, gated by
  `viewport >= 768px && !prefers-reduced-motion && !saveData`.
- **DPR cap**: `[1, 1.6]` to protect retina-induced GPU spikes.
- **Camera**: fixed at `(0, 0.4, 8.5)`, FOV 42°. No user rotation.
- **Mouse parallax**: target rotation `mouse.x * 0.15`, `mouse.y * 0.08`,
  smoothed with 5% lerp per frame.
- **Node motion**:
  - Data cube: `Float speed=1.5`, rotation drift on Y/X axes.
  - Processing icosahedron: `pulse = 1 + sin(t * 2) * 0.06`.
  - Action panels: vertical bob `sin(t * 1.2 + delay) * 0.1`.
- **Particle streams**: 14 particles per connection, traveling on a
  quadratic Bézier with one mid-arc lift of 0.6 units. Opacity fades at
  endpoints via `sin(t * π)`.

### 2.4 Mobile fallback

- Static, optimized JPG (`/images/hero/ai-pipeline-fallback.jpg`).
- Same parallax tokens applied to the image; preserves visual hierarchy.
- All interactive elements remain reachable; no behavior loss.

---

## 3. KPI strip — `<KPIStrip />`

- Trigger: `useInView({ once: true, margin: "-100px" })`.
- Card entrance: `fade-up`, staggered by `index * 100 ms`.
- Count-up: `motion.count` (2 s, expo-out).
- Numbers respect `decimals` field; smaller values render integer-only.
- Hover: card glow ramps up over `motion.hover` (240 ms).

---

## 4. Service cards — `<ServicePipelineCards />`

### 4.1 Idle → hover/focus

| Property       | Idle               | Hover / focus                                   | Duration         |
| -------------- | ------------------ | ----------------------------------------------- | ---------------- |
| `transform`    | `translateY(0)`    | `translateY(-6px)`                              | 500 ms           |
| `box-shadow`   | flat               | `0 24px 60px -20px rgba(brand,0.35)`            | 500 ms           |
| Top accent     | opacity `0.4`      | opacity `1`                                     | 500 ms           |
| Icon           | scale `1`          | `scale(1.08) rotate(-4deg)`                     | 500 ms           |
| Detail panel   | `height: 0`        | `height: auto`                                  | 400 ms expo-out  |

- Triggers: pointer enter, focus-within (keyboard), touch tap (toggles).
- Card uses CSS transforms only (no layout thrashing). Detail panel uses
  Framer Motion's `height: auto` animation (GPU-accelerated where
  supported).

### 4.2 CTAs inside the card

- "Request demo" deep-links to `/contact?intent=demo&service=<id>` —
  one click, pre-filled form.
- `aria-controls` points to the detail panel's ID; `aria-expanded`
  reflects state.

---

## 5. Lottie micro-interactions

| Asset                       | Trigger                       | Loop  | Notes                                  |
| --------------------------- | ----------------------------- | ----- | -------------------------------------- |
| `/lottie/spark.json`        | Form submit success, KPI tick | once  | 60 frames @ 30 fps — 2 s total         |
| `/lottie/checkmark.json`    | Demo request confirmation     | once  | Reserved — to be added                 |
| `/lottie/loading-dots.json` | AI processing state           | yes   | Reserved — to be added                 |

Lottie files render at **24 px** (inline buttons) or **64 px** (modals).
Color is overridden via the JSON `c` channel at build time to match the
gold (`#C9A84C`) or cyan (`#52C1DC`) accent.

---

## 6. Accessibility rules (apply to every animation)

1. Honor `prefers-reduced-motion: reduce`:
   - Disable parallax (`y` transforms).
   - Skip 3D entirely; show static fallback.
   - Replace count-up with the final value rendered immediately.
2. All animated regions are `aria-hidden` if purely decorative.
3. Interactive expansions use `aria-expanded` + `aria-controls`.
4. Focus states use a 2 px gold ring at 50% opacity, 2 px offset.
5. No animation may cause layout shift (CLS). Animate transform / opacity
   only; reserve fixed dimensions for the hero canvas wrapper.

---

## 7. Deliverables checklist

- [x] Figma file: `Hijaz.ai — Homepage v2.fig` (frames: hero, KPIs,
      cards, mobile fallback). _Linked in shared workspace._
- [x] Lottie source: `/public/lottie/*.json`.
- [x] Motion spec: this document.
- [x] 3D scene source: `src/components/three/AIPipelineScene.tsx`.
- [x] Mobile fallback image: `/images/hero/ai-pipeline-fallback.jpg`.
