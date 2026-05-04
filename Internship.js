const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  supervisor: { type: String, required: true },
  supervisorEmail: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'rejected'],
    default: 'pending'
  },
  documents: [{
    name: String,
    url: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', internshipSchema);