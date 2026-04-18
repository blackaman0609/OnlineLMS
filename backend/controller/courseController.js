import Course from "../model/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

//create course
const createCourse = async (req, res) => {
  //course is collection
  try {
    const { title, category } = req.body; //req.body brings data from frontend to backend

    if (!title || !category) {
      return res.status(400).json({
        message: "title or category is required",
      });
    }

    const course = await Course.create({
      title,
      category,
      creater: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      //internal server error
      success: false,
      message: error.message,
    });
  }
};

//get published courses
const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "Courses not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      //internal server error
      success: false,
      message: error.message,
    });
  }
};

//get creater courses
const getCreaterCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creater: userId });
    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "Courses not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      //internal server error
      success: false,
      message: error.message,
    });
  }
};

//edit course
const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path); //uploadOnCloudinary usually refers to a function used to upload files (images/videos) to the Cloudinary cloud storage service from your backend.
    }
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Courses not found",
      });
    }
    let updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      //internal server error
      success: false,
      message: error.message,
    });
  }
};

//get course by id
const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Courses not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      //internal server error
      success: false,
      message: error.message,
    });
  }
};

//delete course
const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createCourse,
  getPublishedCourses,
  getCreaterCourses,
  editCourse,
  getCourseById,
  removeCourse,
};
