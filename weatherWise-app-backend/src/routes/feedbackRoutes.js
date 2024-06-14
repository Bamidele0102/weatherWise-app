const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define the POST route for feedback
router.post('/', authMiddleware, feedbackController.submitFeedback);

module.exports = router;
