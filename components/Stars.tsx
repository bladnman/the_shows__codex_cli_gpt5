"use client";
import { useMemo } from "react";

export function Stars({ value, max = 5, size = 16, className = "" }: { value: number; max?: number; size?: number; className?: string }) {
  const full = Math.floor((value / 10) * max); // TMDB is 0-10
  const half = (value / 10) * max - full >= 0.5;
  const empty = max - full - (half ? 1 : 0);
  const items = useMemo(() => (
    [
      ...Array(full).fill("full"),
      ...(half ? ["half"] : []),
      ...Array(empty).fill("empty"),
    ] as ("full"|"half"|"empty")[]
  ), [full, half, empty]);

  return (
    <div className={`inline-flex items-center gap-[var(--space-1)] ${className}`.trim()} aria-label={`Rating ${value} out of 10`}>
      {items.map((t, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={`half-${i}`} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            fill={t === "full" ? "var(--color-accent)" : t === "half" ? `url(#half-${i})` : "none"}
            stroke="var(--color-accent)"
          />
        </svg>
      ))}
    </div>
  );
}

