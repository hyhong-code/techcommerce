import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const UserRoute = ({ component: Component, ...rest }) => {
  const { user, isInitializing } = useSelector(({ user }) => user);

  return isInitializing ? (
    <Spin size="large" />
  ) : user && user.role === "subscriber" ? (
    <Route {...rest} component={Component} />
  ) : user && user.role === "admin" ? (
    <Redirect to="/admin/categories" />
  ) : (
    !user && <Redirect to="/login" />
  );
};

export default UserRoute;
