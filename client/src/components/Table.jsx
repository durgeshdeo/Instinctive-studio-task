import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  updateStudent,
  filterStudents,
} from "../features/studentSlice";
import AddStudentPopup from "./AddStudentPopup";

const TableList = () => {
  const dispatch = useDispatch();
  const { filteredStudents } = useSelector((state) => state.students);

  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelOpen2, setIsModelOpen2] = useState(false);

  const togglePopup = () => {
    setIsModelOpen2(!isModelOpen2);
  };
  const [currentStudent, setCurrentStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const [openRow, setOpenRow] = useState(null);

  const handleRowClick = (id) => {
    setOpenRow(openRow === id ? null : id);
  };
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      filterStudents({ cohort: selectedCohort, course: selectedCourse })
    );
  }, [selectedCohort, selectedCourse, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id)).then((result) => {
      if (result.error) {
        toast("Error deleting student");
      } else {
        toast("Student deleted successfully");
      }
    });
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setUpdatedName(student.name);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    dispatch(updateStudent({ id: currentStudent.id, name: updatedName })).then(
      (result) => {
        if (result.error) {
          toast("Error updating student");
        } else {
          setIsModalOpen(false);
          toast("Student updated successfully");
        }
      }
    );
  };

  // console.log(filteredStudents);

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
              <DropdownMenuItem onClick={() => setSelectedCohort("AY 2024")}>
                AY 2024
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCohort("AY 2025")}>
                AY 2025
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCohort("")}>
                All Cohorts
              </DropdownMenuItem>
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
              <DropdownMenuItem onClick={() => setSelectedCourse("Maths")}>
                Maths
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCourse("Science")}>
                Science
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCourse("")}>
                All Courses
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          className="bg-gray-600 hover:bg-gray-400 text-white"
          onClick={() => setIsModelOpen2(true)}
        >
          <FiPlus size={16} />
          Add Student
        </Button>
      </div>
      <div className="mt-6 overflow-x-scroll container conatinerr mb-6">
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {filteredStudents?.map((student) => (
            <tbody
              key={student.id}
              className="bg-white divide-y divide-gray-200"
            >
              <tr onClick={() => handleRowClick(student.id)}>
                <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900 ">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 ">
                  {student.cohort}
                </td>
                <td className="px-6 flex gap-2 py-4 whitespace-normal text-sm text-gray-500 ">
                  {student?.courses?.map((course) => (
                    <div
                      key={course.id}
                      className="flex py-1 px-4 bg-gray-100 rounded-lg"
                    >
                      {course.name}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 ">
                  {format(student.dateJoined, "dd MMM, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 ">
                  {format(student.lastLogin, "dd MMM, yyyy h:mm a")}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 text-center">
                  {student.status == "Active" ? (
                    <div className="bg-green-500 rounded-full w-3 h-3 mx-auto"></div>
                  ) : (
                    <div className="bg-red-500 rounded-full w-3 h-3 mx-auto"></div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-2">
                        <BsThreeDotsVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    {openRow === student.id && (
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(student)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Edit Student Name</h2>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </div>
      )}
      {isModelOpen2 && <AddStudentPopup onClose={togglePopup} />}
    </div>
  );
};

export default TableList;
