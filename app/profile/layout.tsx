import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "College Notes - Profile",
  description: "Profile for College Notes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar logoAlt="College notes logo" logoSrc="/logo-small.png" />
      {children}
    </>
  );
}
