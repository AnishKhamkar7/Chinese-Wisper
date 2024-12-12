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
      return this.io.emit("errorWhileCreatingRoom", "Something Went wrong");
    }

    return this.io.emit("RoomCreated", "Room Created SuccessFully");
  }

  async getAllRooms() {
    const rooms = await client.hmget("room");

    if (!rooms) {
      return this.io.emit("errorWhileRetrievingRooms", "Something Went wrong");
    }
    return this.io.emit("getAllRooms", rooms);
  }

  async getARoom({ roomId }: { roomId: string }) {
    const room = await client.hmget(`room:${roomId}`);

    if (!room) {
      return this.io.emit("errorWhileRetrievingRoom", "Room Not Found");
    }
    return this.io.emit("getARoom", room);
  }
}
