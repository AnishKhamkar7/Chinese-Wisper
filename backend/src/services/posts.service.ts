import ErrorFactory from "../errors";
import PostRepository from "../repository/posts.repository";
import UserRepository from "../repository/user.repository";
import { titleGenerator } from "../utils/titleGenerator";

export default class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor(postRepository: PostRepository, userRepository: UserRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  findById = async (id: string) => {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw ErrorFactory.notFoundError("Post Not Found or Invalid PostId");
    }

    return post;
  };

  addPost = async ({
    initialContent,
    userId,
    duration,
  }: {
    initialContent: string;
    userId: string;
    duration: number;
  }) => {
    await this.userRepository.findById(userId);

    const title = titleGenerator(initialContent);

    const nextEditTime = new Date();

    nextEditTime.setHours(nextEditTime.getHours() + duration);

    const post = await this.postRepository.createPost({
      userId,
      initialContent,
      title,
      nextEditTime,
    });

    if (!post) {
      throw ErrorFactory.internalServerError(
        "Something went wrong creating Post"
      );
    }

    return post;
  };

  getAllPosts = async () => {
    const posts = await this.postRepository.getAllPosts();

    return posts;
  };

  getPostById = async (id: string) => {
    const post = await this.findById(id);

    return post;
  };
}
