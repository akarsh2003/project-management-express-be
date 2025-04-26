const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true,
  strictPopulate: false
 });

module.exports = mongoose.model('Project', projectSchema);
