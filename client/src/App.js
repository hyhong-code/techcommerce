import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Header from "./components/ui/Header";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import PublicRoute from "./components/routes/PublicRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
  useAuth();
  return (
    <Fragment>
      <Header />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute
          exact
          path="/register/complete"
          component={RegisterComplete}
        />
        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <UserRoute exact path="/user/:subroute" component={User} />
        <AdminRoute path="/admin/:subroute" component={Admin} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Fragment>
  );
};

export default App;
