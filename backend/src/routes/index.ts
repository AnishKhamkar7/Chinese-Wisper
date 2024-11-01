import userRouter from "./user.routes";
import postRouter from "./posts.routes";
import responseRouter from "./response.routes";
import upVoteRouter from "./upVotes.routes";
import { Router } from "express";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/response", responseRouter);
apiRouter.use("/upVotes", upVoteRouter);

export default apiRouter;
