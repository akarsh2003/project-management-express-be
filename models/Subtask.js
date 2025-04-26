const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
}, {
  timestamps: true,
  strictPopulate: false    // 👈 This fixes the error
});

module.exports = mongoose.model('Subtask', subtaskSchema);
