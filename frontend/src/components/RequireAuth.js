import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('Auth(RequireAuth): ',auth)

  if (auth && auth.roles && Object.keys(auth.roles).some(role => allowedRoles[role])) {
    return <Outlet />;
  } else if (auth && auth.user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default RequireAuth;