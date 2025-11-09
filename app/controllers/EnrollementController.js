const Enrollment = require("../model/enrollmentModel")
const Attendance = require("../model/attendenceModel")
class EnrollmentController {

    // enrollement
    async enrollStudent(req, res) {
        try {
            const { studentId, courseId } = req.body;
            const enrollment = new Enrollment({ student: studentId, course: courseId });
            await enrollment.save();
            res.json({ message: 'Student enrolled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // attendance
    async markAttendance(req, res) {
        try {
            const { batchId, attendance } = req.body;
            const attendanceRecord = new Attendance({ batch: batchId, attendance });
            await attendanceRecord.save();
            res.json({ message: 'Attendance marked successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async viewAttendance(req, res) {
        try {
            const { studentId, batchId } = req.query;
            let attendance;
            if (studentId) {
                attendance = await Attendance.find({ 'attendance.student': studentId });
            } else if (batchId) {
                attendance = await Attendance.find({ batch: batchId });
            } else {
                attendance = await Attendance.find();
            }
            res.json(attendance);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}
module.exports = new EnrollmentController()