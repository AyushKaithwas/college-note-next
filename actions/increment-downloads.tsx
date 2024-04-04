"use server";

import prisma from "@/lib/prisma";

export async function incrementDownloads(noteId: number) {
  const downloads = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      downloads: {
        increment: 1,
      },
    },
  });
  return downloads;
}
