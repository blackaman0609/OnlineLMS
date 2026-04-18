import express from "express";
const courseRouter = express.Router();

import {
  createCourse,
  editCourse,
  getCourseById,
  getCreaterCourses,
  getPublishedCourses,
  removeCourse
} from "../controller/courseController.js";

import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

// create course
courseRouter.post("/create", isAuth, createCourse);

// get published courses
courseRouter.get("/published", getPublishedCourses);

// get creator courses
courseRouter.get("/getcreator", isAuth, getCreaterCourses);

// edit course
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);

// get course by id
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);

// delete course
courseRouter.delete("/getcourse/:courseId", isAuth, removeCourse);

// ✅ IMPORTANT
export default courseRouter;