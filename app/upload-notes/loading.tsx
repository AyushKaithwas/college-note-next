import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col w-screen h-screen items-center gap-10">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[300px] h-[20px] rounded-full" />
      <Skeleton className="w-[200px] h-[20px] rounded-full" />
    </div>
  );
}
