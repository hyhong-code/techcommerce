import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, Input, Button, message, Space } from "antd";

import formatErrorMsg from "../../../utils/formatErrorMsg";
import { createCategory } from "../../../redux/actions/category";

const { Title } = Typography;

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await dispatch(createCategory(name));
      inputRef.current.focus();
      setName("");
      message.success(`${name} is successfully added.`, 6);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
    setLoading(false);
  };

  return (
    <form className="create-category" onSubmit={handleSubmit}>
      <Title level={2}>Create Category</Title>

      <Input
        ref={inputRef}
        placeholder="Enter a category name"
        type="text"
        autoFocus
        allowClear
        value={name}
        disabled={loading}
        onChange={(evt) => setName(evt.target.value)}
        className="create-category__input"
      />

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={!name}
        className="create-category__button"
      >
        Update
      </Button>
    </form>
  );
};

export default CreateCategory;
