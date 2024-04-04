"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ProfileButton } from "./profile-button";
import { UploadButton } from "./icons";
export function Navbar({
  logoSrc,
  logoAlt,
}: {
  logoSrc: string;
  logoAlt: string;
}): JSX.Element {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className="flex h-[8vh] justify-between px-10 items-center border-b-[1px] border-[#363636]">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <img alt={logoAlt} src={logoSrc} />
        </div>
      </Link>
      <div className="">
        {session ? (
          <>
            <div className="flex flex-row md:gap-5 justify-center items-center">
              <button>
                <Link href="/upload-notes">
                  <UploadButton
                    className="transition-all duration-200 ease-in-out"
                    stroke={"grey"}
                  />
                </Link>
              </button>
              <ProfileButton />
            </div>
          </>
        ) : (
          <Link href="/login">
            <Button className="rounded-[0.75rem]" variant="outline">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
