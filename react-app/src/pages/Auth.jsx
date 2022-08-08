import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import { LOGIN, AUTH } from "../config/routeUrls";

const RELATIVE_LOGIN = LOGIN.replace(AUTH, "");

const Auth = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={LOGIN} />} />
      <Route path={RELATIVE_LOGIN} element={<Login />} />
    </Routes>
  );
};

export default Auth;
