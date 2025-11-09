const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  marks: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      obtainedMarks: { type: Number }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);