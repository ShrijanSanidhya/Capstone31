import { useState } from 'react';
import { Star } from 'lucide-react';
import api from '../services/api';

const ReviewForm = ({ tripId, onReviewAdded, existingReview = null, onCancel }) => {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (existingReview) {
                // Update existing review
                const { data } = await api.put(`/reviews/${existingReview._id}`, { rating, comment });
                onReviewAdded(data);
            } else {
                // Create new review
                const { data } = await api.post('/reviews', { tripId, rating, comment });
                onReviewAdded(data);
            }

            // Reset form
            setRating(0);
            setComment('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {existingReview ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Star Rating */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                className={`h-8 w-8 ${star <= (hoveredRating || rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                        {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Share your experience..."
                />
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
                <button
                    type="submit"
                    disabled={loading || rating === 0}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                </button>
                {existingReview && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
