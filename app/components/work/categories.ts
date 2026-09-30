/**
 * The /work page's category list — each pillar of animation/interaction
 * work. Hero Animations leads (it's the default selection); the rest follow
 * the reference library's alphabetical order.
 * Most are placeholders until a reference demo gets ported in for them
 * (see CategorySection's `PlaceholderDemo`); "hasDemo" marks the ones
 * already wired to a real component. `titleEs` is the Spanish copy —
 * consuming client components pick `title`/`titleEs` via `useT()`.
 */
export type WorkCategory = {
  number: string;
  title: string;
  titleEs: string;
  slug: string;
  hasDemo: boolean;
};

/** "All Features" sentinel — not a real category, same idea as
 * ALL_BUSINESSES_SLUG in businessCategories.ts. */
export const ALL_FEATURES_SLUG = "all";

export const workCategories: WorkCategory[] = [
  {
    number: "01",
    title: "Hero Animations",
    titleEs: "Animaciones Hero",
    slug: "hero-animations",
    hasDemo: false,
  },
  {
    number: "02",
    title: "3D Animation",
    titleEs: "Animación 3D",
    slug: "3d-animation",
    hasDemo: false,
  },
  {
    number: "03",
    title: "Background Animations",
    titleEs: "Animaciones de Fondo",
    slug: "background-animations",
    hasDemo: false,
  },
  {
    number: "04",
    title: "Grid Animations",
    titleEs: "Animaciones de Cuadrícula",
    slug: "grid-animations",
    hasDemo: false,
  },
  {
    number: "05",
    title: "Hover Effects",
    titleEs: "Efectos al Pasar el Cursor",
    slug: "hover-effects",
    hasDemo: false,
  },
  {
    number: "06",
    title: "Mouse Effects",
    titleEs: "Efectos del Mouse",
    slug: "mouse-effects",
    hasDemo: true,
  },
  {
    number: "07",
    title: "Navigation Menus",
    titleEs: "Menús de Navegación",
    slug: "navigation-menus",
    hasDemo: false,
  },
  {
    number: "08",
    title: "Page Transitions",
    titleEs: "Transiciones de Página",
    slug: "page-transitions",
    hasDemo: false,
  },
  {
    number: "09",
    title: "Physics Effects",
    titleEs: "Efectos de Física",
    slug: "physics-effects",
    hasDemo: false,
  },
  {
    number: "10",
    title: "Scroll Animation",
    titleEs: "Animación de Desplazamiento",
    slug: "scroll-animation",
    hasDemo: false,
  },
  {
    number: "11",
    title: "Sliders",
    titleEs: "Deslizadores",
    slug: "sliders",
    hasDemo: true,
  },
  {
    number: "12",
    title: "SVG Animations",
    titleEs: "Animaciones SVG",
    slug: "svg-animations",
    hasDemo: false,
  },
  {
    number: "13",
    title: "Text Animations",
    titleEs: "Animaciones de Texto",
    slug: "text-animations",
    hasDemo: false,
  },
  {
    number: "14",
    title: "Webgl & ThreeJS Effects",
    titleEs: "Efectos WebGL y ThreeJS",
    slug: "webgl-threejs-effects",
    hasDemo: false,
  },
];
