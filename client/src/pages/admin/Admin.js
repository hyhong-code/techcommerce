import { Route, Switch } from "react-router-dom";
import React from "react";

import SideNav from "../../components/admin/SideNav";
import Categories from "../../components/admin/categories/Categories";
import Subs from "../../components/admin/subs/Subs";
import Products from "../../components/admin/products/Products";
import UpdateProduct from "../../components/admin/products/UpdateProduct";
import CreateProducts from "../../components/admin/products/CreateProducts";
import Coupons from "../../components/admin/coupons/Coupons";
import Orders from "../../components/admin/orders/Orders";

const Admin = () => {
  return (
    <div className="admin">
      <div>
        <SideNav />
      </div>
      <div>
        <Switch>
          <Route exact path="/admin/categories" component={Categories} />
          <Route exact path="/admin/subs" component={Subs} />
          <Route exact path="/admin/products/:slug" component={UpdateProduct} />
          <Route exact path="/admin/products" component={Products} />
          <Route exact path="/admin/product" component={CreateProducts} />
          <Route exact path="/admin/coupons" component={Coupons} />
          <Route exact path="/admin/orders" component={Orders} />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
