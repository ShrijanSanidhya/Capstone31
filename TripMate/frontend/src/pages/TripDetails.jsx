import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Calendar,
  MapPin,
  DollarSign,
  Tag,
  ArrowLeft,
  Trash2,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/trips/${id}`);
        setTrip(data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/trip/${id}`);
        setReviews(data);

        if (user) {
          const hasReviewed = data.some(r => r.user?._id === user.id);
          setUserHasReviewed(hasReviewed);
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };
    fetchReviews();
  }, [id, user]);

  const handleDelete = async () => {
    if (window.confirm("Delete this trip permanently?")) {
      try {
        await api.delete(`/trips/${id}`);
        navigate("/my-trips");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
    setUserHasReviewed(true);
  };

  const handleReviewUpdated = (updated) => {
    setReviews(reviews.map(r => (r._id === updated._id ? updated : r)));
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(reviews.filter(r => r._id !== reviewId));
    setUserHasReviewed(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!trip) return <div style={{ textAlign: "center", marginTop: 40 }}>Trip not found.</div>;

  return (
    <>
      <style>{`
        :root {
          --card-bg: rgba(255, 255, 255, 0.12);
          --card-border: rgba(255, 255, 255, 0.18);
          --muted: #b9b9c9;
          --radius: 16px;
        }

        .trip-page {
          max-width: 950px;
          margin: 40px auto;
          padding: 20px;
          color: white;
        }

        .back-btn {
          display: flex;
          gap: 8px;
          align-items: center;
          color: #d1d5db;
          cursor: pointer;
          margin-bottom: 20px;
          font-size: 15px;
          transition: 0.2s;
        }
        .back-btn:hover { color: #fff; }

        /* Main Card */
        .trip-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 0;
          border-radius: var(--radius);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          overflow: hidden;
          margin-bottom: 28px;
        }

        /* Header */
        .trip-header {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 28px;
          color: white;
        }

        .trip-header h1 {
          margin: 0;
          font-size: 34px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trip-header span.type {
          background: rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          backdrop-filter: blur(6px);
        }

        /* Body */
        .trip-body {
          padding: 28px;
        }

        .highlight-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }

        .highlight {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.09);
          padding: 16px;
          border-radius: 12px;
        }

        .highlight h3 {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .highlight p {
          font-size: 26px;
          font-weight: 700;
          margin: 0;
        }

        .desc-title {
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .description {
          color: #e2e2e9;
          white-space: pre-wrap;
          line-height: 1.55;
          font-size: 15px;
          margin-bottom: 30px;
        }

        .action-row {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .edit-btn, .delete-btn {
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          border: 1px solid transparent;
          transition: 0.2s;
        }

        .edit-btn {
          color: #818cf8;
          border-color: #4f46e5;
          background: rgba(79,70,229,0.08);
        }
        .edit-btn:hover { background: rgba(79,70,229,0.18); }

        .delete-btn {
          color: #f87171;
          border-color: #dc2626;
          background: rgba(220,38,38,0.08);
        }
        .delete-btn:hover { background: rgba(220,38,38,0.18); }

        /* Reviews Card */
        .review-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 28px;
          border-radius: var(--radius);
          backdrop-filter: blur(10px);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .review-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
        }

        .login-prompt {
          background: rgba(255,255,255,0.08);
          padding: 24px;
          border-radius: 14px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.06);
          margin-top: 20px;
        }

        .login-btn {
          margin-top: 12px;
          padding: 10px 18px;
          background: #6366f1;
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .login-btn:hover { background: #4f46e5; }

      `}</style>

      <div className="trip-page">
        {/* Back */}
        <div className="back-btn" onClick={() => navigate("/my-trips")}>
          <ArrowLeft size={18} /> Back to My Trips
        </div>

        {/* Main Card */}
        <div className="trip-card">
          {/* Header */}
          <div className="trip-header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                <MapPin size={32} /> {trip.destination}
              </h1>

              <span className="type">{trip.type}</span>
            </div>

            <div style={{ marginTop: 8, opacity: 0.9, display: "flex", gap: 8 }}>
              <Calendar size={18} />
              {format(new Date(trip.startDate), "MMMM d, yyyy")} -{" "}
              {format(new Date(trip.endDate), "MMMM d, yyyy")}
            </div>
          </div>

          {/* Body */}
          <div className="trip-body">
            <div className="highlight-grid">
              <div className="highlight">
                <h3><DollarSign size={14} /> Budget</h3>
                <p>₹{trip.budget}</p>
              </div>

              <div className="highlight">
                <h3><Tag size={14} /> Type</h3>
                <p>{trip.type}</p>
              </div>

              <div className="highlight">
                <h3>Duration</h3>
                <p>
                  {Math.ceil(
                    (new Date(trip.endDate) - new Date(trip.startDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
            </div>

            <div>
              <div className="desc-title">Description</div>
              <div className="description">
                {trip.description || "No description provided."}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-row">
              <div
                className="edit-btn"
                onClick={() => navigate(`/edit-trip/${id}`)}
              >
                <Tag size={16} /> Edit Trip
              </div>

              <div className="delete-btn" onClick={handleDelete}>
                <Trash2 size={16} /> Delete Trip
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="review-card">
          <div className="review-header">
            <MessageSquare size={26} color="#a5b4fc" />
            <h2>Reviews ({reviews.length})</h2>
          </div>

          {/* Review Form */}
          {user && !userHasReviewed && (
            <ReviewForm tripId={id} onReviewAdded={handleReviewAdded} />
          )}

          {/* Review List */}
          <ReviewList
            reviews={reviews}
            onReviewUpdated={handleReviewUpdated}
            onReviewDeleted={handleReviewDeleted}
          />

          {/* Not Logged In */}
          {!user && (
            <div className="login-prompt">
              <p>You must log in to leave a review.</p>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login to Review
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TripDetails;
