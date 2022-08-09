import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import {
  DASHBOARD,
  MANAGE_USERS,
  TRADES,
  NEW_TRADE,
  SINGLE_TRADE,
  SECURITIES,
  NEW_SECURITY,
  SINGLE_SECURITY,
  BOOKS,
} from "../../../config/routeUrls";
import "./sidebar.scss";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const location = useLocation();
  const SECURITY_MATCH =
    matchPath(SECURITIES, location.pathname) ??
    matchPath(NEW_SECURITY, location.pathname) ??
    matchPath(SINGLE_SECURITY, location.pathname) ??
    false;

  const TRADE_MATCH =
    matchPath(TRADES, location.pathname) ??
    matchPath(NEW_TRADE, location.pathname) ??
    matchPath(SINGLE_TRADE, location.pathname) ??
    false;

  return (
    <ProSidebar
      breakPoint="md"
      toggled={sidebarVisible}
      onToggle={toggleSidebar.toggle}
    >
      <SidebarHeader className="text-center">
        <Link to={DASHBOARD}>
          <img
            src="https://www.timecamp.com/blog/wp-content/uploads/2019/03/How-does-employee-monitoring-software-work_.png"
            height="100rem"
            width="200rem"
            alt="logo"
            className="m-auto"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Menu className="flex-fill">
          <MenuItem active={matchPath(BOOKS, location.pathname)}>
            <Link to={BOOKS}>Manage Books</Link>
          </MenuItem>
          <MenuItem active={matchPath(MANAGE_USERS, location.pathname)}>
            <Link to={MANAGE_USERS}>Manage Users</Link>
          </MenuItem>
          <MenuItem active={TRADE_MATCH}>
            <Link to={TRADES}>Trades</Link>
          </MenuItem>
          <MenuItem active={SECURITY_MATCH}>
            <Link to={SECURITIES}>Securities</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Sidebar;
