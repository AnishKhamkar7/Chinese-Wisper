import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const PostSkeleton = () => {
  return (
    <Card className="max-w-screen-2xl mr-8 mb-4">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />

            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex space-x-3 w-full">
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
