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
            <div className="page" style={{ padding: "3rem 0" }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="page-title">Why Choose TripMate?</h2>
                        <p style={{ color: '#666', fontSize: '1.125rem' }}>
                            Everything you need to plan the perfect trip
                        </p>
                    </div>

                    <div
                        className="grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: "1.5rem"
                        }}
                    >
                        {features.map((feature, index) => (
                            <div key={index} className="card">
                                <h3
                                    style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {feature.title}
                                </h3>

                                <p style={{ color: '#666' }}>{feature.description}</p>
                            </div>
                        ))}
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
