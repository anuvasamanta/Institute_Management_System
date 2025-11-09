const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    date: { type: Date, default: Date.now },
    attendance: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            present: { type: Boolean }
        }
    ]
}, {
    timestamps: true
});


module.exports = mongoose.model('Attendance', attendanceSchema);