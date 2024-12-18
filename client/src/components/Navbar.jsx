import { IoMdSearch } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { MdHelpOutline } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 px-2 py-1 bg-white w-[50%] md:w-full rounded-lg">
        <IoMdSearch size={24} />
        <input
          placeholder="Search your course"
          type="text"
          name=""
          className="w-full border-0 outline-none p-2"
        />
      </div>
      <div className="w-[50%] md:w-full flex items-center gap-6 justify-end text-gray-500">
        <div className="flex items-center gap-8 justify-end  text-gray-500">
          <LuMessageSquareMore size={24} />
          <GoBell size={24} />
          <MdHelpOutline size={24} />
        </div>
        <div className="justify-end flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-black">Adeliny</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
