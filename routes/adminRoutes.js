const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  approveProject,
  getUsersProgress
} = require('../controllers/adminController');

const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

router.get('/projects', protect, isAdmin, getAllProjects);
router.put('/projects/approve/:projectId', protect, isAdmin, approveProject);
router.get('/users/progress', protect, isAdmin, getUsersProgress);

module.exports = router;
