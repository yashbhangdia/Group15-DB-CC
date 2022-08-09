import React from "react";
import { Navigate } from "react-router-dom";
import { ROLE_TOKEN } from "../config/enums/misc";
import { getCookie } from "../utils/cookieUtils";

const RoleBasedRoute = ({ children, rolesAllowed, redirectTo }) => {
  const currentRole = getCookie(ROLE_TOKEN);
  const allowed = rolesAllowed.indexOf(currentRole) > -1;
  return allowed ? children : <Navigate to={{ pathname: redirectTo }} />;
};

export default RoleBasedRoute;
