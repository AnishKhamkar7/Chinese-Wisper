import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";

function RoomMembers() {
  return (
    <div>
      <div
        className=" w-16 h-16 rounded-full border-2 border-gray-400 hover:border-blue-500 transition-all justify-items-center"
        //   style={{
        //     left: `${x}px`,
        //     top: `${y}px`,
        //     transform: "translate(-50%, -50%)",
        //   }}
        //   title={`${member.name}\n${member.expertise.join(", ")}`}
      ></div>
    </div>
  );
}

export default RoomMembers;