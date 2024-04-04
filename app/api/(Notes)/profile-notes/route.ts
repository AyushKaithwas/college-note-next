import { NextResponse } from "next/server";
import { type AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions as AuthOptions);
  //   const res = (await req.json()) as Payload;
  console.log(session);
  return NextResponse.json({ Response: "Recieved" }, { status: 200 });
}
