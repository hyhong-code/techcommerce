import React, { useState } from "react";

import { Typography, Input, Button, message } from "antd";

import { auth, googleAuthProvider } from "../../services/firebase";

const { Title } = Typography;

const Register = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    const config = {
      handleCodeInApp: true,
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      localStorage.setItem("SIGN_UP_EMAIL", email);
      message.success(
        `Email link sent to ${email}, please click on the link to complete registration.`,
        6
      );
      setEmail("");
    } catch (error) {
      message.error(error.message, 6);
    }

    setLoading(false);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <Title className="register__form__heading" level={2}>
          Register
        </Title>

        <Input
          className="register__form__input"
          placeholder="Email"
          type="email"
          autoFocus
          disabled={loading}
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />

        <Button
          type="primary"
          loading={loading}
          disabled={!email}
          htmlType="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
