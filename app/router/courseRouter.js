const express = require('express')
const AdminAuthCheck = require("../middleware/AdminAuthCheck")
const CourseController = require("../controllers/CourseController")
const router = express.Router()

router.post("/create", AdminAuthCheck, CourseController.addCourse)
router.post("/edit/:id",AdminAuthCheck,CourseController.editCourse)
router.delete("/delete/:id",AdminAuthCheck,CourseController.deleteCourse)
router.get("/list",CourseController.listCourses)
module.exports = router