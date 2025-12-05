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
                const { data } = await api.put(`/reviews/${existingReview._id}`, { rating, comment });
                onReviewAdded(data);
            } else {
                const { data } = await api.post('/reviews', { tripId, rating, comment });
                onReviewAdded(data);
            }

            setRating(0);
            setComment('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '14px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                marginBottom: '20px'
            }}
        >
            <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Star size={20} color="#6366f1" fill="#6366f1" />
                {existingReview ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            {error && (
                <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}

            {/* Star Rating */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '10px'
                }}>
                    Rating
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                transition: 'transform 0.2s',
                                outline: 'none'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        >
                            <Star
                                size={32}
                                color={star <= (hoveredRating || rating) ? '#fbbf24' : '#cbd5e1'}
                                fill={star <= (hoveredRating || rating) ? '#fbbf24' : 'none'}
                                style={{ transition: 'all 0.2s' }}
                            />
                        </button>
                    ))}
                    <span style={{
                        marginLeft: '8px',
                        fontSize: '14px',
                        color: '#64748b',
                        fontWeight: '500'
                    }}>
                        {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                </div>
            </div>

            {/* Comment */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '10px'
                }}>
                    Your Experience
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="4"
                    placeholder="Share your experience with this trip..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        background: 'white'
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    type="submit"
                    disabled={loading || rating === 0}
                    style={{
                        flex: 1,
                        background: loading || rating === 0
                            ? '#cbd5e1'
                            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '10px',
                        fontSize: '15px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: loading || rating === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: loading || rating === 0 ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading && rating > 0) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = loading || rating === 0 ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)';
                    }}
                >
                    {loading ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                </button>
                {existingReview && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#64748b',
                            background: 'white',
                            border: '2px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f8fafc';
                            e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
