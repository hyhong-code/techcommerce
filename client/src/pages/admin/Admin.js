import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listCategories } from "../../redux/actions/cateogry";

import SideNav from "../../components/admin/SideNav";
import Categories from "../../components/admin/categories/Categories";
import Subs from "../../components/admin/subs/Subs";

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
          <Route exact path="/admin/categories" component={Categories} />
          <Route exact path="/admin/subs" component={Subs} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
