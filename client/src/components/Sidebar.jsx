import { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { BiSolidBookContent } from "react-icons/bi";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
// import Navbar from "./Navbar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <div className="flex">
    <div
      className={`z-10 fixed top-0 left-0 h-full bg-white md:w-64 transition-width duration-300  ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="flex justify-between items-center p-2">
        <h2
          className={`text-xl font-bold md:block ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <img src="/Vector.svg" alt="" className="w-28 h-28" />
        </h2>
        <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoMdClose size={24} />
          ) : (
            <div className="flex gap-[8rem] ">
              <div className="">
                <FaBars size={24} />
              </div>
              <img src="/Vector.svg" alt="" className="w-12 h-12 -mt-3" />
            </div>
          )}
          {}
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <RiDashboard3Line size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Dashboard
            </span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <BiSolidBookContent size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Students
            </span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <RiBookMarkedLine size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Chapter
            </span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <MdHelpOutline size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Help
            </span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <AiOutlinePieChart size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Reports
            </span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200 rounded-lg cursor-pointer">
            <TbSettings2 size={24} />
            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
              Settings
            </span>
          </li>
        </ul>
      </nav>
    </div>
    // </div>
  );
};

export default Sidebar;
