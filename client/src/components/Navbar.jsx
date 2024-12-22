import { IoMdSearch } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 px-2 py-1 bg-white  md:w-[60%] rounded-lg">
        <IoMdSearch size={24} />
        <input
          placeholder="Search your course"
          type="text"
          name=""
          className="w-full border-0 outline-none p-2"
        />
      </div>
      <div className="md:w-full flex items-center gap-6 justify-end text-gray-500">
        <div className="items-center gap-8 justify-end  text-gray-500 hidden md:flex">
          <LuMessageSquareMore size={24} />
          <FiBell size={24} />
          <MdHelpOutline size={24} />
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="justify-end flex items-center gap-4 cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold text-black hidden md:block">
                Adeliny
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold">Adeliny</h1>
                </div>
              </div>
              <div className="items-center justify-between text-gray-500 md:hidden flex">
                <LuMessageSquareMore size={20} />
                <FiBell size={20} />
                <MdHelpOutline size={20} />
              </div>
              <Button variant="outline"> Logout </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
