"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function RouteCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPlaying(false);
    const frame = requestAnimationFrame(() => setPlaying(true));
    const timeout = window.setTimeout(() => setPlaying(false), 850);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return <div className="route-curtain" data-playing={playing} aria-hidden="true" />;
}
