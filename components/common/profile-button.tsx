"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import SignOut from "./sign-out-button";

export function ProfileButton() {
  const { data: session } = useSession();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Image
              className="hover:scale-125 rounded-full ease-in-out duration-200"
              src={session?.user?.image || "/user-image-anonymous.svg"}
              alt="Upload icon"
              height={25}
              width={25}
            />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 rounded-[2rem] p-3 w-[100px] flex flex-col justify-start items-start">
              <li
                className="hover:font-bold ease-in-out duration-100"
                title="Profile"
              >
                <Link href="/profile">Profile</Link>
              </li>
              <li
                className="hover:font-bold ease-in-out duration-100"
                title="Sign Out"
              >
                <SignOut>Sign Out</SignOut>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
