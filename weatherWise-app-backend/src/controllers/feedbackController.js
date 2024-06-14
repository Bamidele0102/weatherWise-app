const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    const { comment, rating } = req.body;
    const userId = req.user.id;

    try {
        const feedback = await Feedback.create({ userId, comment, rating });
        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Error submitting feedback. Please try again.' });
    }
};

module.exports = {
    submitFeedback
};
