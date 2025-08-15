import { prisma } from "@/lib/db";
import { get_current_user_id_optional } from "@/lib/user_state";

export async function fetch_entries() {
  const userId = await get_current_user_id_optional();
  if (!userId) return [];
  return prisma.showEntry.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
}
