"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function LoginButton({
  svgLogo,
  providerName,
}: {
  svgLogo: string;
  providerName: string;
}): JSX.Element {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className={`hover:bg-tertiary ease-in-out duration-200 ${
        loading
          ? "cursor-not-allowed bg-transparent "
          : "flex justify-center items-center w-12 h-12 p-2 border border-tertiary rounded-[0.5rem]"
      }`}
      disabled={loading}
      onClick={() => {
        setLoading(true);
        void signIn(providerName.toLowerCase());
      }}
      type="submit"
    >
      {loading ? (
        <ThreeDots
          ariaLabel="three-dots-loading"
          color="#DE8C4D"
          height="50"
          radius="9"
          width="50"
          wrapperStyle={{ backgroundColor: "transparent" }}
        />
      ) : (
        <Image
          alt={`${providerName} logo`}
          height={48}
          src={svgLogo}
          width={48}
        />
      )}
    </button>
  );
}
