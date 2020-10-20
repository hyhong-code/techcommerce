import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Spin } from "antd";

import useCheckIsAdmin from "../../hooks/useCheckIsAdmin";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { checkingIsAdmin, isAdmin } = useCheckIsAdmin();

  return checkingIsAdmin ? (
    <Spin size="large" />
  ) : isAdmin ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AdminRoute;
