import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full px-[var(--space-5)] py-[var(--space-4)] sm:px-[var(--space-8)] border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/90 backdrop-blur">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-[var(--space-4)]">
        <Link href="/" className="text-lg font-bold">The Shows</Link>
        <form action="/search" className="flex items-center gap-[var(--space-2)]">
          <input
            aria-label="Search"
            name="q"
            placeholder="Search movies and TV"
            className="w-full bg-white border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ring)] text-[color:var(--color-foreground)]"
          />
        </form>
        <div className="flex items-center gap-[var(--space-3)]">
          <nav className="hidden sm:flex text-sm items-center gap-[var(--space-4)]">
            <Link className="hover:underline" href="/collections">Collections</Link>
          </nav>
          <div aria-label="Profile" title="Profile" className="w-8 h-8 rounded-[var(--radius-full)] bg-[color:var(--color-muted)] border border-[color:var(--color-border)]" />
        </div>
      </div>
    </header>
  );
}
