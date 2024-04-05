import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/cred-auth";
import { cookies } from "next/headers";

interface Payload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const res: Payload = await req.json();
  const { email, password } = res;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.hashedPassword === hashedPassword) {
      const jwt = await encrypt(user);
      cookies().set("session", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
      });
      return NextResponse.json(
        { Response: "Sign In Successful" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Response: "Sign In Failed" }, { status: 500 });
  }
}
