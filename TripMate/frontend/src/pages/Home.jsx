import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const features = [
        {
            title: 'Discover Destinations',
            description: 'Explore amazing places around the world'
        },
        {
            title: 'Plan Your Journey',
            description: 'Organize trips with ease'
        },
        {
            title: 'Budget Tracking',
            description: 'Keep expenses under control'
        },
        {
            title: 'Share Experiences',
            description: 'Connect with travelers'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Trips Planned' },
        { value: '5K+', label: 'Happy Travelers' },
        { value: '150+', label: 'Destinations' },
        { value: '4.9/5', label: 'User Rating' }
    ];

    return (
        <div>

            {/* HERO SECTION */}
            <div
                className="hero"
                style={{
                    backgroundImage:
                        "url('https://i.pinimg.com/1200x/bb/4b/2c/bb4b2cc1c6714f3fa3403c7f71136eea.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                    padding: "6rem 0",
                }}
            >
                <div className="container" style={{ textAlign: "center" }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold", textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>
                        Your Next Adventure Awaits
                    </h1>

                    <p style={{ fontSize: "1.25rem", marginTop: "0.5rem", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                        Plan, organize, and track your dream trips with TripMate
                    </p>

                    <div
                        className="flex-center"
                        style={{
                            marginTop: '2rem',
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            flexWrap: "wrap"
                        }}
                    >
                        {user ? (
                            <>
                                <button
                                    onClick={() => navigate('/create-trip')}
                                    className="btn btn-primary"
                                >
                                    Plan a New Trip
                                </button>

                                <button
                                    onClick={() => navigate('/my-trips')}
                                    className="btn btn-secondary"
                                >
                                    View My Trips
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="btn btn-primary"
                                >
                                    Get Started Free
                                </button>

                                <button
                                    onClick={() => navigate('/explore')}
                                    className="btn btn-secondary"
                                >
                                    Explore Trips
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* STATS SECTION */}
            <div style={{ background: 'white', padding: '3rem 0' }}>
                <div className="container">
                    <div
                        className="grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: "1.5rem"
                        }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="card text-center">
                                <div
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold',
                                        color: '#4f46e5',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {stat.value}
                                </div>

                                <div style={{ color: '#666' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div style={{ padding: "3rem 0 2rem", background: "#f8fafc" }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '0.75rem'
                        }}>
                            Why Choose TripMate?
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '1.125rem',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Everything you need to plan the perfect trip
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: "1.5rem",
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}
                    >
                        {/* Feature Card 1 */}
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem',
                                color: '#1e293b'
                            }}>
                                Discover Destinations
                            </h3>
                            <p style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                margin: 0,
                                fontSize: '15px'
                            }}>
                                Explore amazing places around the world
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 87, 108, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                                boxShadow: '0 8px 20px rgba(240, 147, 251, 0.3)'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem',
                                color: '#1e293b'
                            }}>
                                Plan Your Journey
                            </h3>
                            <p style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                margin: 0,
                                fontSize: '15px'
                            }}>
                                Organize trips with ease
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 242, 254, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                                boxShadow: '0 8px 20px rgba(79, 172, 254, 0.3)'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem',
                                color: '#1e293b'
                            }}>
                                Budget Tracking
                            </h3>
                            <p style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                margin: 0,
                                fontSize: '15px'
                            }}>
                                Keep expenses under control
                            </p>
                        </div>

                        {/* Feature Card 4 */}
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(254, 225, 64, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem',
                                boxShadow: '0 8px 20px rgba(250, 112, 154, 0.3)'
                            }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem',
                                color: '#1e293b'
                            }}>
                                Share Experiences
                            </h3>
                            <p style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                margin: 0,
                                fontSize: '15px'
                            }}>
                                Connect with travelers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE GALLERY SECTION */}
            <div style={{ padding: "3rem 0", background: "#fff" }}>
                <div className="container">

                    <div className="text-center mb-6">
                        <h2 className="page-title">Travel Inspirations</h2>
                        <p style={{ color: "#666", fontSize: "1.125rem" }}>
                            Get inspired by breathtaking destinations
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        <div style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                        }}>
                            <img
                                src="https://i.pinimg.com/1200x/99/10/29/9910292732b3627ee6e4fbebbfecb900.jpg"
                                alt="Trip 1"
                                style={{ width: "100%", height: "230px", objectFit: "cover" }}
                            />
                        </div>

                        <div style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                        }}>
                            <img
                                src="https://i.pinimg.com/1200x/e9/06/01/e906016cf2322a03e7159f068e28077c.jpg"
                                alt="Trip 2"
                                style={{ width: "100%", height: "230px", objectFit: "cover" }}
                            />
                        </div>

                        <div style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                        }}>
                            <img
                                src="https://i.pinimg.com/736x/9e/19/4d/9e194da07ff9b214237f4c4b80206433.jpg"
                                alt="Trip 3"
                                style={{ width: "100%", height: "230px", objectFit: "cover" }}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA SECTION */}
            <div className="hero" style={{ padding: '4rem 2rem', textAlign: "center" }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Ready to Start Your Journey?
                    </h2>

                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                        Join thousands of travelers who trust TripMate
                    </p>

                    <button
                        onClick={() => navigate(user ? '/create-trip' : '/register')}
                        className="btn btn-primary"
                        style={{ background: 'white', color: '#4f46e5' }}
                    >
                        {user ? 'Create Your First Trip' : 'Sign Up Now'}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Home;
