import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Typography, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { login } from "../../redux/actions/user";

const { Title } = Typography;

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { email, password } = formData;
  const [loading, setLoading] = useState();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      await dispatch(login({ email, password }, () => history.push("/")));
      message.success(`Welcome back, ${email.split("@")[0]}!`, 6);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      message.error(error.message, 6);
    }

    setLoading(false);
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
      </form>
    </div>
  );
};

export default Register;
