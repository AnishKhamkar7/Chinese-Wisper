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

  async createRoom({
    limit,
    roomName,
    userId,
    roomId,
  }: {
    limit: number;
    roomName: string;
    userId: string;
    roomId: string;
  }) {
    const createRoom = await client
      .multi()
      .hmset(`room:${roomId}`, {
        roomId: roomId,
        userId: userId,
        limit: limit,
        roomName: roomName,
      })
      .sadd(`room:${roomId}:members`, userId)
      .exec();

    if (!createRoom) {
      this.io.emit("errorWhileCreatingRoom", "Something Went wrong");
    }

    this.io.emit("RoomCreated", "Room Created SuccessFully");
  }
}
