const Subtask = require('../models/Subtask');
const Project = require('../models/Project');

// Create & assign subtask
exports.createSubtask = async (req, res) => {
  const { title, description, assignedTo, projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const subtask = new Subtask({
      title,
      description,
      assignedTo,
      project: projectId
    });

    await subtask.save();

    project.subtasks.push(subtask._id);
    await project.save();

    res.status(201).json(subtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View subtasks assigned to logged-in user
exports.getAssignedSubtasks = async (req, res) => {
  try {
    const subtasks = await Subtask.find({ assignedTo: req.user._id })
      .populate('project', 'title')
      .populate('assignedTo', 'name email');

    res.json(subtasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark subtask as completed
exports.completeSubtask = async (req, res) => {
  const { subtaskId } = req.params;

  try {
    const subtask = await Subtask.findById(subtaskId);
    if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

    if (!subtask.assignedTo.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    subtask.status = 'completed';
    await subtask.save();

    res.json({ message: 'Subtask marked as completed', subtask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
