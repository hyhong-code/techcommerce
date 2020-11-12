import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BackTop, Spin } from "antd";

// import Home from "./pages/Home";
// import Product from "./pages/Product";
// import Register from "./pages/auth/Register";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import Login from "./pages/auth/Login";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Header from "./components/ui/Header";
// import User from "./pages/user/User";
// import Admin from "./pages/admin/Admin";
// import Category from "./pages/Category";
// import Sub from "./pages/Sub";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import Drawer from "./components/ui/Drawer";
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
// import PublicRoute from "./components/routes/PublicRoute";

import useAuth from "./hooks/useAuth";

// Code splitting with lazy / Suspense
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Header = lazy(() => import("./components/ui/Header"));
const User = lazy(() => import("./pages/user/User"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Category = lazy(() => import("./pages/Category"));
const Sub = lazy(() => import("./pages/Sub"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Drawer = lazy(() => import("./components/ui/Drawer"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const PublicRoute = lazy(() => import("./components/routes/PublicRoute"));

const App = () => {
  useAuth();
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Header />
      <Drawer />
      <Switch>
        <PublicRoute path="/register/complete" component={RegisterComplete} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
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
        <Redirect from="/*" to="/" />
      </Switch>
      <BackTop />
    </Suspense>
  );
};

export default App;
