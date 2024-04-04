"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { type Note, type UserWithNotes } from "@/types";
import { authOptions } from "@/lib/auth";

export async function getUsersNotes(
  pageSize: number,
  page: number
): Promise<Note[] | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  const userWithNotes: UserWithNotes | null = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      notes: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          time: "desc", // This will order the notes by time in descending order
        },
      },
    },
  });
  if (!userWithNotes) {
    return null;
  }
  return userWithNotes.notes;
}
