import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = user ? [
        { path: '/home', label: 'Home' },
        { path: '/explore', label: 'Explore' },
        { path: '/my-trips', label: 'My Trips' },
        { path: '/profile', label: 'Profile' }
    ] : [
        { path: '/', label: 'Home' },
        { path: '/explore', label: 'Explore' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to={user ? '/home' : '/'} className="navbar-logo">
                    TripMate
                </Link>

                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-2">
                    {user ? (
                        <>
                            <button
                                onClick={() => navigate('/create-trip')}
                                className="btn btn-primary"
                            >
                                New Trip
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
