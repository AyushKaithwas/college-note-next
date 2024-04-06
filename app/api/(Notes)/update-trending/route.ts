import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 7)
    );

    const notesWithMostUpvotes = await prisma.note.findMany({
      where: {
        upvotes: {
          some: {
            createdAt: {
              gte: sevenDaysAgo,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            upvotes: {
              where: {
                createdAt: {
                  gte: sevenDaysAgo,
                },
              },
            },
          },
        },
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    const notesWithMostUpvotesNewSchema = notesWithMostUpvotes.map(
      ({ noOfUpvotes, _count, ...rest }) => ({
        noOfUpvotes: _count.upvotes,
        ...rest,
      })
    );

    // Delete current trending notes
    await prisma.trendingNote.deleteMany({});

    // Insert new trending notes
    await prisma.trendingNote.createMany({
      data: notesWithMostUpvotesNewSchema,
    });

    return NextResponse.json(
      { Success: "Trending Notes table updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    // Determine error type to send appropriate response
    if (err) {
      // Known request error (e.g., a unique constraint failed)
      // Respond with 400 Bad Request or other appropriate status code
      return NextResponse.json({ Error: "Request error" }, { status: 400 });
    } else if (err) {
      // Validation error (e.g., missing required fields, type errors)
      return NextResponse.json({ Error: "Validation error" }, { status: 400 });
    } else {
      // Unknown error
      return NextResponse.json(
        { Error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
