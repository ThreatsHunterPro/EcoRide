import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from "../../../hooks/auth/useAuth";

export default function PrivateRoute({ expectedRoleId, children }) {
  const { token, role_id, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ color: 'black', padding: '20px' }}>Chargement ...</div>; 
  }

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (expectedRoleId && Number(role_id) !== Number(expectedRoleId)) {
    console.warn(`Access denied: Expected role ${expectedRoleId}, got ${role_id}`);
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}