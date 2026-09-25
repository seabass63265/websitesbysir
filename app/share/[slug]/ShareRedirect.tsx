"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Sends whoever opens a `/share/<name>` link on to the homepage. */
export default function ShareRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <noscript>
      <meta httpEquiv="refresh" content="0;url=/" />
      <Link href="/">Continue to SIR_ Websites</Link>
    </noscript>
  );
}
