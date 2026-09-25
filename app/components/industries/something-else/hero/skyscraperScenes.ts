import type { TextPosition } from "@/app/components/industries/heroConfig";

/**
 * The camera flight and captions for the skyscraper hero: one entry per
 * stop, with `scrollProgress` as the share (0–100) of the pinned scroll it
 * covers. Camera/target/timing come from the Codrops demo; the words are for
 * Something Else.
 */
export type SkyscraperScene = {
  title: string;
  subtitle: string;
  position: TextPosition;
  camera: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  scrollProgress: { start: number; end: number };
  /** Transition stop with no caption. */
  hideText?: boolean;
};

export const skyscraperScenes: SkyscraperScene[] = [
  {
    title: "ANYTHING",
    subtitle: "If you can imagine it",
    position: "center",
    camera: { x: 0, y: 2, z: 10 },
    target: { x: 0, y: 5, z: 0 },
    scrollProgress: { start: 0, end: 11.9 },
  },
  {
    title: "CUSTOM",
    subtitle: "Built around your idea",
    position: "left",
    camera: { x: 3, y: 8, z: 10 },
    target: { x: 0, y: 10, z: 0 },
    scrollProgress: { start: 11.9, end: 23.7 },
  },
  {
    title: "UNIQUE",
    subtitle: "Never from a template",
    position: "right",
    camera: { x: -10, y: 15, z: 0 },
    target: { x: 0, y: 15, z: 0 },
    scrollProgress: { start: 23.7, end: 35.6 },
  },
  {
    title: "CONNECTED",
    subtitle: "Your tools, working together",
    position: "top-left",
    camera: { x: -10, y: 22, z: 0 },
    target: { x: 0, y: 25, z: 0 },
    scrollProgress: { start: 35.6, end: 45.8 },
  },
  {
    title: "",
    subtitle: "",
    position: "top-right",
    camera: { x: 5, y: 35, z: 5 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 45.8, end: 52.5 },
    hideText: true,
  },
  {
    title: "FOUND",
    subtitle: "Search and discovery, handled",
    position: "center",
    camera: { x: 5, y: 30, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 52.5, end: 62.7 },
  },
  {
    title: "MOBILE",
    subtitle: "Flawless on every screen",
    position: "bottom-right",
    camera: { x: 5, y: 25, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 62.7, end: 69.5 },
  },
  {
    title: "SUPPORTED",
    subtitle: "We are here after launch",
    position: "bottom-left",
    camera: { x: 15, y: 20, z: 5 },
    target: { x: 0, y: 24, z: 0 },
    scrollProgress: { start: 69.5, end: 77.9 },
  },
  {
    title: "LIMITLESS",
    subtitle: "No idea too unusual",
    position: "top",
    camera: { x: 25, y: 15, z: 0 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 77.9, end: 84.7 },
  },
  {
    title: "SIR_",
    subtitle: "Puts your idea online.",
    position: "center",
    camera: { x: 20, y: 20, z: -10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 84.7, end: 100 },
  },
];
