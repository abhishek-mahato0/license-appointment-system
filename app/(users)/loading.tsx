import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="fixed z-40 top-0 left-0 bg-white lg:bottom-0 w-full">
        <div className="p-4">
          <Skeleton className="w-full h-12" />
        </div>
        <div className="p-4">
          <Skeleton className="w-full h-8" />
        </div>
      </div>
      <main className="w-full md:pl-[105px] px-6 pt-10 lg:pt-0 flex-1">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
        </div>
      </main>
    </div>
  );
}

export default Loading;
