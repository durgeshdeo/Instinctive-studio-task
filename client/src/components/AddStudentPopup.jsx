import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createStudent } from "../features/studentSlice";
import { useDispatch } from "react-redux";
const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cohort: z.enum(["AY 2024", "AY 2025"], "Cohort is required"),
  course: z.array(z.string()).min(1, "Course is required"),
  status: z.enum(["Active", "Inactive"], "Status is required"),
});

const AddStudentPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      cohort: "AY 2024",
      course: [],
      status: "Active",
    },
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const modifiedData = {
      ...data,
      courseId: data.course,
    };

    try {
      const result = await dispatch(createStudent(modifiedData));

      if (result.type === "students/createStudent/fulfilled") {
        onClose();
        toast("Student added successfully");
      } else {
        toast("Error adding student");
      }
    } catch (error) {
      console.error(error);
      toast("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-lg md:w-[50rem] h-[30rem]">
        <h2 className="text-xl mb-4">Add Student</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter student name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="cohort" className="block text-sm font-medium mb-2">
              Cohort
            </label>
            <Select
              onValueChange={(value) => setValue("cohort", value)}
              defaultValue="AY 2024"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cohort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AY 2024">AY 2024</SelectItem>
                <SelectItem value="AY 2025">AY 2025</SelectItem>
              </SelectContent>
            </Select>
            {errors.cohort && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cohort.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium mb-2">
              Course
            </label>
            <ReactSelect
              isMulti
              onChange={(selectedOptions) =>
                setValue(
                  "course",
                  selectedOptions.map((option) => option.value)
                )
              }
              options={courses.map((course) => ({
                value: course.id,
                label: course.name,
              }))}
            />
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue="Active"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {loading == true ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddStudentPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddStudentPopup;
