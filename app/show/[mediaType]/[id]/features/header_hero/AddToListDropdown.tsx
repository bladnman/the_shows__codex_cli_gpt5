"use client";
import { useState } from "react";

export default function AddToListDropdown() {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Add to List");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)] font-medium"
      >
        {label} ▾
      </button>
      {open ? (
        <div className="absolute z-10 mt-[var(--space-2)] min-w-[200px] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow">
          {[
            { key: "high", text: "Highly Excited" },
            { key: "mid", text: "Excited" },
            { key: "norm", text: "Normal" },
          ].map((opt) => (
            <button
              key={opt.key}
              className="w-full text-left px-[var(--space-3)] py-[var(--space-2)] hover:bg-[color:var(--color-muted)]"
              onClick={() => { setLabel(opt.text); setOpen(false); }}
            >
              {opt.text}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

