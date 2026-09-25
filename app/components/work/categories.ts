/**
 * The /work page's category list — each pillar of animation/interaction
 * work. Hero Animations leads (it's the default selection); the rest follow
 * the reference library's alphabetical order.
 * Most are placeholders until a reference demo gets ported in for them
 * (see CategorySection's `PlaceholderDemo`); "hasDemo" marks the ones
 * already wired to a real component.
 */
export type WorkCategory = {
  number: string;
  title: string;
  slug: string;
  hasDemo: boolean;
};

export const workCategories: WorkCategory[] = [
  {
    number: "01",
    title: "Hero Animations",
    slug: "hero-animations",
    hasDemo: false,
  },
  {
    number: "02",
    title: "3D Animation",
    slug: "3d-animation",
    hasDemo: false,
  },
  {
    number: "03",
    title: "Background Animations",
    slug: "background-animations",
    hasDemo: false,
  },
  {
    number: "04",
    title: "Grid Animations",
    slug: "grid-animations",
    hasDemo: false,
  },
  {
    number: "05",
    title: "Hover Effects",
    slug: "hover-effects",
    hasDemo: false,
  },
  {
    number: "06",
    title: "Mouse Effects",
    slug: "mouse-effects",
    hasDemo: true,
  },
  {
    number: "07",
    title: "Navigation Menus",
    slug: "navigation-menus",
    hasDemo: false,
  },
  {
    number: "08",
    title: "Page Transitions",
    slug: "page-transitions",
    hasDemo: false,
  },
  {
    number: "09",
    title: "Physics Effects",
    slug: "physics-effects",
    hasDemo: false,
  },
  {
    number: "10",
    title: "Scroll Animation",
    slug: "scroll-animation",
    hasDemo: false,
  },
  {
    number: "11",
    title: "Sliders",
    slug: "sliders",
    hasDemo: true,
  },
  {
    number: "12",
    title: "SVG Animations",
    slug: "svg-animations",
    hasDemo: false,
  },
  {
    number: "13",
    title: "Text Animations",
    slug: "text-animations",
    hasDemo: false,
  },
  {
    number: "14",
    title: "Webgl & ThreeJS Effects",
    slug: "webgl-threejs-effects",
    hasDemo: false,
  },
];
