import React, { Fragment, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { PrivatePaths } from './path';
import { AuthContext } from '../context';

const paths = [
  {
    path: '/',
    element: lazy(() => import('../modules/Home')),
  },

  {
    path: '/login',
    element: lazy(() => import('../modules/Auth/Login')),
  },
  {
    path: '/register',
    element: lazy(() => import('../modules/Auth/PatientReg')),
  },
  {
    path: '/doctor-register',
    element: lazy(() => import('../modules/Auth/DoctorReg')),
  },
  {
    path: '/forget-password',
    element: lazy(() => import('../modules/Auth/ForgetPassword')),
  },
  {
    path: '*',
    element: lazy(() => import('../modules/NotFound')),
  },
];

function Auth() {
  const { user } = useContext(AuthContext);

  // if (user) {
  //   return <Navigate to={BasePaths.MAIN} replace />;
  // }

  if (user) {
    switch (user.role) {
      case 'Doctor':
        return <Navigate to={`${PrivatePaths.DOCTOR}/dashboard`} replace />;
      case 'Patient':
        return <Navigate to={`${PrivatePaths.PATIENT}/dashboard`} replace />;
      // Add more cases if you have more roles
      default:
        return <Navigate to={`${PrivatePaths.ADMIN}/dashboard`} replace />;
    }
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

export default Auth;
