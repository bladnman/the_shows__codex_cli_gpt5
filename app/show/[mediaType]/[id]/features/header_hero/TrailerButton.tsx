"use client";

import { useState } from "react";

export default function TrailerButton({ youtubeKey, disabled }: { youtubeKey?: string; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const url = youtubeKey ? `https://www.youtube.com/embed/${youtubeKey}` : undefined;
  return (
    <>
      <button
        aria-disabled={disabled}
        onClick={() => !disabled && setOpen(true)}
        className={`px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-md)] text-sm border transition-colors ${disabled ? "opacity-50 cursor-not-allowed border-[color:var(--color-border)]" : "border-[color:var(--color-border)] hover:border-[color:var(--color-accent)]"}`}
      >
        Watch Trailer
      </button>
      {open && url ? (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-[var(--space-4)]" onClick={() => setOpen(false)}>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-[var(--radius-lg)] overflow-hidden border border-[color:var(--color-border)]" onClick={(e) => e.stopPropagation()}>
            <iframe
              title="Trailer"
              src={`${url}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

