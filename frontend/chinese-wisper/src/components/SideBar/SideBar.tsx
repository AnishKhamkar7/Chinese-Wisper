import { HiHome, HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";

interface sideBarProps {
  isSidebarOpen: boolean;
}

const Sidebar = (isSidebarOpen: sideBarProps) => {
  return (
    <div
      className={`bg-white border-r border-gray-300 p-4 flex flex-col h-full transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="bg-white border-r border-gray-300 p-9">
        <div className="flex flex-col space-y-6">
          {/* Home */}
          <a
            href="/"
            className="flex items-center space-x-2 text-gray-800 hover:text-black"
          >
            <HiHome className="h-6 w-6" />
            <span>Home</span>
          </a>

          {/* Popular Posts */}
          <a
            href="/popular"
            className="flex items-center space-x-2 text-gray-800 hover:text-black"
          >
            <HiOutlineUser className="h-6 w-6" />
            <span>Popular Posts</span>
          </a>

          {/* Settings */}
          <div className="mt-auto">
            <a
              href="/settings"
              className="flex items-center space-x-2 text-gray-800 hover:text-black"
            >
              <HiOutlineUserCircle className="h-6 w-6" />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
