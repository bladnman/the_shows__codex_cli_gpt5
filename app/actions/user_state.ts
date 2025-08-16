"use server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getOrCreateAnonId() {
  const store = await cookies();
  const key = "anonId";
  const existing = store.get(key)?.value;
  if (existing) return existing;
  const id = crypto.randomUUID();
  store.set(key, id, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
  return id;
}

async function getUserId(): Promise<string> {
  const anonId = await getOrCreateAnonId();
  // Ensure user exists
  const user = await prisma.user.upsert({
    where: { id: anonId },
    update: {},
    create: { id: anonId },
  });
  return user.id;
}

export async function toggleWatchlist(tmdbId: number, mediaType: "movie"|"tv") {
  const userId = await getUserId();
  const existing = await prisma.showEntry.findUnique({ where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } } });
  if (!existing) {
    await prisma.showEntry.create({ data: { userId, tmdbId, mediaType, watchlist: true } });
  } else {
    await prisma.showEntry.update({ where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } }, data: { watchlist: !existing.watchlist } });
  }
  // Update homepage cards and the current detail page
  revalidatePath("/");
  revalidatePath(`/show/${mediaType}/${tmdbId}`);
}

export async function markWatched(tmdbId: number, mediaType: "movie"|"tv") {
  const userId = await getUserId();
  await prisma.showEntry.upsert({
    where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } },
    create: { userId, tmdbId, mediaType, watchedAt: new Date(), watchlist: false },
    update: { watchedAt: new Date(), watchlist: false },
  });
  revalidatePath(`/show/${mediaType}/${tmdbId}`);
}

export async function setRating(tmdbId: number, mediaType: "movie"|"tv", rating: number) {
  const userId = await getUserId();
  const n = Math.round(rating);
  if (n <= 0) {
    // Clear rating
    await prisma.showEntry.upsert({
      where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } },
      create: { userId, tmdbId, mediaType, rating: null },
      update: { rating: null },
    });
  } else {
    const r = Math.max(1, Math.min(10, n));
    await prisma.showEntry.upsert({
      where: { userId_tmdbId_mediaType: { userId, tmdbId, mediaType } },
      create: { userId, tmdbId, mediaType, rating: r },
      update: { rating: r },
    });
  }
  revalidatePath(`/show/${mediaType}/${tmdbId}`);
}
