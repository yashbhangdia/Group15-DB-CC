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

import * as authService from "./services/AuthService.js";

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
            <ManageUsers />
          </RequireAuth>
        }
      />
      <Route
        path={`${TRADES}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <Trades />
          </RequireAuth>
        }
      />
      <Route
        path={`${SECURITIES}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <Securities />
          </RequireAuth>
        }
      />
      <Route
        path={`${BOOKS}/*`}
        element={
          <RequireAuth redirectTo={AUTH}>
            <Books />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
}

export default AppRoutes;
