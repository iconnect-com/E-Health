import { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const privateRoutes = [
  {
    path: '/dashboard',
    element: lazy(() => import('../modules/Patient')),
  },
  {
    path: '/appointment-type',
    element: lazy(() => import('../modules/Admin/Dashboard/Appointmenttypes')),
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
    path: '/users/patients',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/AlllPat')),
  },
  {
    path: '/users/patients/:id',
    element: lazy(() => import('../modules/Admin/ViewAllUsers')),
  },
  {
    path: '/users/doctors',
    element: lazy(() => import('../modules/Admin/Dashboard/Our-docs')),
  },
  {
    path: '/users/doctors/:id',
    element: lazy(() => import('../modules/Admin/ViewAllUsers')),
  },
  {
    path: '/users/all',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/AllUsers')),
  },
  {
    path: '/users/all/:id',
    element: lazy(() => import('../modules/Admin/ViewAllUsers')),
  },
  {
    path: '/pharmacy',
    element: lazy(() => import('../modules/Admin/Dashboard/Pharmacy')),
  },
  {
    path: '/pharmacy/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/DrugScreen')),
  },
  {
    path: '/appointments',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/TotalAppointment')),
  },
  {
    path: '/appointments/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ViewTotal')),
  },
  {
    path: '/appointment/completed',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/CompletedAppointment')),
  },
  {
    path: '/appointments/completed/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ViewTotal')),
  },
  {
    path: '/appointment/pending',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/PendingAppointment')),
  },
  {
    path: '/appointments/pending/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ViewTotal')),
  },
  {
    path: '/appointment/rejected',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/RejectedAppointment')),
  },
  {
    path: '/appointments/rejected/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ViewTotal')),
  },
  {
    path: '/appointment/confirmed',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ConfirmedAppointment')),
  },
  {
    path: '/appointments/confirmed/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/screens/ViewTotal')),
  },

  {
    path: '/pharmacy/cart',
    element: lazy(() => import('../modules/Admin/Dashboard/Orders/CartScreen')),
  },
  {
    path: '/pharmacy/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/DrugScreen')),
  },

  {
    path: '/reports',
    element: lazy(() => import('../modules/Admin/Dashboard/Audits')),
  },
  {
    path: '/reports/user',
    element: lazy(() => import('../modules/Admin/Dashboard/UserAudits')),
  },
  {
    path: '/reports/user/:id',
    element: lazy(() => import('../modules/Admin/Dashboard/ViewReports')),
  },

  {
    path: '*',
    element: lazy(() => import('../modules/NotFound')),
  },
];

function Admin() {
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

export default Admin;
