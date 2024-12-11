import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RoomMembers from "@/components/Rooms/RoomMembers";

function Room() {
  const userName = useSelector(
    (state: RootState) => state.socketContext.userName
  );

  return (
    <div>
      <RoomMembers />
    </div>
  );
}

export default Room;
