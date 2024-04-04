"use server";

import prisma from "@/lib/prisma";
import { type User } from "@/types";

export async function getUser(userId: string): Promise<User | null> {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return null;
  }
  return user;
}
