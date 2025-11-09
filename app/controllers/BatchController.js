const Batch = require("../model/batchModel")
const mongoose = require("mongoose")
class BatchController {
    // Add Batch 
    async addBatch(req, res) {
        try {
            const { name, course, startDate, endDate, teacher } = req.body;
            const batch = new Batch({ name, course, startDate, endDate, teacher });
            await batch.save();
            res.status(201).json({ message: 'Batch added successfully', batch });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Assign Students to Batch (Admin Only)
    async assignStudentsToBatch(req, res) {
        // console.log("asssign",req.body);
        try {
            const { batchId, studentIds } = req.body;
            const batch = await Batch.findById(batchId);
            if (!batch) {
                return res.status(404).json({ message: 'Batch not found' });
            }
            batch.students = studentIds;
            await batch.save();
            res.json({ message: 'Students assigned to batch successfully', batch });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // List of Batches
    async listBatches(req, res) {
        try {
            const courseId = req.params.courseId;
            const batches = await Batch.aggregate([
                {
                    $match: { course: new mongoose.Types.ObjectId(courseId) }
                },
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'course',
                        foreignField: '_id',
                        as: 'courseDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'teacher',
                        foreignField: '_id',
                        as: 'teacherDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'students',
                        foreignField: '_id',
                        as: 'studentDetails'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        course: { $arrayElemAt: ['$courseDetails.name', 0] },
                        startDate: 1,
                        endDate: 1,
                        teacher: { $arrayElemAt: ['$teacherDetails.name', 0] },
                        totalStudents: { $size: '$studentDetails' }
                    }
                }
            ]);

            res.json(batches);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // Update Batch Details 
    async updateBatch(req, res) {
        try {
            const { id } = req.params;
            const { name, startDate, endDate, teacher } = req.body;
            const batch = await Batch.findByIdAndUpdate(id, { name, startDate, endDate, teacher }, { new: true });
            if (!batch) {
                return res.status(404).json({ message: 'Batch not found' });
            }
            res.json({ message: 'Batch updated successfully', batch });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete Batch 
    async deleteBatch(req, res) {
        try {
            const { id } = req.params;
            const batch = await Batch.findByIdAndDelete(id);
            if (!batch) {
                return res.status(404).json({ message: 'Batch not found' });
            }
            res.json({ message: 'Batch deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = new BatchController()