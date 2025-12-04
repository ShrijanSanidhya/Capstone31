import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
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
                    "url('https://i.pinimg.com/1200x/bf/35/59/bf355911179158667230d0e5853d6d5c.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px"
            }}
        >
            {/* CARD */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "rgba(255,255,255,0.85)",
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
                    Welcome Back
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "1.5rem"
                    }}
                >
                    Login to continue your journey ✈️
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
                        <LogIn size={20} />
                        Login
                    </button>
                </form>

                {/* SIGNUP LINK */}
                <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#555" }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#6366f1", fontWeight: "600" }}>
                        Sign up
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

export default Login;
