import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/prisma";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

import indexRouter from "./routes/index";

app.use("/api", indexRouter);

app.use(errorHandlerMiddleware);

export { io, server };
