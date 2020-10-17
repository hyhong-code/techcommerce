import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/actions/user";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      className="header"
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {user && (
        <SubMenu
          key="username"
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
        >
          <Item key="setting:1" onClick={() => dispatch(logout())}>
            Logout
          </Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>
      )}

      <Item key="login" icon={<UserOutlined />} className="header__item--login">
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
