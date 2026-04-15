import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader fullPage message="Checking admin session..." />;
  if (!isAuthenticated) return <Navigate to="/admin-login" replace state={{ from: location }} />;
  return children;
}
