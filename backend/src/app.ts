import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/prisma";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

import indexRouter from "./routes/index";

app.use("/api", indexRouter);

app.use(errorHandlerMiddleware);

export default app;
