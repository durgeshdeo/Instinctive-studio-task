import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

const TableList = () => {
  return (
    <div className="bg-white mt-8 rounded-lg">
      <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-between md:items-center p-4 ">
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Select Cohort
                <FaChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Courses
                <FaChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-400 text-white">
          <FiPlus size={16} />
          Add Student
        </Button>
      </div>
      <div className="mt-6 w-full overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cohort
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                John Doe
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                AY-2023
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                Math, Science
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                01/01/2023
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                01/10/2023
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
