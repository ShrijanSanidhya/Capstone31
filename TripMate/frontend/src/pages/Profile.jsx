import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  LogOut,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    totalTrips: 0,
    totalBudget: 0,
    upcomingTrips: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/trips');
        const trips = data.trips || [];
        const now = new Date();

        const totalBudget = trips.reduce((sum, trip) => {
          const b = Number(trip.budget || 0);
          return sum + (isNaN(b) ? 0 : b);
        }, 0);

        const upcoming = trips.filter(trip => {
          const s = trip.startDate ? new Date(trip.startDate) : null;
          return s && s > now;
        }).length;

        setStats({
          totalTrips: trips.length,
          totalBudget,
          upcomingTrips: upcoming
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statCards = [
    {
      icon: MapPin,
      value: stats.totalTrips,
      label: 'Total Trips',
      accent: '#60a5fa' // blue
    },
    {
      icon: Calendar,
      value: stats.upcomingTrips,
      label: 'Upcoming Trips',
      accent: '#a78bfa' // purple
    },
    {
      icon: DollarSign,
      value: `₹${stats.totalBudget.toLocaleString()}`,
      label: 'Total Budget',
      accent: '#34d399' // green
    }
  ];

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : '—';

  return (
    <>
      <style>{`
        :root {
          --glass-bg: rgba(255,255,255,0.14);
          --glass-border: rgba(255,255,255,0.18);
          --muted: #8b8b9a;
          --card-radius: 14px;
        }

        .profile-page {
          min-height: 100vh;
          background: url('https://i.pinimg.com/736x/24/a5/a2/24a5a24e38f5cdba94c085338c75e158.jpg') center/cover no-repeat;
          position: relative;
          padding: 40px 20px 80px;
          display: flex;
          justify-content: center;
        }

        .profile-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6,6,7,0.28), rgba(6,6,7,0.36));
          backdrop-filter: blur(6px);
          z-index: 0;
        }

        .profile-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
        }

        .profile-header {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 28px;
        }

        .avatar {
          width: 110px;
          height: 110px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.06));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(2,6,23,0.45);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(8px);
        }

        .avatar svg {
          color: #eef2ff;
          width: 56px;
          height: 56px;
        }

        .profile-meta {
          color: white;
        }

        .profile-meta h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }

        .profile-meta p {
          margin: 6px 0;
          color: #e6e6ee;
        }

        .profile-meta .muted {
          color: var(--muted);
          display: inline-flex;
          gap: 8px;
          align-items: center;
          margin-top: 6px;
          font-size: 14px;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
          align-items: start;
        }

        /* Left Column */
        .left-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .glass-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          padding: 18px;
          border-radius: var(--card-radius);
          color: #111827;
          backdrop-filter: blur(8px);
          box-shadow: 0 10px 30px rgba(2,6,23,0.4);
        }

        .stats-row {
          display: flex;
          gap: 14px;
        }

        .stat {
          flex: 1;
          padding: 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          display: flex;
          gap: 14px;
          align-items: center;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .stat:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(2,6,23,0.5); }

        .stat .icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: white;
          font-weight: 700;
        }

        .stat .meta {
          color: white;
        }
        .stat .meta .num { font-size: 22px; font-weight: 700; }
        .stat .meta .label { color: var(--muted); font-size: 13px; margin-top: 4px; }

        .card-section {
          display: grid;
          gap: 12px;
        }

        .info-row {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .info-block {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.04);
        }
        .info-block p { margin: 0; color: var(--muted); font-size: 13px; }
        .info-block h3 { margin: 6px 0 0; color: white; font-size: 16px; }

        /* Right column */
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .quick-action {
          display: grid;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.04);
          color: #f8fafc;
          font-weight: 600;
          cursor: pointer;
          transition: transform .15s ease, background .15s ease;
        }
        .action-btn:hover { transform: translateY(-6px); background: rgba(255,255,255,0.04); }

        .logout-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          color: white;
          background: linear-gradient(90deg, #ef4444, #dc2626);
          box-shadow: 0 8px 28px rgba(220,38,38,0.2);
        }

        .small {
          font-size: 13px;
          color: var(--muted);
        }

        /* responsive */
        @media (max-width: 980px) {
          .profile-grid { grid-template-columns: 1fr; }
          .right-column { order: 2; }
          .left-column { order: 1; }
        }

      `}</style>

      <div className="profile-page">
        <div className="profile-container">
          {/* Header */}
          <div className="profile-header">
            <div className="avatar">
              <User />
            </div>

            <div className="profile-meta">
              <h1>{user?.name || 'Your Name'}</h1>
              <p>{user?.email || 'you@example.com'}</p>
              <div className="muted" style={{ marginTop: 8 }}>
                <Mail size={14} style={{ opacity: 0.9 }} />
                <span style={{ marginLeft: 6 }}>{memberSince}</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="profile-grid">
            {/* LEFT */}
            <div className="left-column">

              {/* Stats */}
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#eef2ff' }}>Your Travel Stats</h3>
                    <div className="small" style={{ marginTop: 6 }}>Snapshot of your activity</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#cbd5e1', fontSize: 13 }}>Account</div>
                    <div style={{ color: '#fff', fontWeight: 700 }}>{user?.name ? user.name.split(' ')[0] : ''}</div>
                  </div>
                </div>

                <div className="stats-row">
                  {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div className="stat" key={i}>
                        <div className="icon" style={{ background: `linear-gradient(135deg, ${s.accent}, rgba(0,0,0,0.12))` }}>
                          <Icon color="white" size={20} />
                        </div>
                        <div className="meta">
                          <div className="num">{loading ? '...' : s.value}</div>
                          <div className="label">{s.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Account information */}
              <div className="card-section">
                <div className="glass-card">
                  <h3 style={{ margin: 0, color: '#eef2ff' }}><Award size={16} /> Account Information</h3>
                  <div style={{ marginTop: 12 }}>
                    <div className="info-row" style={{ marginBottom: 12 }}>
                      <div className="info-block">
                        <p>Full Name</p>
                        <h3>{user?.name || '—'}</h3>
                      </div>
                      <div className="info-block">
                        <p>Email</p>
                        <h3>{user?.email || '—'}</h3>
                      </div>
                    </div>

                    <div className="info-row">
                      <div className="info-block">
                        <p>Member Since</p>
                        <h3>{memberSince}</h3>
                      </div>

                      <div className="info-block">
                        <p>Trips Planned</p>
                        <h3>{stats.totalTrips}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insights card */}
                <div className="glass-card">
                  <h3 style={{ margin: 0, color: '#eef2ff' }}><TrendingUp size={16} /> Insights</h3>
                  <div style={{ marginTop: 12 }}>
                    <p className="small">Average spend per trip</p>
                    <h3 style={{ marginTop: 6 }}>{stats.totalTrips ? `₹${Math.round(stats.totalBudget / Math.max(1, stats.totalTrips)).toLocaleString()}` : '—'}</h3>

                    <div style={{ marginTop: 12 }}>
                      <p className="small">Upcoming trips</p>
                      <h3 style={{ marginTop: 6 }}>{stats.upcomingTrips}</h3>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <aside className="right-column">
              <div className="glass-card">
                <h3 style={{ margin: 0, color: '#eef2ff' }}>Quick Actions</h3>
                <div style={{ marginTop: 12 }} className="quick-action">
                  <button className="action-btn" onClick={() => navigate('/my-trips')}>
                    <MapPin size={18} style={{ opacity: 0.95 }} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700 }}>View My Trips</div>
                      <div className="small">Open your trip list</div>
                    </div>
                  </button>

                  <button className="action-btn" onClick={() => navigate('/create-trip')}>
                    <Calendar size={18} style={{ opacity: 0.95 }} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700 }}>Plan New Trip</div>
                      <div className="small">Create travel plans</div>
                    </div>
                  </button>

                  <button className="action-btn" onClick={() => navigate('/explore')}>
                    <TrendingUp size={18} style={{ opacity: 0.95 }} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700 }}>Explore Destinations</div>
                      <div className="small">Find inspiration</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="glass-card">
                <h3 style={{ margin: 0, color: '#eef2ff' }}>Danger Zone</h3>
                <div style={{ marginTop: 12 }}>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: 8 }} />
                    Logout
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
