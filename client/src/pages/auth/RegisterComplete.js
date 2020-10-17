import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Typography, Input, Button, message } from "antd";

import { completeRegister } from "../../redux/actions/user";

const { Title } = Typography;

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const RegisterComplete = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { email, password } = formData;
  const [loading, setLoading] = useState();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: localStorage.getItem("SIGN_UP_EMAIL"),
    }));
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const emailLink = window.location.href;
      await dispatch(
        completeRegister({ email, emailLink, password }, () =>
          history.push("/")
        )
      );
    } catch (error) {
      message.error(error.message, 6);
    }

    setLoading(false);
  };

  return (
    <div className="register-complete">
      <form className="register-complete__form" onSubmit={handleSubmit}>
        <Title className="register-complete__form__heading" level={2}>
          Complete Registeration
        </Title>
        <Input
          className="register-complete__form__input"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          disabled={true}
          onChange={handleChange}
        />

        <Input
          className="register-complete__form__input"
          placeholder="Set a password"
          type="password"
          name="password"
          value={password}
          disabled={loading}
          onChange={handleChange}
          autoFocus
        />

        <Button
          type="primary"
          loading={loading}
          disabled={!(email && password.length >= 8)}
          htmlType="submit"
        >
          Complete Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterComplete;
