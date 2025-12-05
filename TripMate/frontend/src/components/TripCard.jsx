import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, MapPin, Tag as TagIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const TripCard = ({ trip }) => {
    const navigate = useNavigate();

    const getDuration = () => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    const getTypeGradient = (type) => {
        const gradients = {
            Business: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            Leisure: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            Family: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            Adventure: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        };
        return gradients[type] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    };

    const headerStyle = {
        background: getTypeGradient(trip.type),
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
    };

    const badgeStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#1f2937',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div
            onClick={() => navigate(`/trips/${trip._id}`)}
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
        >
            {/* Header with Gradient */}
            <div style={headerStyle}>
                <div style={overlayStyle}></div>

                <div style={{ position: 'relative', zIndex: 10 }}>
                    {/* Type and Tags Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={badgeStyle}>{trip.type}</span>
                        {trip.tags && trip.tags.length > 0 && (
                            <div style={{
                                ...badgeStyle,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <TagIcon size={12} />
                                <span>{trip.tags.length}</span>
                            </div>
                        )}
                    </div>

                    {/* Destination */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MapPin size={24} color="white" strokeWidth={2.5} />
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: '700',
                            color: 'white',
                            margin: 0,
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {trip.destination}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
                {/* Dates Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="#6366f1" />
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>
                            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                    </div>
                    <span style={{
                        background: '#eef2ff',
                        color: '#4f46e5',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                    }}>
                        {getDuration()} {getDuration() === 1 ? 'day' : 'days'}
                    </span>
                </div>

                {/* Description */}
                {trip.description && (
                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        lineHeight: '1.6',
                        marginBottom: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {trip.description}
                    </p>
                )}

                {/* Tags */}
                {trip.tags && trip.tags.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        {trip.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                style={{
                                    background: '#f1f5f9',
                                    color: '#475569',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                        {trip.tags.length > 3 && (
                            <span style={{
                                background: '#f1f5f9',
                                color: '#475569',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '500',
                            }}>
                                +{trip.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Budget and View Button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '16px',
                    borderTop: '1px solid #e2e8f0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}>
                            <DollarSign size={20} color="white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p style={{
                                fontSize: '11px',
                                color: '#94a3b8',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Budget
                            </p>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#0f172a',
                                margin: '2px 0 0 0'
                            }}>
                                ₹{trip.budget?.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <button
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                        }}
                    >
                        View <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
