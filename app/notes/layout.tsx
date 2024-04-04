import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";

export const metadata: Metadata = {
  title: "College Notes",
  description: "View Notes page for College Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar logoAlt="College notes logo" logoSrc="/logo-small.png" />
      {children}
    </>
  );
}
