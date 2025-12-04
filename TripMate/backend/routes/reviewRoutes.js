const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createReview,
    getReviewsByTrip,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Public route
router.get('/trip/:tripId', getReviewsByTrip);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
