import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, isInitializing } = useSelector(({ user }) => user);

  return isInitializing ? (
    <Spin size="large" />
  ) : user && user.role === "admin" ? (
    <Route {...rest} component={Component} />
  ) : user && user.role === "subscriber" ? (
    <Redirect to="/user/history" />
  ) : (
    !user && <Redirect to="/login" />
  );
};

export default AdminRoute;
