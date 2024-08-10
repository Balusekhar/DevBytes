import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex m-4 w-full flex-col cursor-pointer items-center rounded-md border md:flex-row bg-white shadow-lg">
      <div className="h-[200px] w-full md:w-[300px] flex-shrink-0">
        <Skeleton className="h-full w-full rounded-l-md object-cover" />
      </div>
      <div className="flex-1 p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          <Skeleton className="h-6 w-1/2" />
        </h1>
        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <span className="flex flex-col">
            <span className="text-[14px] font-medium text-gray-900">
              <Skeleton className="h-4 w-1/4" />
            </span>
            <span className="text-[12px] text-gray-500">
              <Skeleton className="h-4 w-1/4" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
