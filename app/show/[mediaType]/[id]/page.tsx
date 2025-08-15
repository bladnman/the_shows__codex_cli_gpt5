import ShowDetails from "@/app/show/[mediaType]/[id]/features/details/ShowDetails";
import Link from "next/link";
export const dynamic = 'force-dynamic';

export default async function ShowPage({ params }: { params: Promise<{ mediaType: "movie"|"tv"; id: string }> }) {
  const { mediaType, id } = await params;
  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)]">
      <header className="flex items-center justify-between mb-[var(--space-6)]">
        <h1 className="text-2xl font-bold capitalize">{mediaType}</h1>
        <nav className="text-sm">
          <Link className="hover:underline" href="/">Home</Link>
        </nav>
      </header>
      <ShowDetails mediaType={mediaType} id={id} />
    </div>
  );
}
