import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage:
                    "url('https://i.pinimg.com/1200x/ef/3c/81/ef3c8175242b7cb1368be14fe7d619a1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "20px",
            }}
        >

            {/* CARD */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    background: "rgba(255, 255, 255, 0.85)",
                    padding: "2.5rem",
                    borderRadius: "20px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    backdropFilter: "blur(12px)",
                    animation: "float 3s ease-in-out infinite"
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: "0.5rem",
                        color: "#333"
                    }}
                >
                    Create Your Account
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "1.5rem"
                    }}
                >
                    Start planning your dream journeys ✈️
                </p>

                {error && (
                    <div
                        style={{
                            background: "#ffe6e6",
                            border: "1px solid #ffb3b3",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            marginBottom: "1rem",
                            color: "#cc0000",
                            fontWeight: "500",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.2rem" }}>

                    {/* NAME */}
                    <div>
                        <label style={{ fontWeight: "600", color: "#333", marginBottom: "6px", display: "block" }}>
                            Full Name
                        </label>

                        <div style={{ position: "relative" }}>
                            <User
                                size={20}
                                style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#777"
                                }}
                            />
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 12px 12px 42px",
                                    borderRadius: "10px",
                                    border: "2px solid #ddd",
                                    outline: "none",
                                    fontSize: "1rem",
                                    transition: "0.2s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label style={{ fontWeight: "600", color: "#333", marginBottom: "6px", display: "block" }}>
                            Email Address
                        </label>

                        <div style={{ position: "relative" }}>
                            <Mail
                                size={20}
                                style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#777"
                                }}
                            />
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 12px 12px 42px",
                                    borderRadius: "10px",
                                    border: "2px solid #ddd",
                                    outline: "none",
                                    fontSize: "1rem",
                                    transition: "0.2s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label style={{ fontWeight: "600", color: "#333", marginBottom: "6px", display: "block" }}>
                            Password
                        </label>

                        <div style={{ position: "relative" }}>
                            <Lock
                                size={20}
                                style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#777"
                                }}
                            />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 12px 12px 42px",
                                    borderRadius: "10px",
                                    border: "2px solid #ddd",
                                    outline: "none",
                                    fontSize: "1rem",
                                    transition: "0.2s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                            />
                        </div>

                        <p style={{ marginTop: "6px", fontSize: "0.85rem", color: "#666" }}>
                            Must be at least 6 characters
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            borderRadius: "12px",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "1.1rem",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                        <UserPlus size={20} />
                        Create Account
                    </button>
                </form>

                {/* LOGIN LINK */}
                <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#555" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#6366f1", fontWeight: "600" }}>
                        Login
                    </Link>
                </p>
            </div>

            {/* FLOAT ANIMATION KEYFRAMES */}
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}
            </style>
        </div>
    );
};

export default Register;
