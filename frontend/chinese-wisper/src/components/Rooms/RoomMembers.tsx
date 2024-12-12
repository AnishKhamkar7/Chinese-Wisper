import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useState } from "react";

function RoomMembers() {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-400 text-white p-4"></div>

      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>This is where the main content goes.</p>
      </div>

      <div className="w-1/5 bg-gray-400 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Right Menu</h2>
        <ul>
          <li className="mb-2">Option 1</li>
          <li className="mb-2">Option 2</li>
          <li className="mb-2">Option 3</li>
        </ul>
      </div>
    </div>
  );
}

export default RoomMembers;
