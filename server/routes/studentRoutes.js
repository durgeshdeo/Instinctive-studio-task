import { Router } from "express";
import {
  getAllStudents,
  createStudent,
} from "../controllers/studentController.js";

const router = Router();

router.get("/", getAllStudents);

router.post("/create", createStudent);

export default router;
