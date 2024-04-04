"use client";
import { signOut } from "next-auth/react";

export default function SignOut({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <button onClick={() => signOut()}>{children}</button>;
}
