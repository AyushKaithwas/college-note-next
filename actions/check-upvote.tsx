"use server";

import prisma from "@/lib/prisma";

export async function checkUpvote({
  userId,
  noteId,
}: {
  userId: string;
  noteId: number;
}) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return null;
  }
  const noteUpvoteData = {
    noteId: noteId,
    userId: userId,
  };
  const note = await prisma.noteUpvote.findMany({
    where: {
      noteId: noteId,
      userId: userId,
    },
  });
  if (note[0]?.userId === user.id) {
    return true;
  }
  return false;
}
