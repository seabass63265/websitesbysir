/**
 * Wireframe thumbnails for the style-direction cards. Each is a tiny
 * browser mock drawn from hairline boxes and placeholder bars — inspiration,
 * not a template. Dim/placeholder tints come from `.intake-b-dim` /
 * `.intake-bg-ph` in globals.css.
 */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-44 border intake-b-dim mb-6 flex flex-col relative overflow-hidden shrink-0 bg-transparent">
      <div className="h-4 border-b-[1px] intake-b-dim flex items-center px-1.5 gap-1 shrink-0">
        <div className="w-1.5 h-1.5 border intake-b-dim" />
        <div className="w-1.5 h-1.5 border intake-b-dim" />
        <div className="w-1.5 h-1.5 border intake-b-dim" />
        <div className="h-1.5 w-16 border intake-b-dim mx-auto" />
      </div>
      {children}
    </div>
  );
}

function RetailPreview() {
  return (
    <Frame>
      <div className="flex-grow flex p-3 gap-3 relative">
        <div className="w-2/5 flex flex-col gap-2 pt-4">
          <div className="h-2 w-full intake-bg-ph" />
          <div className="h-2 w-3/4 intake-bg-ph" />
          <div className="h-2 w-5/6 intake-bg-ph" />
          <div className="h-4 w-12 border intake-b-dim mt-4" />
        </div>
        <div className="w-3/5 border intake-b-dim relative">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="15%" y1="20%" x2="85%" y2="20%" className="intake-stroke-med" strokeWidth="2" />
            <line x1="30%" y1="20%" x2="30%" y2="70%" className="intake-stroke-med" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="50%" y2="90%" className="intake-stroke-med" strokeWidth="2" />
            <line x1="70%" y1="20%" x2="70%" y2="60%" className="intake-stroke-med" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </Frame>
  );
}

function RepairPreview() {
  return (
    <Frame>
      <div className="h-4 border-b-[1px] intake-b-dim flex justify-end items-center px-2 gap-1.5 shrink-0">
        <div className="h-1 w-3 intake-bg-ph" />
        <div className="h-1 w-3 intake-bg-ph" />
        <div className="h-1 w-3 intake-bg-ph" />
        <div className="h-1 w-3 intake-bg-ph" />
      </div>
      <div className="flex h-20 border-b-[1px] intake-b-dim shrink-0">
        <div className="w-1/2 p-3 flex flex-col justify-center gap-2 border-r-[1px] intake-b-dim">
          <div className="h-2 w-full intake-bg-ph" />
          <div className="h-2 w-4/5 intake-bg-ph" />
          <div className="h-2 w-2/3 intake-bg-ph" />
        </div>
        <div className="w-1/2 relative" />
      </div>
      <div className="flex-grow p-2 flex gap-2">
        <div className="flex-1 border intake-b-dim relative" />
        <div className="flex-1 border intake-b-dim relative" />
        <div className="flex-1 border intake-b-dim relative" />
      </div>
    </Frame>
  );
}

function FoodPreview() {
  return (
    <Frame>
      <div className="h-6 border-b-[1px] intake-b-dim flex justify-between items-center px-3 shrink-0">
        <div className="h-2 w-8 border intake-b-dim" />
        <div className="flex gap-2">
          <div className="h-1 w-4 intake-bg-ph" />
          <div className="h-1 w-4 intake-bg-ph" />
          <div className="h-1 w-4 intake-bg-ph" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-4 px-3 gap-2 flex-grow">
        <div className="h-3 w-5/6 intake-bg-ph" />
        <div className="h-3 w-3/4 intake-bg-ph" />
        <div className="flex gap-3 mt-2">
          <div className="h-4 w-10 border intake-b-dim" />
          <div className="h-4 w-10 border intake-b-dim" />
        </div>
      </div>
      <div className="h-10 border-t-[1px] intake-b-dim relative shrink-0" />
    </Frame>
  );
}

function WellnessPreview() {
  return (
    <Frame>
      <div className="flex-grow flex flex-col items-center justify-center relative p-4 gap-4">
        <div className="w-16 h-16 rounded-full border intake-b-dim flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" className="intake-stroke-dim" fill="none" strokeWidth="2" />
          </svg>
        </div>
        <div className="h-2 w-1/2 intake-bg-ph" />
        <div className="h-2 w-1/3 intake-bg-ph" />
      </div>
    </Frame>
  );
}

function ProfessionalPreview() {
  return (
    <Frame>
      <div className="flex-grow flex">
        <div className="w-1/4 border-r-[1px] intake-b-dim p-2 flex flex-col gap-2">
          <div className="h-3 w-full border intake-b-dim mb-2" />
          <div className="h-1 w-full intake-bg-ph" />
          <div className="h-1 w-full intake-bg-ph" />
          <div className="h-1 w-full intake-bg-ph" />
        </div>
        <div className="w-3/4 p-3 flex flex-col gap-3">
          <div className="h-12 w-full border intake-b-dim relative" />
          <div className="h-2 w-full intake-bg-ph" />
          <div className="h-2 w-3/4 intake-bg-ph" />
        </div>
      </div>
    </Frame>
  );
}

function FitnessPreview() {
  return (
    <Frame>
      <div className="flex-grow flex flex-col">
        <div className="h-1/2 border-b-[1px] intake-b-dim relative overflow-hidden intake-bg-ph">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="100%" x2="100%" y2="0" className="intake-stroke-med" strokeWidth="4" />
            <line x1="20%" y1="100%" x2="120%" y2="0" className="intake-stroke-med" strokeWidth="4" />
            <line x1="-20%" y1="100%" x2="80%" y2="0" className="intake-stroke-med" strokeWidth="4" />
          </svg>
        </div>
        <div className="h-1/2 p-3 flex flex-col justify-center gap-3">
          <div className="h-4 w-full intake-bg-ph" />
          <div className="h-4 w-5/6 intake-bg-ph" />
        </div>
      </div>
    </Frame>
  );
}

export const stylePreviews = {
  retail: RetailPreview,
  repair: RepairPreview,
  food: FoodPreview,
  wellness: WellnessPreview,
  professional: ProfessionalPreview,
  fitness: FitnessPreview,
} as const;

export type StylePreviewKey = keyof typeof stylePreviews;
