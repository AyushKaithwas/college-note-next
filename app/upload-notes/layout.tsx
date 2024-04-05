import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "College Notes - Upload Notes",
  description: "Upload Notes page for College Notes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
