import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import Header from "./components/ui/Header";
import useAuth from "./hooks/useAuth";

const App = () => {
  useAuth();
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Fragment>
  );
};

export default App;
