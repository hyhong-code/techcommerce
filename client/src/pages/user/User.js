import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Spin } from "antd";

import SEOHead from "../../components/SEOHead";

const SideNav = lazy(() => import("../../components/user/SideNav"));
const Password = lazy(() => import("../../components/user/Password"));
const Wishlist = lazy(() => import("../../components/user/Wishlist"));
const History = lazy(() => import("../../components/user/History"));

const User = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <SEOHead
        title={`Dashboard | ${process.env.REACT_APP_APP_NAME}`}
        description="Manage your account."
      />

      <div className="user">
        <div>
          <SideNav />
        </div>
        <div>
          <Switch>
            <Route exact path="/user/history" component={History} />
            <Route exact path="/user/password" component={Password} />
            <Route exact path="/user/wishlist" component={Wishlist} />
          </Switch>
        </div>
      </div>
    </Suspense>
  );
};

export default User;
