import { Fragment, lazy, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicPaths } from './path';
import { AuthContext } from '../context';

const paths = [
  {
    path: 'dashboard',
    element: lazy(() => import('../modules/Patient')),
  },
  {
    path: '/profile',
    element: lazy(() => import('../modules/Patient/Profile')),
  },
  {
    path: '/change-password',
    element: lazy(() => import('../modules/Auth/Change Password')),
  },
  {
    path: '/appointment',
    element: lazy(() => import('../modules/Patient/Dashboard')),
  },
  {
    path: '/appointments',
    element: lazy(() => import('../modules/Patient/Dashboard/Appointments')),
  },
  {
    path: '/appointments-history',
    element: lazy(() => import('../modules/Patient/Dashboard/appointment-history')),
  },
  {
    path: '/appointments-history/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/View-history')),
  },
  {
    path: '/appointments/pending',
    element: lazy(() => import('../modules/Patient/Dashboard/Pending')),
  },
  {
    path: '/appointments/pending/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/ViewPending')),
  },
  {
    path: '/appointments/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/AppointmentView')),
  },
  {
    path: '/consultations',
    element: lazy(() => import('../modules/Patient/Dashboard/Consultations')),
  },
  {
    path: '/appointments/:id/join-meeting',
    element: lazy(() => import('../modules/Patient/Teams Meeting/index')),
  },
  {
    path: '/consultations/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/ConsultView')),
  },
  {
    path: '/pharmacy',
    element: lazy(() => import('../modules/Patient/Dashboard/Pharmacy')),
  },

  {
    path: '/pharmacy/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/DrugScreen')),
  },

  {
    path: '/our-doctors',
    element: lazy(() => import('../modules/Patient/Dashboard/Our-docs')),
  },
  {
    path: '/our-doctors/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/ViewDoctors')),
  },
  {
    path: '/pharmacy/cart',
    element: lazy(() => import('../modules/Patient/Dashboard/Cart/pages/CartPage')),
  },

  {
    path: '/report',
    element: lazy(() => import('../modules/Patient/Dashboard/MedicalReport')),
  },
  {
    path: '/report/:id',
    element: lazy(() => import('../modules/Patient/Dashboard/ViewReports')),
  },
];

function PatientRouter() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={`${PublicPaths.LOGIN}`} replace />;
  }
  return (
    <Routes>
      {paths.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default PatientRouter;
