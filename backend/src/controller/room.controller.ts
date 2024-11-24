import { Request, Response } from "express";
import DebateRoomService from "../services/room.service";
import ApiResponse from "../http/ApiResponse";
import { StatusCodes } from "http-status-codes";
import handleApiResponse from "../http/handleApiResponse";

export default class DebateRooms {
  private debateRoomService: DebateRoomService;

  constructor(debateRoomService: DebateRoomService) {
    this.debateRoomService = debateRoomService;
  }

  createRoom = async (req: Request, res: Response) => {
    const { userId } = req;
    const { title, participantLimit } = req.body;

    const createdRoom = await this.debateRoomService.createRoom({
      userId: userId!,
      title,
      participantLimit,
    });

    const response = ApiResponse.success({
      data: createdRoom,
      message: "Post Created successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };
}
