const Project = require('../models/Project');
const Subtask = require('../models/Subtask');

// Create a project
exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = new Project({
      title,
      description,
      owner: req.user._id,
      reviewer: null // admin can be assigned later
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all projects created by the user
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id })
      .populate('subtasks')
      .populate('reviewer', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get completed projects
exports.getCompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id, status: 'completed' });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update project status (auto check if all subtasks completed)
exports.checkProjectStatus = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate('subtasks');

    const allCompleted = project.subtasks.every(subtask => subtask.status === 'completed');

    if (allCompleted && project.status !== 'completed') {
      project.status = 'completed';
      await project.save();
    }

    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
