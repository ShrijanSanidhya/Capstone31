import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Profile from "./pages/Profile";

// ----------------------
// PRIVATE ROUTE
// ----------------------
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f7fa'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '500' }}>Loading...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// ----------------------
// LAYOUT (Navbar + pages)
// ----------------------
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="max-w-6xl mx-auto p-4">{children}</div>
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* --- Public Routes --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Public Layout Routes --- */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/explore"
            element={
              <Layout>
                <Explore />
              </Layout>
            }
          />

          {/* --- Protected Routes --- */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/my-trips"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <Profile />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/create-trip"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateTrip />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-trip/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateTrip />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/trips/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <TripDetails />
                </Layout>
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
