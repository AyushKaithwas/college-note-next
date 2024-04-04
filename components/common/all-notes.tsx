"use client";

import { useCallback, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NoteCard } from "./note-card";
import { Salutation } from "./time-salutation";
import { type Note } from "@/types";
import { getTrendingNotes, getRecentNotes } from "@/actions/get-all-notes";

export function AllNotes({ notes }: { notes: Note[] | null }): JSX.Element {
  //   const { data: session } = useSession();
  const [notesData, setNotesData] = useState<Note[] | null>(notes);
  const [recentNotesData, setRecentNotesData] = useState<Note[] | null>(null);
  const [allNotesLoaded, setAllNotesLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();
  const [isTrendingSelected, setIsTrendingSelected] = useState<boolean>(true);

  async function loadInitialRecentNotes(): Promise<void> {
    const userNotes = await getRecentNotes(12, 1);
    if (userNotes?.length) {
      setRecentNotesData(userNotes);
    }
  }

  const loadMoreNotes = useCallback(async () => {
    const nextPage = page + 1;
    const userNotes = await getTrendingNotes(12, nextPage);
    if (userNotes?.length && notesData) {
      setPage(nextPage);
      setNotesData([...notesData, ...userNotes]);
    } else {
      setAllNotesLoaded(true);
    }
  }, [page, notesData]); // add any other dependencies here

  const loadMoreRecentNotes = useCallback(async () => {
    const nextPage = page + 1;
    const userNotes = await getTrendingNotes(12, nextPage);
    if (userNotes?.length && recentNotesData) {
      setPage(nextPage);
      setNotesData([...recentNotesData, ...userNotes]);
    } else {
      setAllNotesLoaded(true);
    }
  }, [page, recentNotesData]); // add any other dependencies here

  useEffect(() => {
    void (async () => {
      if (inView) {
        if (isTrendingSelected) {
          await loadMoreNotes().catch(console.error);
        } else {
          await loadMoreRecentNotes().catch(console.error);
        }
      }
    })();
  }, [inView, loadMoreNotes, loadMoreRecentNotes, isTrendingSelected]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col w-[70%] min-w-[300px] max-w-[800px] items-left justify-center py-10 text-secondary ">
        <Salutation />
        <div className="w-full flex flex-row  justify-between ems-center gap-5 border border-disabled rounded-md px-6 py-3">
          <div className="flex flex-row gap-5 items-center" ref={ref}>
            <button
              className={`${
                isTrendingSelected
                  ? "font-bold decoration-[0.4rem] underline underline-offset-[0.8rem] "
                  : "text-muted"
              } text-xl ease-in-out duration-100`}
              onClick={() => {
                setAllNotesLoaded(false);
                setIsTrendingSelected(true);
              }}
            >
              Trending
            </button>
            <button
              className={`${
                !isTrendingSelected
                  ? "font-bold decoration-[0.4rem] underline underline-offset-[0.8rem] "
                  : "text-muted"
              } text-xl ease-in-out duration-100 `}
              onClick={async () => {
                setAllNotesLoaded(false);
                if (!recentNotesData) {
                  await loadInitialRecentNotes();
                }
                setIsTrendingSelected(false);
              }}
            >
              Recent
            </button>
          </div>
        </div>
        {(() => {
          if (isTrendingSelected) {
            if (notesData) {
              return notesData.map((noteData: Note) => (
                <NoteCard key={noteData.id} note={noteData} />
              ));
            } else {
              return <div>No Notes Uploaded</div>;
            }
          } else if (recentNotesData) {
            return recentNotesData.map((noteData: Note) => (
              <NoteCard key={noteData.id} note={noteData} />
            ));
          } else {
            return <div>No Notes Uploaded</div>;
          }
        })()}
        <div
          className={`col-span-1 mt-16 items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4 ${
            allNotesLoaded ? "hidden" : "flex"
          }`}
          ref={ref}
        >
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-primary text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
