"use server";

import prisma from "@/lib/prisma";
import { checkUpvote } from "./check-upvote";

export async function upvoteNote({
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
  const isUpvoted = await checkUpvote({ userId, noteId });
  const noteUpvoteData = {
    noteId: noteId,
    userId: userId,
  };
  const note = await prisma.note.updateMany({
    where: {
      id: noteId,
    },
    data: {
      noOfUpvotes: {
        increment: isUpvoted ? -1 : 1,
      },
    },
  });
  if (isUpvoted) {
    const noteUpvote = await prisma.noteUpvote.deleteMany({
      where: {
        noteId: noteId,
        userId: userId,
      },
    });
    return noteUpvote;
  } else {
    const noteUpvote = await prisma.noteUpvote.create({
      data: noteUpvoteData,
    });
    return noteUpvote;
  }
}
