"use client";
import { useTransition } from "react";

export default function RateControl({ action, initial }: { action: (rating: number) => Promise<void>; initial?: number | null }) {
  const [isPending, start] = useTransition();
  return (
    <div className="flex items-center gap-[var(--space-2)]">
      <label className="text-sm text-[color:var(--color-muted-foreground)]">Your Rating</label>
      <select
        defaultValue={initial ?? 0}
        onChange={(e) => start(() => action(parseInt(e.target.value, 10)))}
        disabled={isPending}
        className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-2)] py-[var(--space-1)]"
      >
        <option value={0}>—</option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}

