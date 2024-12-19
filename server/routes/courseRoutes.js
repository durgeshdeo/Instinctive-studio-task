import { Router } from "express";
import { getCourses, postCourse } from "../controllers/courseController.js";

const router = Router();

router.get("/", getCourses);
router.post("/create", postCourse);

export default router;
