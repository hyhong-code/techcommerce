import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

const { Item } = Menu;

const SIDE_NAV_OPTIONS = [
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/sub", label: "Sub Category" },
  { href: "/admin/product", label: "Product" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/password", label: "Password" },
];

const SideNav = () => {
  const location = useLocation();

  return (
    <Menu selectedKeys={[location.pathname]}>
      {SIDE_NAV_OPTIONS.map((option) => (
        <Item key={option.href}>
          <Link to={option.href}>{option.label}</Link>
        </Item>
      ))}
    </Menu>
  );
};

export default SideNav;
