import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/cred-auth";
import { cookies } from "next/headers";

interface Payload {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const res: Payload = await req.json();
  const { name, email, password } = res;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    const jwt = await encrypt(user);
    cookies().set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    return NextResponse.json(
      { Response: "Sign Up Successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Response: "Sign Up Failed" }, { status: 500 });
  }
}
