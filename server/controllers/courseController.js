import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      // include: {
      //   students: true,
      // },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve courses" });
  }
};

const postCourse = async (req, res) => {
  const { name } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
      },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

export { getCourses, postCourse };
