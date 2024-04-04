import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";
import { type AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "College Notes - Login",
  description: "Login page for College Notes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions as AuthOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Navbar logoAlt="College notes logo" logoSrc="/logo-small.png" />
      {children}
    </>
  );
}
