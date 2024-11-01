import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { HiMenu } from "react-icons/hi";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const NavBar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  console.log(authState.isAuthenticated);
  console.log(authState.data);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const onSearchNote = (query: any) => {};

  const getNotes = () => {};

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const handleSignUp = () => {
    navigate({ to: "/login" });
  };

  const onClearSearch = () => {
    setSearchQuery("");
    getNotes();
    setIsSearch(false);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-300">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800 flex items-center space-x-4">
          <button
            className="md:hidden"
            onClick={() => onToggleSidebar((prev) => !prev)}
          >
            <HiMenu className="h-6 w-6 text-gray-600" />
          </button>
          <span>ChineseWisper</span>
        </div>

        <div className="flex-1 flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
        {authState.isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Button className="rounded-full">Create</Button>
            <h4>{""}</h4>
            <Avatar>
              <AvatarImage src="https://i.ytimg.com/vi/SQJrYw1QvSQ/maxresdefault.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button onClick={handleSignUp}>SignUp</Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
