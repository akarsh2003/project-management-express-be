const User = require('../models/User');
const Project = require('../models/Project');
const Subtask = require('../models/Subtask');

// Get all projects with status
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'name email')
      .populate('subtasks')
      .populate('reviewer', 'name');

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve a completed project
exports.approveProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.status !== 'completed') {
      return res.status(400).json({ message: 'Project is not yet completed' });
    }

    project.reviewed = true;
    project.reviewer = req.user._id;

    await project.save();

    res.json({ message: 'Project approved', project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all users and their project completion status
exports.getUsersProgress = async (req, res) => {
  try {
    const users = await User.find();

    const userStats = await Promise.all(
      users.map(async (user) => {
        const projects = await Project.find({ owner: user._id });
        const completed = projects.filter(p => p.status === 'completed').length;

        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          totalProjects: projects.length,
          completedProjects: completed
        };
      })
    );

    res.json(userStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
