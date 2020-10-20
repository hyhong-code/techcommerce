import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user, isInitializing } = useSelector(({ user }) => user);

  return isInitializing ? (
    <Spin size="large" />
  ) : !user ? (
    <Route {...rest} component={Component} />
  ) : user.role === "subscriber" ? (
    <Redirect to="/user/history" />
  ) : (
    user.role === "admin" && <Redirect to="/admin/categories" />
  );
};

export default PublicRoute;
