import { Certificate } from "crypto";
import { Redis } from "ioredis";

import { Socket } from "socket.io";

const client = new Redis();

interface User {
  userId: string;
  username: string;
  socketId: string;
  RoomId: string | null;
}

export default class UserManager {
  private io: Socket;

  constructor({ io }: { io: Socket }) {
    this.io = io;
  }

  async createUser({ userId, username, RoomId, socketId }: User) {
    const createdUser = await client.hmset(`user:${userId}`, {
      userId,
      username,
      socketId,
      RoomId,
    });

    if (!createdUser) {
      this.io.emit("errorWhileCreatingRoom", "Something Went wrong");
    }

    this.io.emit("RoomCreated", createdUser);
  }
}
