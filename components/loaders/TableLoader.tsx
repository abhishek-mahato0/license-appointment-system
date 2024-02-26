import { Skeleton } from "../ui/skeleton";

type TableLaoderProps = {
  numberOfRows?: number;
  numberOfColumns?: number;
};

export default function TableLaoder({
  numberOfRows = 9,
  numberOfColumns = 6,
}: TableLaoderProps) {
  return (
    <div className="flex flex-col mt-3 h-[72vh] rounded-md border pt-6 shadow-lg">
      <div className="flex items-center space-x-20 border-b-[1px] px-10 pb-5 ">
        <Skeleton className="h-4 w-1/12 xl:h-6" />
        {Array.from({ length: numberOfColumns }).map((__, index) => (
          <Skeleton key={index} className="h-4 w-1/4 xl:h-6" />
        ))}
      </div>
      {Array.from({ length: numberOfRows }).map((_, idx) => (
        <div
          key={idx}
          className="flex space-x-20 border-b-[1px] px-10 py-3 xl:py-4"
        >
          <Skeleton className="h-4 w-1/12 " />
          {Array.from({ length: numberOfColumns }).map((__, index) => (
            <Skeleton key={index} className="h-4 w-1/4" />
          ))}
        </div>
      ))}
    </div>
  );
}
