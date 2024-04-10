import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import { useContext, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { isAuthenticated } from '../utils';
import { Loader } from '../components';

const AuthGuard = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const loggedInUser = useMemo(() => {
    return user;
  }, [user]);

  if (!isAuthenticated()) {
    return (
      <>
        <ToastContainer />
        <Navigate to={'/login'} replace />
      </>
    );
  }

  if (!loggedInUser) {
    return <Loader />;
  }

  if (allowedRoles && !allowedRoles.includes(loggedInUser?.role)) {
    return (
      <>
        <ToastContainer />
        <Navigate to="*" state={{ from: location }} replace />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
