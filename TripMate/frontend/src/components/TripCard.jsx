import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, MapPin, Tag as TagIcon } from 'lucide-react';
import { format } from 'date-fns';

const TripCard = ({ trip }) => {
    const navigate = useNavigate();

    const getDuration = () => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    const getTypeColor = (type) => {
        const colors = {
            Business: 'bg-blue-500',
            Leisure: 'bg-green-500',
            Family: 'bg-pink-500',
            Adventure: 'bg-orange-500'
        };
        return colors[type] || 'bg-gray-500';
    };

    return (
        <div
            onClick={() => navigate(`/trips/${trip._id}`)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
        >
            {/* Header */}
            <div className={`${getTypeColor(trip.type)} p-4`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                        {trip.type}
                    </span>
                    {trip.tags && trip.tags.length > 0 && (
                        <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                            <TagIcon className="h-3 w-3 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">{trip.tags.length}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2 text-white">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <h3 className="text-xl font-bold truncate">{trip.destination}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Date */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">
                            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        {getDuration()} {getDuration() === 1 ? 'day' : 'days'}
                    </span>
                </div>

                {/* Description */}
                {trip.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {trip.description}
                    </p>
                )}

                {/* Tags */}
                {trip.tags && trip.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {trip.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                            >
                                #{tag}
                            </span>
                        ))}
                        {trip.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                +{trip.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Budget */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-lg font-bold text-gray-900">${trip.budget?.toLocaleString()}</p>
                        </div>
                    </div>

                    <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">
                        View →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
