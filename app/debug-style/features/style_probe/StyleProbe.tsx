"use client";
import { useEffect, useMemo, useState } from "react";

function getVar(name: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function StyleProbe() {
  const [vars, setVars] = useState<Record<string, string>>({});
  useEffect(() => {
    const names = [
      "--color-background",
      "--color-foreground",
      "--color-accent",
      "--color-border",
      "--space-3",
      "--radius-md",
    ];
    const out: Record<string, string> = {};
    names.forEach((n) => (out[n] = getVar(n)));
    setVars(out);
  }, []);

  return (
    <div className="space-y-[var(--space-4)]">
      <div>
        <div className="text-sm text-[color:var(--color-muted-foreground)]">Token sample</div>
        <pre className="mt-[var(--space-2)] text-xs bg-[color:var(--color-muted)]/30 border border-[color:var(--color-border)] rounded-[var(--radius-md)] p-[var(--space-3)]">
{JSON.stringify(vars, null, 2)}
        </pre>
      </div>
      <div>
        <div className="text-sm text-[color:var(--color-muted-foreground)]">Tailwind utilities check</div>
        <div className="mt-[var(--space-2)] flex items-center gap-4">
          <div className="w-16 h-8 bg-[color:var(--color-accent)]"></div>
          <div className="w-16 h-8 border border-[color:var(--color-border)]"></div>
          <div className="w-16 h-8 rounded-[var(--radius-md)] bg-[color:var(--color-muted)]"></div>
          <div className="text-xs px-2 py-1 rounded-[var(--radius-full)] bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)]">Badge</div>
        </div>
      </div>
    </div>
  );
}

