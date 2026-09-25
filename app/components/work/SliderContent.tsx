import WorkSlider from "@/app/components/marketing/WorkSlider";
import { PlaceholderDemo } from "@/app/components/work/CategorySection";
import { sliderCollections } from "@/app/components/work/sliderCollections";

/**
 * The "Sliders" category's visual — just the slider or its placeholder for
 * whichever collection is active. The collection filter pills themselves
 * render inside `WorkShowcase`'s own overlay (see `sliderCollections` for
 * the picker's data), so this only needs the id to look up.
 */
export default function SliderContent({
  collectionId,
  glideIn,
}: {
  collectionId: string;
  glideIn?: boolean;
}) {
  const active =
    sliderCollections.find((collection) => collection.id === collectionId) ??
    sliderCollections[0];

  return active.slides.length > 0 ? (
    <WorkSlider key={active.id} slides={active.slides} glideIn={glideIn} />
  ) : (
    <PlaceholderDemo title={active.label} />
  );
}
