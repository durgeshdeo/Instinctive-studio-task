import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true,
      },
      orderBy: {
        dateJoined: "desc",
      },
    });
    res.status(200).json(students);
    // console.log(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const createStudent = async (req, res) => {
  const { name, cohort, status, courseId } = req.body;

  // console.log(req.body);

  try {
    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        status,
        courses: {
          connect: courseId.map((id) => ({ id })),
        },
      },
      include: {
        courses: true,
      },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create student" });
  }
};

//used this to add dummy data to the database
export const createStudents = async (req, res) => {
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

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: id },
      data: { name },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student name" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    await prisma.student.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};
