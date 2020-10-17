import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/actions/user";
const { SubMenu, Item } = Menu;

const Header = () => {
  const history = useHistory();
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
          className="header__item--user"
          key="username"
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
        >
          <Item
            key="setting:1"
            icon={<LoginOutlined />}
            onClick={() => dispatch(logout(() => history.push("/login")))}
          >
            Logout
          </Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>
      )}

      {!user && (
        <Fragment>
          <Item
            key="login"
            icon={<UserOutlined />}
            className="header__item--login"
          >
            <Link to="/login">Login</Link>
          </Item>
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default Header;
