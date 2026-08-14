"use client";

import { useId, useState, type ReactNode } from "react";

export function Disclosure({ title, children }: { title: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{title}</span>
        <span className="disclosure__mark" aria-hidden="true" />
      </button>
      <div id={id} className="disclosure__content" data-open={open}>
        <div className="disclosure__inner">
          <div className="disclosure__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
