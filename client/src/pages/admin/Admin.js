import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listCategories } from "../../redux/actions/cateogry";

import SideNav from "../../components/admin/SideNav";
import Categories from "../../components/admin/Categories";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div className="admin">
      <div>
        <SideNav />
      </div>
      <div>
        <Switch>
          <Route exact path="/admin/category" component={Categories} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
