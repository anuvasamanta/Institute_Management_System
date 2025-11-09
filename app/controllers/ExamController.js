const Exam = require("../model/examModel")
const mongoose = require('mongoose');
class ExamController {
    // create exam
    async createExam(req, res) {
        try {
            const { name, batch, date, duration, totalMarks } = req.body;
            const exam = new Exam({
                name,
                batch,
                date,
                duration,
                totalMarks,
                marks: []
            });
            await exam.save();
            res.json({ message: 'Exam created successfully', exam });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // assign marks
    async assignMarks(req, res) {
        try {
            const examId = req.params.examId;
            const { studentId, obtainedMarks } = req.body;
            const exam = await Exam.findById(examId);
            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }
            exam.marks.push({ student: studentId, obtainedMarks });
            await exam.save();
            res.json({ message: 'Marks assigned successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // fetch result

    async fetchExamResults(req, res) {
        try {
            const examId = req.params.examId;
            if (!examId) {
                return res.status(400).json({ message: 'Exam ID is required' });
            }

            const exam = await Exam.aggregate([
                {
                   $match: { _id: new mongoose.Types.ObjectId(examId) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'marks.student',
                        foreignField: '_id',
                        as: 'studentDetails'
                    }
                },
                {
                    $project: {
                        name: 1,
                        batch: 1,
                        date: 1,
                        duration: 1,
                        totalMarks: 1,
                        marks: {
                            $map: {
                                input: '$marks',
                                as: 'mark',
                                in: {
                                    student: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$studentDetails',
                                                    as: 'student',
                                                    cond: { $eq: ['$$student._id', '$$mark.student'] }
                                                }
                                            },
                                            0
                                        ]
                                    },
                                    obtainedMarks: '$$mark.obtainedMarks'
                                }
                            }
                        }
                    }
                }
            ]);

            if (!exam.length) {
                return res.status(404).json({ message: 'Exam not found' });
            }

            res.json(exam[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}
module.exports = new ExamController()