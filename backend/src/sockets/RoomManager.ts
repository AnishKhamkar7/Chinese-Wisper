import { create } from "domain";
import { Redis } from "ioredis";

import { Socket } from "socket.io";

const client = new Redis();

export default class RoomManager {
  private io: Socket;
  private socketId: string;
  constructor({ io, socketId }: { io: Socket; socketId: string }) {
    this.io = io;
    this.socketId = socketId;
  }

  async createRoom({ limit, roomName }: { limit: number; roomName: string }) {
    const createRoom = await client.hmset("room", {
      userId: this.socketId,
      limit: limit,
      roomName: roomName,
    });

    if (!createRoom) {
      this.io.emit("errorWhileCreatingRoom", "Something Went wrong");
    }

    this.io.emit("RoomCreated", createRoom);
  }
}
