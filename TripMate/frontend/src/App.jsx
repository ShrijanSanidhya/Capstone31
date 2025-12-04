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
  const { user } = useAuth();
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
