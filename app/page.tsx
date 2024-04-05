// import { Card } from "ui";
import Image from "next/image";
import { Navbar } from "@/components/common/navbar";
import { GridWrapper } from "@/components/common/grid-image-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { getTrendingNotes } from "@/actions/get-all-notes";
import prisma from "@/lib/prisma";

// import styles from "./page.module.css";

export default async function Page() {
  const mostUpvotedUsers = await prisma.user.findMany({
    where: {
      OR: [{ rank: 1 }, { rank: 2 }, { rank: 3 }],
    },
  });
  console.log(mostUpvotedUsers);
  return (
    <>
      <Navbar logoAlt="College Notes Logo" logoSrc="/logo-small.png" />
      <GridWrapper>
        <main className="md:flex hidden flex-wrap flex-col p-24 justify-center items-center min-h-[90vh]">
          <div className="group">
            <div className="relative w-48 h-48 left-1/2 top-1/2 transform -translate-x-1/2">
              <h1
                className="font-black text-8xl absolute left-1/2 top-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
                data-text="REVOLUTIONISE"
                style={{
                  WebkitTextStrokeWidth: "3px",
                  WebkitTextStrokeColor: "white",
                  WebkitTextFillColor: "transparent",
                }}
              >
                REVOLUTIONISE
              </h1>
              <Image
                alt="Picture of the author"
                className="group-hover:scale-110 duration-500 ease-in-out cursor-pointer"
                height={150}
                src="/logo.png"
                style={{
                  position: "absolute",
                  top: "130px",
                  right: "20px",
                  zIndex: 2,
                }}
                width={150}
              />
              <h1 className="font-black text-8xl absolute left-1/2 top-1/2 transform -translate-x-1/2 z-3">
                REVOLUTIONISE
              </h1>
            </div>

            <h1 className="relative font-black text-8xl my-4 z-20 cursor-pointer">
              NOTES
            </h1>
          </div>
          <p className="text-secondary my-6">
            A very efficient notes sharing platform. Share your notes and earn
            some love from your peers
          </p>
          <div className="flex gap-5 my-4">
            <Link href="/notes">
              <Button
                className="rounded-[0.5rem] text-background hover:bg-[#FFE072]"
                type="submit"
                variant="default"
              >
                Search Notes
              </Button>
            </Link>
            <Link href="/upload-notes">
              <Button
                className="border-[1px] rounded-[0.5rem]"
                type="submit"
                variant="outline"
              >
                Share Notes
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 mt-10">
            <p className="text-secondary underline underline-offset-[6px] text-center">
              You all are the most upvoted. Thank you for your contribution!
            </p>
            <div className="flex gap-7">
              {mostUpvotedUsers.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="w-20 h-20 flex flex-col items-center text-center"
                  >
                    <Image
                      alt="Picture of the author"
                      height={60}
                      src={user.image || "/user-image-anonymous.svg"}
                      style={{ clipPath: "circle()" }}
                      width={60}
                    />
                    <p className="text-xs py-2">{user.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <main className="h-[90vh] md:hidden flex flex-col px-10 pt-16 pb-20 gap-5">
          <Image
            alt="Book alt image"
            className="mb-5"
            height={100}
            src="/Book.svg"
            width={100}
          />
          <h1 className="font-black text-4xl">REVOLUTIONISE NOTES</h1>
          <p className="text-secondary">
            Share your notes and earn some love from your peers
          </p>
          <div className="flex gap-5 my-4">
            <Link href="/notes">
              <Button
                className="rounded-[0.5rem]"
                type="submit"
                variant="default"
              >
                Search Notes
              </Button>
            </Link>
            <Link href="/upload-notes">
              <Button
                className="border-[1px] rounded-[0.5rem]"
                type="submit"
                variant="outline"
              >
                Share Notes
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-secondary underline underline-offset-4 text-center">
              You are the most upvoted. Thank you for your contribution!
            </p>
            <div className="flex gap-7">
              {mostUpvotedUsers.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="w-20 h-[120px] flex flex-col items-center text-center"
                  >
                    <Image
                      alt="Picture of the author"
                      height={60}
                      src={user.image || "/user-image-anonymous.svg"}
                      style={{ clipPath: "circle()" }}
                      width={60}
                    />
                    <p className="text-xs py-2">{user.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </GridWrapper>
    </>
  );
}
