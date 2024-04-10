import { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const privateRoutes = [
  {
    path: '/dashboard',
    element: lazy(() => import('../modules/Patient')),
  },
  {
    path: '/profile',
    element: lazy(() => import('../modules/Doctor/Profile')),
  },
  {
    path: '/patients',
    element: lazy(() => import('../modules/Doctor/Dashboard/screens/AlllPat')),
  },
  {
    path: '/patients/:id',
    element: lazy(() => import('../modules/Doctor/ViewAllUsers')),
  },
  {
    path: '/appointments',
    element: lazy(() => import('../modules/Doctor/Dashboard/Appointments')),
  },
  {
    path: '/appointments/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/ViewAppointments')),
  },
  {
    path: '/appointments-history',
    element: lazy(() => import('../modules/Doctor/Dashboard/appointment-history')),
  },
  {
    path: '/appointments-history/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/View-history')),
  },
  {
    path: '/appointments/add-report/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/AddReports')),
  },
  {
    path: '/appointments/waiting',
    element: lazy(() => import('../modules/Doctor/Dashboard/WaitingAppointment')),
  },
  {
    path: '/appointments/waiting/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/ViewWaiting')),
  },
  {
    path: '/appointments/completed',
    element: lazy(() => import('../modules/Doctor/Dashboard/CompletedAppointment')),
  },
  {
    path: '/appointments/completed/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/ViewCompleted')),
  },
  {
    path: '/reports',
    element: lazy(() => import('../modules/Doctor/Dashboard/screens/MedicalReport')),
  },
  {
    path: '/reports/user',
    element: lazy(() => import('../modules/Doctor/Dashboard/screens/AllMedicalReport')),
  },
  {
    path: '/reports/user/:id',
    element: lazy(() => import('../modules/Doctor/Dashboard/screens/ViewMedicalReport')),
  },
];

function Doctor() {
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Doctor;
