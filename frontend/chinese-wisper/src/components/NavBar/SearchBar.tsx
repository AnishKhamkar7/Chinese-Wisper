import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}

function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}: InputProps) {
  return (
    <div className="w-5/12 flex items-center bg-gray-200 rounded-full px-6">
      <div
        onClick={handleSearch}
        className="text-slate-400 cursor-pointer hover:text-black flex justify-start "
      >
        <FaMagnifyingGlass />
      </div>
      <input
        type="text"
        onChange={onChange}
        placeholder="Search Posts"
        className="w-full text-s bg-transparent py-[10px] outline-none px-2"
        value={value}
      />
      {value ? (
        <div
          onClick={onClearSearch}
          className="text-slate5400 cursor-pointer hover:text-black mr-0"
        >
          <IoMdClose />
        </div>
      ) : undefined}
    </div>
  );
}

export default SearchBar;
