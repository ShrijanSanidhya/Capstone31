import { useState, useEffect } from "react";
import { Search, Filter, Plus, ArrowUpDown } from "lucide-react";
import TripCard from "../components/TripCard";
import Pagination from "../components/Pagination";
import api from "../services/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("-createdAt");

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const { data } = await api.get("/trips", {
                    params: { page, search, type, sort },
                });
                setTrips(data.trips);
                setPages(data.pages);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrips();
    }, [page, search, type, sort]);

    return (
        <div className="dash-container">

            {/* HERO SECTION */}
            <div className="dash-hero">
                <div className="dash-overlay"></div>

                <div className="dash-hero-content">
                    <h1>Your Travel Dashboard</h1>
                    <p>Plan, manage & track all your adventures in one place ✈️</p>

                    <button
                        className="dash-add-btn"
                        onClick={() => navigate("/create-trip")}
                    >
                        <Plus size={20} />
                        New Trip
                    </button>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="dash-filters-container">

                <div className="dash-filters">

                    {/* SEARCH */}
                    <div className="dash-input-box">
                        <Search className="dash-input-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search your trips..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* TYPE */}
                    <div className="dash-input-box">
                        <Filter className="dash-input-icon" size={18} />
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">All Types</option>
                            <option value="Business">Business</option>
                            <option value="Leisure">Leisure</option>
                            <option value="Family">Family</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                    </div>

                    {/* SORT */}
                    <div className="dash-input-box">
                        <ArrowUpDown className="dash-input-icon" size={18} />
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="-createdAt">Newest First</option>
                            <option value="createdAt">Oldest First</option>
                            <option value="budget">Budget (Low → High)</option>
                            <option value="-budget">Budget (High → Low)</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* TRIPS LIST */}
            <div className="dash-results">

                {trips.length > 0 ? (
                    <>
                        <h2 className="dash-results-count">
                            Showing <span>{trips.length}</span> trip(s)
                        </h2>

                        <div className="dash-grid">
                            {trips.map((trip) => (
                                <TripCard key={trip._id} trip={trip} />
                            ))}
                        </div>

                        {pages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={pages}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                ) : (
                    <div className="dash-empty">
                        <Plus size={40} />
                        <h3>No trips found</h3>
                        <p>Start creating your next adventure!</p>
                        <button
                            className="dash-primary-btn"
                            onClick={() => navigate("/create-trip")}
                        >
                            Create Trip
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
