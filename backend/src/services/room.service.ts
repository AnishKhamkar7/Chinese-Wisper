import DebateRoomRepository from "../repository/room.repository"


export default class DebateRoomService {
    private debateRoomRepository : DebateRoomRepository
    

    constructor(debateRoomRepository:DebateRoomRepository){
        this.debateRoomRepository = debateRoomRepository
    }

    createRoom = async({userId,title, participantLimit}:{userId:string, title:string, participantLimit:number}) =>{


    }
}