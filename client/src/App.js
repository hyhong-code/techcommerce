import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { BackTop } from "antd";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Header from "./components/ui/Header";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";
import Category from "./pages/Category";
import Sub from "./pages/Sub";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Drawer from "./components/ui/Drawer";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import PublicRoute from "./components/routes/PublicRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
  useAuth();
  return (
    <Fragment>
      <Header />
      <Drawer />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/register/complete" component={RegisterComplete} />
        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <UserRoute exact path="/user/:subroute" component={User} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
        <AdminRoute path="/admin/:subroute" component={Admin} />
        <Route exact path="/products/:slug" component={Product} />
        <Route exact path="/subs/:slug" component={Sub} />
        <Route exact path="/categories/:slug" component={Category} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={Home} />
      </Switch>
      <BackTop />
    </Fragment>
  );
};

export default App;
