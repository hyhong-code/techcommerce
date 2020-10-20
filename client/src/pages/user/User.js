import React from "react";
import { Route, Switch } from "react-router-dom";

import SideNav from "../../components/user/SideNav";
import Password from "../../components/user/Password";
import Wishlist from "../../components/user/Wishlist";
import History from "../../components/user/History";

const User = () => {
  return (
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
  );
};

export default User;
