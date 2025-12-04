const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { tripId, rating, comment } = req.body;

        // Check if user already reviewed this trip
        const existingReview = await Review.findOne({ trip: tripId, user: req.user.id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this trip' });
        }

        const review = await Review.create({
            trip: tripId,
            user: req.user.id,
            rating,
            comment
        });

        const populatedReview = await Review.findById(review._id)
            .populate('user', 'name email')
            .populate('trip', 'destination');

        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all reviews for a trip
exports.getReviewsByTrip = async (req, res) => {
    try {
        const { tripId } = req.params;

        const reviews = await Review.find({ trip: tripId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns this review
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save();

        const populatedReview = await Review.findById(review._id)
            .populate('user', 'name email')
            .populate('trip', 'destination');

        res.json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns this review
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
