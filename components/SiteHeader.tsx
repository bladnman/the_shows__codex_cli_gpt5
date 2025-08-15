import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full px-[var(--space-5)] py-[var(--space-4)] sm:px-[var(--space-8)] border-b border-[color:var(--color-border)]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-[var(--space-4)]">
        <Link href="/" className="text-lg font-bold">The Shows</Link>
        <nav className="text-sm flex items-center gap-[var(--space-4)]">
          <Link className="hover:underline" href="/search">Search</Link>
          <Link className="hover:underline" href="/collections">Collections</Link>
        </nav>
        <form action="/search" className="hidden md:flex items-center gap-[var(--space-2)] min-w-[280px]">
          <input
            aria-label="Quick search"
            name="q"
            placeholder="Search movies and TV"
            className="flex-1 min-w-0 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ring)]"
          />
        </form>
      </div>
    </header>
  );
}

