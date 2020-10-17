import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import { Typography, Input, Button, message } from "antd";

import { auth, googleAuthProvider } from "../../services/firebase";

const { Title } = Typography;

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const RegisterComplete = () => {
  const history = useHistory();

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
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        localStorage.removeItem("SIGN_UP_EMAIL");

        // Set a password for user
        const user = auth.currentUser;
        await user.updatePassword(password);

        // Get a token to use for backend
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);

        // Redirect user
        history.push("/");
      }

      console.log(result);
    } catch (error) {
      console.log(error);
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
          disabled={!(email && password)}
          htmlType="submit"
        >
          Complete Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterComplete;
