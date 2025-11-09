const StatusCode = require("../helper/statusCode")
const { sendStudentReport } = require('../helper/studentMail');
const Student=require("../model/userModel")
const Attendance=require("../model/attendenceModel")
const Exam=require("../model/examModel")
class AdminController {

    async checkAuthAdmin(req, res, next) {
        try {
            if (req.admin) {
                next()
            } else {
                res.redirect('/login/user')
            }

        } catch (error) {
            console.log(error);

        }

    }

    async sendReport(req, res) {
        try {
            const studentId = req.params.studentId;
            const student = await Student.findById(studentId);
            const attendance = await Attendance.find({ student: studentId });
            const exams = await Exam.find({ 'marks.student': studentId });

            const studentData = {
                name: student.name,
                email: student.email,
                attendance: attendance.map((record) => ({
                    date: record.date,
                    status: record.status
                })),
                exams: exams.map((exam) => ({
                    name: exam.name,
                    marks: exam.marks.find((mark) => mark.student.toString() === studentId),
                    totalMarks: exam.totalMarks
                }))
            };

            await sendStudentReport(studentData);
            res.json({ message: 'Report sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // logout Admin
    async logoutAdmin(req, res) {
        try {
            res.clearCookie('adminToken')
            return res.status(StatusCode.CREATED).json({
                message: "Admin Logout Successfully!"
            })

        } catch (error) {
            return res.status(401).json({ message: "Internal Server Error" })
        }
    }

}


module.exports = new AdminController()