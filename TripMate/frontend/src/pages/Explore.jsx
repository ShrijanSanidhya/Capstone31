import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TripCard from '../components/TripCard';
import Pagination from '../components/Pagination';
import { Search, Filter, MapPin, Loader, Sparkles } from 'lucide-react';

const Explore = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [sort, setSort] = useState('-createdAt');

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/trips', {
                params: { search, type, sort, page }
            });
            setTrips(data.trips);
            setPages(data.pages);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [search, type, sort, page]);

    return (
        <div style={{ background: "#fafafa", minHeight: "100vh" }}>

            {/* HERO SECTION */}
            <div
                style={{
                    height: "60vh",
                    backgroundImage: `url('https://i.pinimg.com/1200x/ae/72/36/ae72360755cf813f1358c529af7b2965.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.45)"
                    }}
                />

                <div style={{ position: "relative", textAlign: "center", color: "white" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            padding: "14px",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(4px)",
                            borderRadius: "16px",
                            marginBottom: "1rem"
                        }}
                    >
                        <Sparkles size={36} color="white" />
                    </div>

                    <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                        Explore Amazing Destinations
                    </h1>

                    <p style={{
                        fontSize: "1.2rem",
                        maxWidth: "650px",
                        margin: "0 auto",
                        color: "#e8e8e8"
                    }}>
                        Discover trips and get inspired for your next adventure
                    </p>

                    <MapPin
                        size={150}
                        style={{
                            opacity: 0.18,
                            position: "absolute",
                            right: "10%",
                            bottom: "10%"
                        }}
                    />
                </div>
            </div>

            {/* FILTER CARD */}
            <div className="container" style={{ marginTop: "-3rem", marginBottom: "2.5rem" }}>
                <div
                    style={{
                        padding: "1.5rem",
                        borderRadius: "1.2rem",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                        color: "white",
                    }}
                >
                    <h3 style={{
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        marginBottom: "1rem"
                    }}>
                        Filters
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem"
                        }}
                    >
                        {/* Search */}
                        <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
                            <Search
                                size={18}
                                style={{
                                    position: "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#666"
                                }}
                            />
                            <input
                                placeholder="Search destinations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 14px 12px 45px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: "white",
                                    fontSize: "0.9rem"
                                }}
                            />
                        </div>

                        {/* Type */}
                        <div style={{ minWidth: "180px", position: "relative" }}>
                            <Filter
                                size={18}
                                style={{
                                    position: "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#666"
                                }}
                            />
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 14px 12px 45px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: "white",
                                    fontSize: "0.9rem"
                                }}
                            >
                                <option value="">All Types</option>
                                <option value="Business">Business</option>
                                <option value="Leisure">Leisure</option>
                                <option value="Family">Family</option>
                                <option value="Adventure">Adventure</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{
                                minWidth: "180px",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "none",
                                background: "white",
                                fontSize: "0.9rem"
                            }}
                        >
                            <option value="-createdAt">Newest First</option>
                            <option value="createdAt">Oldest First</option>
                            <option value="budget">Budget (Low to High)</option>
                            <option value="-budget">Budget (High to Low)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TRIPS LIST */}
            <div className="container" style={{ paddingBottom: "3rem" }}>
                {loading ? (
                    <div style={{
                        textAlign: "center",
                        padding: "4rem 0"
                    }}>
                        <Loader size={38} className="spinner" />
                        <p style={{ color: "#666", marginTop: "1rem" }}>Loading trips...</p>
                    </div>
                ) : trips.length > 0 ? (
                    <>
                        <div style={{ color: "#666", marginBottom: "1rem" }}>
                            Page {page} of {pages}
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: "1.5rem"
                            }}
                        >
                            {trips.map((trip) => (
                                <TripCard key={trip._id} trip={trip} />
                            ))}
                        </div>

                        {pages > 1 && (
                            <div style={{ marginTop: "1.5rem" }}>
                                <Pagination page={page} pages={pages} onPageChange={setPage} />
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "3rem 0" }}>
                        <MapPin size={50} color="#bbb" />
                        <h3 style={{ marginTop: "1rem", fontSize: "1.4rem" }}>No trips found</h3>

                        <button
                            onClick={() => navigate('/create-trip')}
                            className="btn btn-primary"
                            style={{ marginTop: "1.2rem" }}
                        >
                            Create Your First Trip
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Explore;
