import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="w-full h-screen gap-4">
      <div className="flex justify-between items-start w-full px-4 mt-3">
        <Skeleton className="w-1/4 h-12" />
        <Skeleton className="w-1/4 h-12" />
      </div>
      <div className="flex justify-between items-start w-full px-4 mt-3 flex-col gap-3">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
}

export default loading;
