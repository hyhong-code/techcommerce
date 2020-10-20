import React from "react";
import { Route, Switch } from "react-router-dom";

import SideNav from "../../components/admin/SideNav";

const Admin = () => {
  return (
    <div className="admin">
      <div>
        <SideNav />
      </div>
      <div>
        <Switch>
          <Route
            exact
            path="/admin/categories"
            component={() => <h1>Categories</h1>}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
