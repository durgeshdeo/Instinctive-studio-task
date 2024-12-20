import { Router } from "express";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = Router();

router.get("/", getAllStudents);

router.post("/create", createStudent);

router.put("/update/:id", updateStudent);

router.delete("/delete/:id", deleteStudent);

export default router;
