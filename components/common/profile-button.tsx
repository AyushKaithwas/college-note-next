"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignOut from "./sign-out-button";

export function ProfileButton() {
  const { data: session } = useSession();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            className="rounded-full ease-in-out duration-200"
            src={session?.user?.image || "/user-image-anonymous.svg"}
            alt="Upload icon"
            height={25}
            width={25}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background text-foreground">
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">{session?.user?.name}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut>Sign Out</SignOut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
