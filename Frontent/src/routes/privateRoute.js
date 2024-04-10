import { Routes } from 'react-router-dom';
import React, { lazy, useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { Loader } from '../components';
import AuthGuard from './AuthGuard';

export const PrivateRoute = ({ path, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Lazy load the component associated with the route
  const LazyComponent = lazy(() => import(`./${user.role}Dashboard`));

  return (
    <Route
      path={path}
      element={
        <React.Suspense fallback={<Loader />}>
          <LazyComponent />
        </React.Suspense>
      }
    />
  );
};

// Lazy load your role-specific components
const AdminDashboard = React.lazy(() => import('../modules/Admin'));
const DoctorDashboard = React.lazy(() => import('../modules/Doctor'));
const PatientDashboard = React.lazy(() => import('../modules/Patient/index'));
const NotFound = React.lazy(() => import('../modules/NotFound/index'));

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* Admin-specific route */}
      <AuthGuard>
        <Route path="/admin" element={<AdminDashboard />} />
      </AuthGuard>

      {/* Doctor-specific route */}
      <AuthGuard>
        <Route path="/doctor" element={<DoctorDashboard />} />
      </AuthGuard>

      {/* Patient-specific route */}
      <AuthGuard>
        <Route path="/patient" element={<PatientDashboard />} />
      </AuthGuard>
      <AuthGuard>
        <Route path="/not-found" element={<NotFound />} />
      </AuthGuard>

      {/* Add more role-specific routes as needed */}
    </Routes>
  );
};

export default PrivateRoutes;
