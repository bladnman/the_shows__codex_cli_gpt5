import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// Safe for Server Components: read-only cookie access.
export async function get_current_user_id_optional(): Promise<string | null> {
  const store = await cookies();
  const key = "anonId";
  return store.get(key)?.value ?? null;
}

export async function get_entry(userId: string | null, tmdbId: number, mediaType: "movie"|"tv") {
  if (!userId) return null;
  return prisma.showEntry.findUnique({ where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } } });
}
