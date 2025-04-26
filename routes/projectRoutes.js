const express = require('express');
const router = express.Router();
const {
  createProject,
  getUserProjects,
  getCompletedProjects,
  checkProjectStatus
} = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createProject);
router.get('/my-projects', protect, getUserProjects);
router.get('/completed', protect, getCompletedProjects);
router.get('/check-status/:projectId', protect, checkProjectStatus);

module.exports = router;
