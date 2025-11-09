const express = require('express')
const ExamController = require('../controllers/ExamController')
const AdminAuthCheck=require("../middleware/AdminAuthCheck")
const TeacherAuthCheck=require("../middleware/TeacherAuthCheck")
const router = express.Router()

router.post("/create",TeacherAuthCheck,ExamController.createExam)
router.post("/marks/:examId",TeacherAuthCheck,ExamController.assignMarks)
router.get("/result/:examId",ExamController.fetchExamResults)
module.exports = router
