import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Typography, Input, Button, message } from "antd";

import { forgotPassword } from "../../redux/actions/user";

const { Title } = Typography;

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      await dispatch(forgotPassword(email));
      message.success(
        `Password reset link sent to ${email}, please click on the link to proceed.`,
        6
      );
      setEmail("");
    } catch (error) {
      message.error(error.message, 6);
    }

    setLoading(false);
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit} className="forgot-password__form">
        <Title className="forgot-password__form__heading" level={2}>
          Forgot Password
        </Title>

        <Input
          className="forgot-password__form__input"
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
          Send password reset link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
