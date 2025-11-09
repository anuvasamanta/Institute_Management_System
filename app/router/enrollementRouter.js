const express = require('express')
const EnrollmentController = require('../controllers/EnrollementController')
const AdminAuthCheck=require("../middleware/AdminAuthCheck")
const TeacherAuthCheck=require("../middleware/TeacherAuthCheck")
const router = express.Router()

router.post("/student",EnrollmentController.enrollStudent)
router.post("/student/attendance",TeacherAuthCheck,EnrollmentController.markAttendance)
router.get("/student/viewAttendance/:studentId",EnrollmentController.viewAttendance)
router.get("/student/viewAttendance/:batchId",EnrollmentController.viewAttendance)

module.exports = router
