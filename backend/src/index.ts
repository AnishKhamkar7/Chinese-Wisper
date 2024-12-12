import { server } from "./app";
import dotenv from "dotenv";
import { io } from "./app";
import RoomManager from "./sockets/RoomManager";

import UserManager from "./sockets/UserManager";

dotenv.config();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.emit("socketId", socket.id);

  const userManager = new UserManager({ io: socket });
  const roomManager = new RoomManager({ io: socket, socketId: socket.id });

  socket.on("createUser", (data) => {
    const { userId, socketId, RoomId, username } = data;

    userManager.createUser({ userId, socketId, RoomId, username });
  });

  socket.on("createRoom", (data) => {
    const { limit, roomName, userId, roomId } = data;
    roomManager.createRoom({ limit, roomName, userId, roomId });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
