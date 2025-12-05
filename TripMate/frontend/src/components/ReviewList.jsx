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
            <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '2px dashed #cbd5e1'
            }}>
                <Star size={40} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '500' }}>
                    No reviews yet. Be the first to review this trip!
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                        <div style={{
                            background: 'white',
                            borderRadius: '14px',
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '14px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* Avatar */}
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                                    }}>
                                        <User size={20} color="white" strokeWidth={2.5} />
                                    </div>

                                    {/* User Info */}
                                    <div>
                                        <p style={{
                                            fontWeight: '600',
                                            color: '#1e293b',
                                            fontSize: '15px',
                                            margin: 0
                                        }}>
                                            {review.user?.name}
                                        </p>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#94a3b8',
                                            margin: '2px 0 0 0'
                                        }}>
                                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {user && review.user?._id === user.id && (
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button
                                            onClick={() => setEditingReview(review)}
                                            style={{
                                                padding: '8px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                background: '#f8fafc',
                                                color: '#64748b',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#eef2ff';
                                                e.currentTarget.style.color = '#6366f1';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.color = '#64748b';
                                            }}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            style={{
                                                padding: '8px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                background: '#f8fafc',
                                                color: '#64748b',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fef2f2';
                                                e.currentTarget.style.color = '#dc2626';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f8fafc';
                                                e.currentTarget.style.color = '#64748b';
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Star Rating */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginBottom: '12px'
                            }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        color={star <= review.rating ? '#fbbf24' : '#cbd5e1'}
                                        fill={star <= review.rating ? '#fbbf24' : 'none'}
                                    />
                                ))}
                                <span style={{
                                    marginLeft: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#475569',
                                    background: '#f8fafc',
                                    padding: '2px 8px',
                                    borderRadius: '6px'
                                }}>
                                    {review.rating}/5
                                </span>
                            </div>

                            {/* Comment */}
                            <p style={{
                                color: '#475569',
                                lineHeight: '1.6',
                                fontSize: '15px',
                                margin: 0
                            }}>
                                {review.comment}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
