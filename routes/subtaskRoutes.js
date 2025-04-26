const express = require('express');
const router = express.Router();
const {
  createSubtask,
  getAssignedSubtasks,
  completeSubtask
} = require('../controllers/subtaskController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSubtask);
router.get('/assigned', protect, getAssignedSubtasks);
router.put('/complete/:subtaskId', protect, completeSubtask);

module.exports = router;
