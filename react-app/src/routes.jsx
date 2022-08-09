import React, { useEffect, useState } from "react";
import {
  AUTH,
  DASHBOARD,
  TRADES,
  SECURITIES,
  MANAGE_USERS,
  BOOKS,
} from "./config/routeUrls";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Trades from "./pages/Trades";
import Securities from "./pages/Securities";
import ManageUsers from "./pages/ManageUsers";
import Books from "./pages/Books";
import { RequireAuth, OnlyPublicAuth } from "./base/RequireAuth";
import Loading from "./base/Loading/Loading";

import * as authService from "./services/authService.js";
import RoleBasedRoute from "./base/RoleBasedRoute";
import { ADMIN, OPS_TEAM } from "./config/enums/misc";

function AppRoutes() {
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    // await authService.findMe();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  return (
    <Routes>
      <Route
        path={`${AUTH}/*`}
        element={
          <OnlyPublicAuth redirectTo={DASHBOARD}>
            <Auth />
          </OnlyPublicAuth>
        }
      />
      <Route
        path={DASHBOARD}
        element={
          <RequireAuth redirectTo={AUTH}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path={`${MANAGE_USERS}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <RoleBasedRoute redirectTo={DASHBOARD} rolesAllowed={[ADMIN]}>
              <ManageUsers />
            </RoleBasedRoute>
          </RequireAuth>
        }
      />
      <Route
        path={`${TRADES}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <RoleBasedRoute redirectTo={DASHBOARD} rolesAllowed={[OPS_TEAM]}>
              <Trades />
            </RoleBasedRoute>
          </RequireAuth>
        }
      />
      <Route
        path={`${SECURITIES}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <RoleBasedRoute
              redirectTo={DASHBOARD}
              rolesAllowed={[OPS_TEAM, ADMIN]}
            >
              <Securities />
            </RoleBasedRoute>
          </RequireAuth>
        }
      />
      <Route
        path={`${BOOKS}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <RoleBasedRoute redirectTo={DASHBOARD} rolesAllowed={[ADMIN]}>
              <Books />
            </RoleBasedRoute>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
}

export default AppRoutes;
