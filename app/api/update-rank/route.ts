import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const allNotes = await prisma.note.findMany({
    orderBy: {
      time: "desc",
    },
  });
  interface NoteCreator {
    [key: string]: number;
  }
  const noteCreators: NoteCreator = {};
  allNotes.forEach((note) => {
    if (!noteCreators[note.userId]) {
      noteCreators[note.userId] = note.noOfUpvotes;
    } else {
      noteCreators[note.userId] += note.noOfUpvotes;
    }
  });

  const sortedNoteCreatorsMap = new Map<string, number>(
    Object.entries(noteCreators).sort((a, b) => b[1] - a[1])
  );
  const sortedNoteCreatorsArray = Array.from(
    sortedNoteCreatorsMap,
    ([id, upvotes]) => ({
      id,
      upvotes,
    })
  );
  sortedNoteCreatorsArray.forEach(async (noteCreator) => {
    const user = await prisma.user.update({
      where: {
        id: noteCreator.id,
      },
      data: {
        rank: sortedNoteCreatorsArray.indexOf(noteCreator) + 1,
      },
    });
    console.log(user);
  });
  return NextResponse.json({ sortedNoteCreatorsArray });
}
