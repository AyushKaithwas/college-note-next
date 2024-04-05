"use server";

import prisma from "@/lib/prisma";

export async function checkUpvote({
  email,
  noteId,
}: {
  email: string;
  noteId: number;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  const note = await prisma.noteUpvote.findMany({
    where: {
      AND: [{ userId: user.id }, { noteId: noteId }],
    },
  });
  console.log("note", note);
  console.log("userid", user.id);
  console.log("noteid", noteId);
  if (note[0]?.userId === user.id) {
    return true;
  }
  return false;
}
