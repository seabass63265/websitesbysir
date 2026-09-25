import type { Slide } from "@/app/components/marketing/WorkSlider";

/**
 * The "Sliders" category's filter bar — each collection is its own image
 * set for the infinite vertical slider. Add a new collection here (label +
 * an array of `{ name, img }`, with images dropped in `public/work-slider/`)
 * and it shows up as a new filter tab automatically. An empty `slides`
 * array renders a "coming soon" placeholder instead of the slider.
 */
export type SliderCollection = {
  id: string;
  label: string;
  slides: Slide[];
};

export const sliderCollections: SliderCollection[] = [
  {
    id: "featured",
    label: "Featured",
    slides: [
      { name: "Modular Carousel", img: "/work-slider/component-01.mp4" },
      { name: "Team Marquee Slider", img: "/work-slider/component-02.mp4" },
      { name: "3D Orbit Slider", img: "/work-slider/component-03.mp4" },
      { name: "Overlapping Swiper", img: "/work-slider/component-04.mp4" },
      { name: "DetroitParis Infinite Slider", img: "/work-slider/component-05.mp4" },
      { name: "Crossroads Slideshow", img: "/work-slider/component-06.mp4" },
    ],
  },
  {
    id: "portraits",
    label: "Portraits",
    slides: [],
  },
  {
    id: "textures",
    label: "Textures",
    slides: [],
  },
];
