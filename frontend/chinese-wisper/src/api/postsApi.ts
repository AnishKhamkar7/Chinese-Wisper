import axiosClient from "./axiosClient";

interface Post {
  id: string;
  title: string;
  initialContent: string;
  currentContent: string | null;
  userId: string;
  nextEditTime: string;
  createdAt: string;
  updatedAt: string;
}

interface GetPostsResponse {
  success: boolean;
  message: string;
  data: Post[];
  error: string | null;
}

const postApi = {
  getAllPosts(): Promise<GetPostsResponse> {
    return axiosClient.get("/posts");
  },

  getPost(postId: string): Promise<any> {
    return axiosClient.get(`/response/${postId}`);
  },

  addResponses({
    postId,
    comment,
  }: {
    postId: string;
    comment: {};
  }): Promise<any> {
    return axiosClient.post(`/response/${postId}`, comment);
  },
};

export default postApi;
