import { Card, CardContent } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card className="rounded-2xl group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>
      </CardContent>

      <div className="px-2 space-y-4">
        <Skeleton className="h-6 w-4/5" />
        <div className="flex w-full items-center justify-between px-4">
          <Skeleton className="h-6 w-25" />
          <Skeleton className="h-4 w-15" />
        </div>
      </div>
    </Card>
  );
}
