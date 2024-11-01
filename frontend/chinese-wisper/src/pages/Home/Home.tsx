import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/Posts/PostsCard";
import postApi from "@/api/postsApi";
import PostSkeleton from "@/components/Posts/PostsLoading";

interface PostData {
  id: string;
  title: string;
  initialContent: string;
  currentContent: string | null;
  userId: string;
  nextEditTime: string;
  createdAt: string;
  updatedAt: string;
}

const HomePage = () => {
  const fetchPosts = async (): Promise<PostData[]> => {
    const response = await postApi.getAllPosts();
    return response.data;
  };

  const query = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  if (query.isLoading) {
    return (
      <div>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (query.error) {
    return <div>Error loading posts: {query.error.message}</div>;
  }

  return (
    <div>
      {query.data?.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          initialContent={post.initialContent}
          userId={post.userId}
          createdAt={post.createdAt}
          clickable={true}
        />
      ))}
    </div>
  );
};

export default HomePage;
