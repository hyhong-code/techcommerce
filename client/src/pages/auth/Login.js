import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";

import { Typography, Input, Button, message } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

import { login, loginWithGoogle } from "../../redux/actions/user";

const { Title } = Typography;

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { email, password } = formData;
  const [loading, setLoading] = useState();
  const [googleLoading, setGoogleLoading] = useState();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await dispatch(login({ email, password }));

      // Redirect user back to intended page if any
      if (location.state && location.state.from) {
        history.push(location.state.from);
      }

      message.success(`Welcome back, ${email.split("@")[0]}!`, 6);
    } catch (error) {
      setLoading(false);
      message.error(error.message, 6);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(loginWithGoogle());
      message.success(`Welcome back!`, 6);
    } catch (error) {
      setGoogleLoading(false);
      message.error(error.message, 6);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <Title className="login__form__heading" level={2}>
          Login
        </Title>

        <Input
          className="login__form__input"
          placeholder="Enter your email"
          type="email"
          autoFocus
          disabled={loading}
          value={email}
          name="email"
          onChange={handleChange}
        />

        <Input
          className="login__form__input"
          placeholder="Enter your password"
          type="password"
          disabled={loading}
          value={password}
          name="password"
          onChange={handleChange}
        />

        <Button
          className="login__form__btn"
          type="primary"
          loading={loading}
          disabled={!(email && password.length >= 8)}
          htmlType="submit"
          block
          shape="round"
          size="large"
          icon={<MailOutlined />}
        >
          Login
        </Button>

        <Button
          className="login__form__btn"
          type="primary"
          danger
          loading={googleLoading}
          htmlType="button"
          block
          shape="round"
          size="large"
          icon={<GoogleOutlined />}
          onClick={handleGoogle}
        >
          Login with Google
        </Button>

        <Link className="login__form__forgot" to="/forgot-password">
          Forgot password
        </Link>
      </form>
    </div>
  );
};

export default Register;
