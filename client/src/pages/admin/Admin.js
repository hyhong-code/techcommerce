import { Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Spin } from "antd";

// import SideNav from "../../components/admin/SideNav";
// import Categories from "../../components/admin/categories/Categories";
// import Subs from "../../components/admin/subs/Subs";
// import Products from "../../components/admin/products/Products";
// import UpdateProduct from "../../components/admin/products/UpdateProduct";
// import CreateProducts from "../../components/admin/products/CreateProducts";
// import Coupons from "../../components/admin/coupons/Coupons";
// import Orders from "../../components/admin/orders/Orders";
// import Password from "../../components/user/Password";

const SideNav = lazy(() => import("../../components/admin/SideNav"));
const Categories = lazy(() =>
  import("../../components/admin/categories/Categories")
);
const Subs = lazy(() => import("../../components/admin/subs/Subs"));
const Products = lazy(() => import("../../components/admin/products/Products"));
const UpdateProduct = lazy(() =>
  import("../../components/admin/products/UpdateProduct")
);
const CreateProducts = lazy(() =>
  import("../../components/admin/products/CreateProducts")
);
const Coupons = lazy(() => import("../../components/admin/coupons/Coupons"));
const Orders = lazy(() => import("../../components/admin/orders/Orders"));
const Password = lazy(() => import("../../components/user/Password"));

const Admin = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <div className="admin">
        <div>
          <SideNav />
        </div>
        <div>
          <Switch>
            <Route exact path="/admin/categories" component={Categories} />
            <Route exact path="/admin/subs" component={Subs} />
            <Route
              exact
              path="/admin/products/:slug"
              component={UpdateProduct}
            />
            <Route exact path="/admin/products" component={Products} />
            <Route exact path="/admin/product" component={CreateProducts} />
            <Route exact path="/admin/coupons" component={Coupons} />
            <Route exact path="/admin/orders" component={Orders} />
            <Route exact path="/admin/password" component={Password} />
          </Switch>
        </div>
      </div>
    </Suspense>
  );
};

export default Admin;
