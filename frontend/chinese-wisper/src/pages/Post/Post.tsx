import { useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Send,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import postApi from "@/api/postsApi";
import PostSkeleton from "@/components/Posts/PostsLoading";

import PostCard from "@/components/Posts/PostsCard";
import { useState } from "react";

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  likes: number;
}

interface PostData {
  id: string;
  title: string;
  initialContent: string;
  currentContent: string | null;
  userId: string;
  nextEditTime: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

const SinglePost = () => {
  const { postId } = useParams({ from: "/main/post/$postId" });

  const [comment, setComment] = useState({
    content: "",
  });
  const fetchSinglePost = async (postId: string): Promise<any> => {
    const response = await postApi.getPost(postId);
    return response;
  };
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchSinglePost(postId),
  });

  if (query.isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (query.error) {
    return (
      <div>
        <PostSkeleton />
      </div>
    );
  }

  const post = query.data;

  const handleCommentSubmit = async ({
    postId,
    comment,
  }: {
    postId: string;
    comment: {};
  }) => {
    try {
      await postApi.addResponses({ postId, comment });
      setComment({
        content: "",
      });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    } catch (error) {
      console.log("Error while adding response", error);
    }
  };

  return (
    <div>
      <PostCard
        key={post.data.post.id}
        id={post.data.post.id}
        title={post.data.post.title}
        initialContent={post.data.post.initialContent}
        userId={post.data.post.userId}
        //also add avatar Img
        createdAt={post.data.post.createdAt}
        clickable={false}
      />

      {/* Comments section */}
      <div className="space-y-4 ml-5 max-w-screen-md mx-auto">
        <h3 className="text-lg font-semibold">Comments</h3>

        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder="Write a comment..."
              className="flex-1"
              onChange={(e) =>
                setComment((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              value={comment.content}
            />
            <Button
              size="sm"
              onClick={() =>
                handleCommentSubmit({ postId: post.data.post.id, comment })
              }
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Render comments */}
        <div className="space-y-4">
          {post.data.allResponses?.map((comment) => (
            <div key={comment.id} className="flex space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  {comment.userId.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-secondary p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      @{comment.userId}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
