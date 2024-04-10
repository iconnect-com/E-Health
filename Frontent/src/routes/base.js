import { lazy } from 'react';

const BaseRoutes = [
  {
    path: `/*`,
    component: lazy(() => import('./AuthRouter')),
    useAuth: false,
  },
  // {
  //   path: '/app/*',
  //   component: lazy(() => import('./AdminRouter')),
  //   useAuth: true,
  //   allowedRoles: ['Patient', 'Doctor', 'Admin'],
  // },
  {
    path: '/doctor/*',
    component: lazy(() => import('./DoctorRouter')),
    useAuth: true,
    allowedRoles: ['Doctor'],
  },
  {
    path: '/app/*',
    component: lazy(() => import('./AdminRouter')),
    useAuth: true,
    allowedRoles: ['Admin'],
  },
  {
    path: '/patient/*',
    component: lazy(() => import('./PatientRouter')),
    useAuth: true,
    allowedRoles: ['Patient'],
  },
  {
    path: '*',
    component: lazy(() => import('../modules/NotFound')),
    useAuth: false,
    allowedRoles: ['Patient', 'Doctor', 'Admin'],
  },
].sort((a, b) => (a.path === '*' ? 1 : -1));

export default BaseRoutes;
