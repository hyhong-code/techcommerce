import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCategories } from "../../redux/actions/cateogry";

import SideNav from "../../components/admin/SideNav";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, []);

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
