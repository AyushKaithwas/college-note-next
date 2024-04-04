"use client";

import { GridWrapper } from "@/components/common/grid-image-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LoginButton from "../../components/common/login-button";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page(): JSX.Element {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  return (
    <GridWrapper>
      <div className="w-full h-[92vh] flex md:flex-row flex-col justify-evenly items-center p-10">
        <Image
          alt="College Notes Book"
          className="md:w-[350px] w-[100px] my-10"
          height={300}
          src="/college-notes-book.png"
          width={300}
        />
        <div className="flex flex-col gap-2">
          <h1 className="md:flex hidden font-bold text-secondary text-[2.5rem]">
            Welcome
          </h1>
          <p className="md:flex hidden text-secondary mb-3 -mt-3">
            Hope you have a good day
          </p>
          <form action="submit" className="flex flex-col items-start gap-5">
            <Input
              className="bg-transparent placeholder-disabled rounded-md py-3 px-4 w-full"
              placeholder="Email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled //todo
            />
            <Input
              className="bg-transparent placeholder-disabled rounded-md py-3 px-4 w-full"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled //todo
            />
            <Button
              className="w-full rounded-3xl py-3 font-bold"
              type="submit"
              variant="default"
              disabled
            >
              Sign Up
            </Button>
          </form>
          <div className="flex flex-col gap-1 items-center justify-center text-center">
            <p className="text-secondary">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Sign In
              </Link>
            </p>
            <p className="text-secondary text-sm">
              By signing up, I agree with the{" "}
              <span className="text-primary">Terms & Conditions</span> and{" "}
              <span className="text-primary">Privacy policy</span>
            </p>
          </div>
        </div>
      </div>
    </GridWrapper>
  );
}
