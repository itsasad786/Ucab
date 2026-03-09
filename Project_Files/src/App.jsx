import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Landing
import LandingPage from './pages/LandingPage';

// Auth
import AuthPage from './pages/auth/AuthPage';

// Rider
import RiderDashboard from './pages/rider/RiderDashboard';
import BookRide from './pages/rider/BookRide';
import RideHistory from './pages/rider/RideHistory';
import RiderProfile from './pages/rider/RiderProfile';

// Driver
import DriverDashboard from './pages/driver/DriverDashboard';
import AssignedRides from './pages/driver/AssignedRides';
import Earnings from './pages/driver/Earnings';
import DriverHistory from './pages/driver/DriverHistory';
import DriverProfile from './pages/driver/DriverProfile';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCabs from './pages/admin/AdminCabs';
import AddCab from './pages/admin/AddCab';

// Protected route
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={`/login/${role}`} replace />;
  if (user.role !== role) return <Navigate to={`/login/${role}`} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login/rider" element={<AuthPage role="rider" mode="login" />} />
      <Route path="/login/driver" element={<AuthPage role="driver" mode="login" />} />
      <Route path="/login/admin" element={<AuthPage role="admin" mode="login" />} />
      <Route path="/register/rider" element={<AuthPage role="rider" mode="register" />} />
      <Route path="/register/driver" element={<AuthPage role="driver" mode="register" />} />

      {/* Rider */}
      <Route path="/rider/dashboard" element={<ProtectedRoute role="rider"><RiderDashboard /></ProtectedRoute>} />
      <Route path="/rider/book" element={<ProtectedRoute role="rider"><BookRide /></ProtectedRoute>} />
      <Route path="/rider/history" element={<ProtectedRoute role="rider"><RideHistory /></ProtectedRoute>} />
      <Route path="/rider/profile" element={<ProtectedRoute role="rider"><RiderProfile /></ProtectedRoute>} />

      {/* Driver */}
      <Route path="/driver/dashboard" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/rides" element={<ProtectedRoute role="driver"><AssignedRides /></ProtectedRoute>} />
      <Route path="/driver/earnings" element={<ProtectedRoute role="driver"><Earnings /></ProtectedRoute>} />
      <Route path="/driver/history" element={<ProtectedRoute role="driver"><DriverHistory /></ProtectedRoute>} />
      <Route path="/driver/profile" element={<ProtectedRoute role="driver"><DriverProfile /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/cabs" element={<ProtectedRoute role="admin"><AdminCabs /></ProtectedRoute>} />
      <Route path="/admin/cabs/add" element={<ProtectedRoute role="admin"><AddCab /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
