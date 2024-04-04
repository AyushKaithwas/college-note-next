import { type NextRequest, NextResponse } from "next/server";
import axios, { type AxiosResponse } from "axios";
import prisma from "@/lib/prisma";

interface Payload {
  title: string;
  description: string;
  institution: string;
  fieldOfStudy: string;
  semester: string;
  subject: string;
  size: number;
  url: string;
  userEmail: string;
}

interface ApiResponse {
  url: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = (await req.json()) as Payload;
  const user = await prisma.user.findUnique({
    where: {
      email: res.userEmail,
    },
  });
  if (!user) {
    return NextResponse.json(
      { Error: "User does not exist, login or register" },
      { status: 400 }
    );
  }

  const noteDataDb = {
    userId: user.id,
    title: res.title,
    desc: res.description,
    institution: res.institution,
    fieldOfStudy: res.fieldOfStudy,
    semester: res.semester,
    subject: res.subject,
    noteSize: res.size,
    notesLink: res.url,
    thumbnail: "",
  };

  await prisma.note
    .create({
      data: noteDataDb,
    })
    .then(async (note) => {
      if (process.env.PDF_TO_IMG_URL) {
        await makeRequest<ApiResponse>(
          process.env.PDF_TO_IMG_URL,
          noteDataDb.notesLink
        )
          .then(async (res3) => {
            if (!res3) console.log("Error uploading thumbnail");
            console.log(res3?.data.url);
            await prisma.note
              .update({
                where: {
                  id: note.id,
                },
                data: {
                  thumbnail: res3?.data.url,
                },
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return NextResponse.json(note.id, { status: 200 });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { Error: "Upload failed, try again" },
        { status: 400 }
      );
    });
  return NextResponse.json({ Response: "Recieved" }, { status: 200 });
}

const makeRequest = async <T>(
  url: string,
  pdfUrl: string
): Promise<AxiosResponse<T> | undefined> => {
  try {
    return await axios.post<T>(url, { pdfUrl });
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
