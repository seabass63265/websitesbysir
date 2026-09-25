"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VISIBLE_MS = 3200;
// Keep in sync with the .is-leaving animation duration in globals.css.
const EXIT_MS = 400;

/**
 * A small "fill this in to continue" toast. `notice.id` changes on every
 * trigger, so asking again while it's still up restarts the timer.
 * Rendered into <body> so the intake's zoom/transform wrappers can't
 * displace it. Only ever shown after a click, so `document` exists.
 */
export default function IntakeToast({
  notice,
  onDone,
}: {
  notice: { id: number; text: string } | null;
  onDone: () => void;
}) {
  // Which notice has started sliding away (by id, so a new one starts fresh).
  const [leavingId, setLeavingId] = useState<number | null>(null);

  useEffect(() => {
    if (!notice) return;
    const id = notice.id;
    const leave = window.setTimeout(() => setLeavingId(id), VISIBLE_MS);
    const done = window.setTimeout(onDone, VISIBLE_MS + EXIT_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, [notice, onDone]);

  if (!notice) return null;
  return createPortal(
    <div className="intake-toast-wrap" aria-live="polite">
      <div
        key={notice.id}
        role="status"
        className={
          leavingId === notice.id ? "intake-toast is-leaving" : "intake-toast"
        }
      >
        {notice.text}
      </div>
    </div>,
    document.body
  );
}
