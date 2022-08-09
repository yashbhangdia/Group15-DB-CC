import React from "react";
import AppLayout from "../base/Layout/AppLayout";
import UsersList from "../components/manage-users/UsersList/UsersList";

const ManageUsers = () => {
  return (
    <AppLayout>
      <UsersList />
    </AppLayout>
  );
};

export default ManageUsers;
