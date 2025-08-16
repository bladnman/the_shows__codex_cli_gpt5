import StyleProbe from "@/app/debug-style/features/style_probe/StyleProbe";

export const dynamic = 'force-dynamic';

export default async function DebugStylePage() {
  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)] space-y-[var(--space-6)]">
      <h1 className="text-2xl font-bold">Style Debug</h1>
      <p className="text-sm text-[color:var(--color-muted-foreground)]">This page verifies CSS variable values and Tailwind utilities are active.</p>
      <StyleProbe />
    </div>
  );
}

