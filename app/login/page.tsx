"use client";

import { GridWrapper } from "@/components/common/grid-image-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LinkedinLogo from "/oauth-logos/linkedin-logo.svg";
import GoogleLogo from "/oauth-logos/google-logo.svg";
import LoginButton from "../../components/common/login-button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

export default function Page(): JSX.Element {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);
    try {
      const response = await signIn("credentials", {
        email: formValues.email as string,
        password: formValues.password as string,
      });
    } catch (error) {
      console.error("An error occurred while signing in", error);
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
        <div className="flex flex-col  ">
          <h1 className="md:flex hidden font-bold text-secondary text-[2.5rem]">
            Welcome Back
          </h1>
          <p className="md:flex hidden text-secondary -mt-1 mb-3">
            We were starting to miss you
          </p>
          <form
            action="submit"
            className="flex flex-col items-start"
            onSubmit={handleSubmit}
          >
            <Input
              name="email"
              className="bg-transparent placeholder-disabled rounded-md p-4 w-full"
              placeholder="Email"
              type="text"
            />
            <Input
              name="password"
              className="bg-transparent placeholder-disabled rounded-md p-4 mt-4 w-full"
              placeholder="Password"
              type="password"
            />
            <button
              className="text-secondary w-full flex justify-end my-4"
              type="submit"
              disabled
            >
              Forgot Password?
            </button>

            <Button
              className="w-full rounded-3xl py-3 font-bold"
              type="submit"
              variant="default"
            >
              Sign In
            </Button>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-secondary  mt-2">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
              <p className="text-secondary mt-2 text-sm">
                By signing in, I agree with the{" "}
                <span className="text-primary">Terms & Conditions</span> and{" "}
                <span className="text-primary">Privacy policy</span>
              </p>
              <hr className="my-5 w-[110%] border-disabled rounded-xl" />
              <p className="text-secondary">Or sign in with</p>
              <div className="flex flex-row gap-8 m-6">
                <div className="flex flex-col items-center justify-center">
                  <LoginButton
                    providerName="Google"
                    svgLogo={"/oauth-logos/google-logo.svg"}
                  />
                  <p className="my-1 text-secondary text-sm">Google</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <LoginButton
                    providerName="LinkedIn"
                    svgLogo={"/oauth-logos/linkedin-logo.svg"}
                  />
                  <p className="my-1 text-secondary text-sm">Linkedin</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </GridWrapper>
  );
}
