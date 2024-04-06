"use client";

import { GridWrapper } from "@/components/common/grid-image-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LoginButton from "../../components/common/login-button";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSigningUp(true);
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);
    try {
      const res = await axios.post("/api/auth/signup", formValues);
      try {
        const response = await signIn("credentials", {
          email: formValues.email as string,
          password: formValues.password as string,
        });
      } catch (error) {
        console.error("An error occurred while signing in", error);
      }
      router.push("/");
    } catch (error) {
      setSigningUp(false);
      setSignUpFailed(true);
    }
  };
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
          <form
            className="flex flex-col items-start gap-5"
            onSubmit={handleSignUp}
          >
            <Input
              name="name"
              className="bg-transparent placeholder-disabled rounded-md py-3 px-4 w-full"
              placeholder="Name"
              required
              type="text"
            />
            <Input
              name="email"
              className="bg-transparent placeholder-disabled rounded-md py-3 px-4 w-full"
              placeholder="Email"
              required
              type="email"
            />
            <Input
              name="password"
              className="bg-transparent placeholder-disabled rounded-md py-3 px-4 w-full"
              placeholder="Password"
              required
              type="password"
            />
            <Button
              className="w-full rounded-3xl py-3 font-bold"
              type="submit"
              variant="default"
              disabled={signingUp}
            >
              Sign Up
            </Button>
          </form>
          <h2
            className={cn(
              "mx-auto text-destructive font-bold text-xl py-5",
              signUpFailed ? "flex" : "hidden"
            )}
          >
            Sign Up Failed, Try Again
          </h2>
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
