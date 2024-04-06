"use client";

import { ArrowBigUp, ArrowDownToLine, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { type Note } from "@/types";
import { getUser } from "@/actions/get-user-by-id";
import { useEffect, useState } from "react";
import { upvoteNote } from "@/actions/upvote-note";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkUpvote } from "@/actions/check-upvote";
import { incrementDownloads } from "@/actions/increment-downloads";
import { ScrollArea } from "../ui/scroll-area";

dayjs.extend(advancedFormat);

export function NoteCard({ note }: { note: Note }) {
  const {
    id,
    title,
    desc,
    noOfUpvotes,
    notesLink,
    thumbnail,
    time,
    downloads,
    userId,
  } = note;
  // console.log(note);
  const router = useRouter();
  const [noteCreator, setNoteCreator] = useState("Anonymous");
  const [upvoted, setUpvoted] = useState(false);
  const [noOfUpvotesLocal, setNoOfUpvotesLocal] = useState(noOfUpvotes);
  const [downloadsLocal, setDownloadsLocal] = useState(downloads);
  const { data: session } = useSession();
  useEffect(() => {
    void (async () => {
      const user = await getUser(userId);
      if (user) {
        setNoteCreator(user.name);
      }
    })();
    void (async () => {
      if (session?.user?.email) {
        const isUpvoted = await checkUpvote({
          email: session?.user?.email,
          noteId: id,
        });
        if (!isUpvoted) {
          setUpvoted(false);
        } else {
          setUpvoted(isUpvoted);
        }
      } else {
        setUpvoted(false);
      }
    })();
  }, [id, session?.user?.email, userId]);
  // const date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  // const month = time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth();
  // const fullDate = `${date}/${month}/${time.getFullYear()}`;

  const fullDate = dayjs(time).format("Do MMMM YYYY");

  return (
    <div className="w-full border border-disabled rounded-md p-10 flex flex-row gap-5">
      <Image
        alt="thumbnail"
        className="w-[150px] h-[200px] object-cover rounded-[0.5rem]"
        height={200}
        src={thumbnail?.toString() || "/default-thumbnail.png"}
        width={200}
      />
      <div className="flex flex-col flex-grow justify-between w-full py-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">{title}</h1>
            <p className=" text-sm">{fullDate}</p>
          </div>
          <p className=" text-xs italic">
            by{" "}
            <span className="underline underline-offset-4">{noteCreator}</span>
          </p>
        </div>
        {desc !== "" ? (
          <ScrollArea className=" text-xs max-h-[10rem]">{desc}</ScrollArea>
        ) : null}
        <div className="flex flex-row gap-3 items-center">
          <button className="flex flex-row items-center gap-1">
            <MessageSquare size={20} />
            <p className=" text-xs">0</p>
          </button>
          <button>
            <Link
              className="flex flex-row gap-1 items-center"
              href={notesLink}
              target="_blank"
              onClick={() => {
                setDownloadsLocal(downloadsLocal + 1);
                incrementDownloads(id);
              }}
            >
              <ArrowDownToLine size={20} />
              <p className=" text-xs">{downloadsLocal}</p>
            </Link>
          </button>
          <button
            className="flex flex-row items-center gap-1"
            onClick={() => {
              if (!session) {
                router.push("/login");
              } else {
                setUpvoted(!upvoted);
                setNoOfUpvotesLocal(noOfUpvotesLocal + (upvoted ? -1 : 1));
                if (session?.user?.email) {
                  upvoteNote({ email: session?.user?.email, noteId: id });
                }
              }
            }}
          >
            <ArrowBigUp
              color={upvoted ? "orange" : "#E7E7E7"}
              fill={upvoted ? "orange" : ""}
              className="-ml-1"
              strokeWidth="1px"
              size={25}
            />
            <p className=" text-xs">{noOfUpvotesLocal}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
