import React, { useState } from "react";
import { Typography, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";

import { updatePassword } from "../../redux/actions/user";

const { Title } = Typography;

const Password = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await dispatch(updatePassword(password));
      message.success("Password successfully updated.", 6);
      setPassword("");
      setLoading(false);
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  return (
    <form className="user-password" onSubmit={handleSubmit}>
      <Title level={2} className="user-password__title">
        Update Password
      </Title>

      <Input
        className="user-password__input"
        placeholder="Enter new password"
        type="password"
        autoFocus
        value={password}
        disabled={loading}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={password.length < 8}
      >
        Update
      </Button>
    </form>
  );
};

export default Password;
