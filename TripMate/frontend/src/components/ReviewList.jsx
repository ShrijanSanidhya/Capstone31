import { useState } from 'react';
import { Star, Edit2, Trash2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import api from '../services/api';
import ReviewForm from './ReviewForm';

const ReviewList = ({ reviews, onReviewUpdated, onReviewDeleted }) => {
    const { user } = useAuth();
    const [editingReview, setEditingReview] = useState(null);

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            await api.delete(`/reviews/${reviewId}`);
            onReviewDeleted(reviewId);
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    const handleReviewUpdated = (updatedReview) => {
        onReviewUpdated(updatedReview);
        setEditingReview(null);
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No reviews yet. Be the first to review this trip!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review._id}>
                    {editingReview?._id === review._id ? (
                        <ReviewForm
                            tripId={review.trip}
                            existingReview={review}
                            onReviewAdded={handleReviewUpdated}
                            onCancel={() => setEditingReview(null)}
                        />
                    ) : (
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                                        <User className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.user?.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>

                                {/* Edit/Delete buttons for own reviews */}
                                {user && review.user?._id === user.id && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setEditingReview(review)}
                                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center space-x-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-5 w-5 ${star <= review.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    {review.rating}/5
                                </span>
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
