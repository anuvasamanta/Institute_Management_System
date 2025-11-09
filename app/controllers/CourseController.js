const Course = require("../model/courseModel")

class CourseController {
    // add course
    async addCourse(req, res) {
        try {
            const { name, description, duration, fees } = req.body;

            if (!name || !description || !duration || !fees) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const course = new Course({ name, description, duration, fees });
            await course.save();
            res.status(201).json({ message: 'Course added successfully', course });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Edit Course Details 
    async editCourse(req, res) {
        try {
            const { id } = req.params;
            const { name, description, duration, fees } = req.body;
            const course = await Course.findByIdAndUpdate(id, { name, description, duration, fees }, { new: true });
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.json({ message: 'Course updated successfully', course });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete Course (Admin Only)
    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const course = await Course.findByIdAndDelete(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // List of Courses
    async listCourses(req, res) {
        try {
            const courses = await Course.aggregate([
                {
                    $lookup: {
                        from: 'batches',
                        localField: '_id',
                        foreignField: 'course',
                        as: 'batches'
                    }
                },
                {
                    $lookup: {
                        from: 'enrollments',
                        localField: '_id',
                        foreignField: 'course',
                        as: 'enrollments'
                    }
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        duration: 1,
                        fees: 1,
                        totalBatches: { $ifNull: [{ $size: '$batches' }, 0] },
                        totalEnrolledStudents: { $ifNull: [{ $size: '$enrollments' }, 0] }
                    }
                }
            ]);

            res.json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}
module.exports = new CourseController()