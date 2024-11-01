import React from "react";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import timeAgo from "@/utils/timeAgo";
import { useNavigate } from "@tanstack/react-router";

interface PostData {
  id: string;
  title: string;
  initialContent: string;
  userId: string;
  createdAt: string;
  clickable: boolean;
}

const PostCard: React.FC<PostData> = ({
  id,
  title,
  initialContent,
  userId,
  createdAt,
  clickable,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (postId: string) => {
    navigate({ to: `/post/${postId}`, params: { postId } });
  };

  return (
    <Card
      key={id}
      className={`max-w-screen-md mb-4 group mt-4 ml-4 ${clickable ? "cursor-pointer" : ""}`}
      onClick={clickable ? () => handleCardClick(id) : undefined}
    >
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">@{userId}</span>
            <span className="text-xs text-muted-foreground">
              {timeAgo(createdAt)}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="transition-opacity duration-300"
            >
              <DropdownMenuItem>Save</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h2 className="text-xl font-bold scroll-m-20">{title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-base leading-7 text-muted-foreground">
          {initialContent}
        </p>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 rounded-full"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>Like</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 rounded-full"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Comment</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 rounded-full"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
