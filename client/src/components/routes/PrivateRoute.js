import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isInitializing } = useSelector(({ user }) => user);
  return isInitializing ? (
    <Spin size="large" />
  ) : user ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
