import { server } from "./app";
import dotenv from "dotenv";
import { io } from "./app";
import RoomManager from "./sockets/RoomManager";

dotenv.config();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.emit("socketId", socket.id);

  const roomManager = new RoomManager({ io: socket, socketId: socket.id });

  socket.on("RoomDetails", (data) => {
    const { limit, roomName } = data;
    roomManager.createRoom({ limit, roomName });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
