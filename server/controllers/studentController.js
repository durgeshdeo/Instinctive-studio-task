import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true,
      },
    });
    res.status(200).json(students);
    console.log(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

//used this to add dummy data to the database
export const createStudent = async (req, res) => {
  const studentsData = req.body;

  try {
    const students = await Promise.all(
      studentsData.map(async (student) => {
        const { name, cohort, status, courseId } = student;
        return await prisma.student.create({
          data: {
            name,
            cohort,
            status,
            courses: {
              connect: courseId.map((id) => ({ id })),
            },
          },
        });
      })
    );
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to create students" });
  }
};
