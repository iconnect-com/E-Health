import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const privateRoutes = [
  {
    path: "/users/all",
    element: lazy(() => import("../modules/Admin/Dashboard")),
  },
  // {
  //   path: "/users/all/:id",
  //   element: lazy(() => import("../modules/Admin/screens/All Users/ViewUser")),
  // },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
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
