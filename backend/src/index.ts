import { server } from "./app";
import dotenv from "dotenv";
import { io } from "./app";

dotenv.config();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
