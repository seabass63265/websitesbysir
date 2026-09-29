import type { TextPosition } from "@/app/components/industries/heroConfig";

/**
 * The camera flight and captions for the skyscraper hero: one entry per
 * stop, with `scrollProgress` as the share (0–100) of the pinned scroll it
 * covers. Camera/target/timing come from the Codrops demo; the words are for
 * Something Else. `buildSkyscraperScenes(t)` is called from the component
 * with its `useT()` so the captions can switch language live.
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

export function buildSkyscraperScenes(
  t: (en: string, es: string) => string
): SkyscraperScene[] {
  return [
    {
      title: t("ANYTHING", "CUALQUIER COSA"),
      subtitle: t("If you can imagine it", "Si lo puedes imaginar"),
      position: "center",
      camera: { x: 0, y: 2, z: 10 },
      target: { x: 0, y: 5, z: 0 },
      scrollProgress: { start: 0, end: 11.9 },
    },
    {
      title: t("CUSTOM", "PERSONALIZADO"),
      subtitle: t("Built around your idea", "Construido alrededor de tu idea"),
      position: "left",
      camera: { x: 3, y: 8, z: 10 },
      target: { x: 0, y: 10, z: 0 },
      scrollProgress: { start: 11.9, end: 23.7 },
    },
    {
      title: t("UNIQUE", "ÚNICO"),
      subtitle: t("Never from a template", "Nunca de una plantilla"),
      position: "right",
      camera: { x: -10, y: 15, z: 0 },
      target: { x: 0, y: 15, z: 0 },
      scrollProgress: { start: 23.7, end: 35.6 },
    },
    {
      title: t("CONNECTED", "CONECTADO"),
      subtitle: t("Your tools, working together", "Tus herramientas, trabajando juntas"),
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
      title: t("FOUND", "ENCONTRADO"),
      subtitle: t("Search and discovery, handled", "Búsqueda y descubrimiento, resueltos"),
      position: "center",
      camera: { x: 5, y: 30, z: 10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 52.5, end: 62.7 },
    },
    {
      title: t("MOBILE", "MÓVIL"),
      subtitle: t("Flawless on every screen", "Impecable en cada pantalla"),
      position: "bottom-right",
      camera: { x: 5, y: 25, z: 10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 62.7, end: 69.5 },
    },
    {
      title: t("SUPPORTED", "RESPALDADO"),
      subtitle: t("We are here after launch", "Estamos aquí después del lanzamiento"),
      position: "bottom-left",
      camera: { x: 15, y: 20, z: 5 },
      target: { x: 0, y: 24, z: 0 },
      scrollProgress: { start: 69.5, end: 77.9 },
    },
    {
      title: t("LIMITLESS", "SIN LÍMITES"),
      subtitle: t("No idea too unusual", "Ninguna idea demasiado inusual"),
      position: "top",
      camera: { x: 25, y: 15, z: 0 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 77.9, end: 84.7 },
    },
    {
      title: "SIR_",
      subtitle: t("Puts your idea online.", "Pone tu idea en línea."),
      position: "center",
      camera: { x: 20, y: 20, z: -10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 84.7, end: 100 },
    },
  ];
}
