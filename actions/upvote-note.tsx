"use server";

import prisma from "@/lib/prisma";
import { checkUpvote } from "./check-upvote";

export async function upvoteNote({
  email,
  noteId,
}: {
  email: string;
  noteId: number;
}) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return null;
  }
  const isUpvoted = await checkUpvote({ email: user.email, noteId });
  const noteUpvoteData = {
    noteId: noteId,
    userId: user.id,
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
        userId: user.id,
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
