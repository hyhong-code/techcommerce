import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

const { Item } = Menu;

const SIDE_NAV_OPTIONS = [
  { href: "/user/history", label: "History" },
  { href: "/user/password", label: "Password" },
  { href: "/user/wishlist", label: "Wishlist" },
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
