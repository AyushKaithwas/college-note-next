import { AllNotes } from "@/components/common/all-notes";
import { getTrendingNotes } from "@/actions/get-all-notes";

const pageSize = 12;

export default async function Notes(): Promise<JSX.Element> {
  const notesData = await getTrendingNotes(pageSize, 1);
  // console.log("notesData", notesData);

  return (
    <div className="w-full flex flex-col items-center">
      <AllNotes notes={notesData} />
    </div>
  );
}
