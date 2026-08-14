"use client";

import Link from "next/link";
import { useEffect } from "react";

export function LegacyRedirect({ to, label }: { to: string; label: string }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return (
    <main id="main-content" className="section-space surface-linen legacy-page">
      <div className="site-container centered-cta"><h1 className="display-l">This page has moved.</h1><p className="standfirst">Continue to {label}.</p><Link className="button button-primary" href={to}>Open {label}</Link></div>
    </main>
  );
}
