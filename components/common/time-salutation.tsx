"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Greetings } from "@/lib/greetings";

export function Salutation(): JSX.Element {
  const { data: session } = useSession();
  let name = "Mate";
  if (session?.user?.name) {
    name = session.user.name;
  }
  const [time, setTime] = useState("");
  const [salutation, setSalutation] = useState("");

  useEffect(() => {
    const [timeNow, salutationNow]: [string, string] = Greetings();
    setTime(timeNow);
    setSalutation(salutationNow);
  }, []);

  return (
    <div className="flex flex-col md:gap-5 gap-0 pb-5 pl-3">
      <h1 className="font-bold md:text-[3.5rem] text-xl leading-[3.8rem]">
        {time}
      </h1>
      <p className="md:text-3xl text-sm">
        <strong>{salutation}</strong>, {name}
      </p>
    </div>
  );
}
